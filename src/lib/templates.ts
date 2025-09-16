import { Agenda } from '@/types/agenda';

export type AgendaTemplateItem = {
  id: string;
  name: string;
  agenda: Agenda;
};

export const TEMPLATES: AgendaTemplateItem[] = [
  {
    id: 'team-standup',
    name: 'Team Standup',
    agenda: {
      opening: "Quick sync on progress, priorities, and blockers.",
      topics: [
        { name: "What did you accomplish?", duration: "4 min" },
        { name: "What will you do next?", duration: "4 min" },
        { name: "Any blockers?", duration: "4 min" },
        { name: "Announcements", duration: "3 min" }
      ],
      wrapUp: "Support each other with blockers and proceed with priorities.",
    }
  },
  {
    id: 'one-on-one-checkin',
    name: '1:1 Check-In',
    agenda: {
      opening: "Regular manager–employee check-in to discuss work and support.",
      topics: [
        { name: "Overall well-being and workload", duration: "8 min" },
        { name: "Current priorities and progress", duration: "8 min" },
        { name: "Challenges and support needed", duration: "8 min" },
        { name: "Next steps and follow-ups", duration: "6 min" }
      ],
      wrapUp: "Summarize actions and confirm next check-in.",
    }
  },
  {
    id: 'sprint-planning',
    name: 'Sprint Planning',
    agenda: {
      opening: "Plan sprint goals, refine backlog, and assign work.",
      topics: [
        { name: "Sprint goals and capacity", duration: "15 min" },
        { name: "Backlog prioritization and estimates", duration: "30 min" },
        { name: "Task assignment and ownership", duration: "25 min" },
        { name: "Risks and dependencies", duration: "10 min" }
      ],
      wrapUp: "Confirm commitments and communicate kickoff.",
    }
  },
  {
    id: 'sales-meeting',
    name: 'Sales Meeting',
    agenda: {
      opening: "Understand prospect needs and present the best solution.",
      topics: [
        { name: "Introductions and context", duration: "5 min" },
        { name: "Prospect challenges and goals", duration: "12 min" },
        { name: "Solution and value", duration: "15 min" },
        { name: "Timeline and next steps", duration: "8 min" }
      ],
      wrapUp: "Agree on next steps and follow-up materials.",
    }
  },
  {
    id: 'board-update',
    name: 'Board/Stakeholder Update',
    agenda: {
      opening: "Executive update on performance and initiatives.",
      topics: [
        { name: "Key metrics and financials", duration: "15 min" },
        { name: "Strategic initiatives progress", duration: "15 min" },
        { name: "Risks and mitigation", duration: "15 min" },
        { name: "Discussion and feedback", duration: "15 min" }
      ],
      wrapUp: "Document feedback and action items.",
    }
  },
  {
    id: 'brainstorming',
    name: 'Brainstorming Session',
    agenda: {
      opening: "Creative ideation to generate and evaluate ideas.",
      topics: [
        { name: "Problem context and goals", duration: "10 min" },
        { name: "Individual idea generation", duration: "20 min" },
        { name: "Group sharing and clustering", duration: "20 min" },
        { name: "Prioritization and selection", duration: "10 min" }
      ],
      wrapUp: "Assign owners to top ideas and next steps.",
    }
  },
  {
    id: 'retrospective',
    name: 'Retrospective',
    agenda: {
      opening: "Reflect on work period to improve processes.",
      topics: [
        { name: "What went well", duration: "20 min" },
        { name: "What didn’t go well", duration: "20 min" },
        { name: "Action items and owners", duration: "20 min" }
      ],
      wrapUp: "Confirm improvements and timelines.",
    }
  },
];


