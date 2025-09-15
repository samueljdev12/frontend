import { NextRequest, NextResponse } from 'next/server';
import { getAiConfig } from '@/lib/aiConfig';

type AgendaTopic = { name: string; duration: string };
type Agenda = { opening: string; topics: AgendaTopic[]; wrapUp: string };

const systemPrompt =
  'You are an expert meeting agenda generator. ALWAYS respond with STRICT, valid, minified JSON only, matching this exact TypeScript type: {"opening": string, "topics": Array<{"name": string, "duration": string}>, "wrapUp": string}. Do not add markdown, backticks, commentary, or any keys beyond these three. Keep opening and wrapUp concise. Infer the meeting type from the title and tailor topics accordingly.';

function buildUserPrompt(meetingTitle: string): string {
  return `Generate a professional agenda for: "${meetingTitle}"\n\nInstructions:\n- Infer the meeting type from the title (e.g., Sprint Planning, Daily Standup, 1:1, Retrospective, Sales Discovery, Design Review, Project Kickoff, Executive Review, Brainstorming).\n- Tailor the topics to that type.\n- 2 to 6 topics depending on meeting type and complexity.\n- Use realistic durations per topic (5–30 min) and keep total to ~30–90 minutes unless the title implies longer.\n- opening: 1–2 sentences that set context for this specific type.\n- wrapUp: 1–2 sentences with decisions/actions/next steps relevant to the type.\n\nHints by type (not exhaustive):\n- Sprint Planning: Capacity, Prioritized Backlog, Sprint Goal, Assignments.\n- Retrospective: What went well, What to improve, Action items.\n- Daily Standup: Yesterday/Today/Blockers, Risks, Hand-offs.\n- 1:1: Updates, Feedback, Career/Development, Action items.\n- Sales Discovery: Goals/Pain, Current process, Fit/Gaps, Next steps.\n- Kickoff: Objectives/Scope, Roles/Comms, Milestones, Risks.\n- Design Review: Requirements, Concepts, Feedback/Decisions, Next steps.\n- Executive Review: KPIs, Risks/Asks (Decide), Initiatives, Next steps.\n\nReturn ONLY valid minified JSON matching: {opening:string, topics:[{name:string, duration:string}], wrapUp:string}.`;
}

function tryExtractJson(text: string): string | null {
  // If response includes extra text, try to pull the first {...} block
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1);
  }
  return null;
}

function validateAgenda(obj: any): obj is Agenda {
  if (!obj || typeof obj !== 'object') return false;
  if (typeof obj.opening !== 'string') return false;
  if (!Array.isArray(obj.topics)) return false;
  if (typeof obj.wrapUp !== 'string') return false;
  for (const t of obj.topics) {
    if (!t || typeof t.name !== 'string' || typeof t.duration !== 'string') return false;
  }
  return true;
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { meetingTitle } = await request.json();
    if (!meetingTitle || typeof meetingTitle !== 'string') {
      return NextResponse.json({ error: 'meetingTitle is required' }, { status: 400 });
    }
    const title = meetingTitle.trim();
    const words = title.split(/\s+/).filter(Boolean);
    const hasLetters = /[a-zA-Z]/.test(title);
    if (title.length < 4 || words.length < 2 || !hasLetters) {
      return NextResponse.json(
        { error: 'Please enter a specific meeting title (e.g., "Sprint Planning", "Q3 Sales Review").' },
        { status: 422 }
      );
    }

    const cfg = getAiConfig();
    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey: cfg.apiKey, baseURL: cfg.baseUrl });

    const completion = await client.chat.completions.create({
      model: cfg.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: buildUserPrompt(title) },
      ],
      temperature: 0.7,
      max_tokens: 900,
      stream: false,
    });

    const raw = completion.choices?.[0]?.message?.content ?? '';
    console.log('[AI] Raw completion content:', raw);
    let jsonText = raw.trim();
    if (!jsonText.startsWith('{')) {
      const extracted = tryExtractJson(jsonText);
      if (extracted) jsonText = extracted;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      return NextResponse.json(
        { error: 'Model did not return valid JSON' },
        { status: 422 }
      );
    }

    if (!validateAgenda(parsed)) {
      return NextResponse.json(
        { error: 'Invalid agenda structure from model' },
        { status: 422 }
      );
    }

    return NextResponse.json(parsed as Agenda);
  } catch (error: any) {
    // Log as much as possible for debugging (status, code, type, data)
    console.error('AI generation error:', {
      status: error?.status,
      code: error?.code,
      type: error?.type,
      message: error?.message,
      data: error?.response?.data ?? error?.error ?? null,
    });
    return NextResponse.json(
      { error: 'Failed to generate agenda' },
      { status: 500 }
    );
  }
}


