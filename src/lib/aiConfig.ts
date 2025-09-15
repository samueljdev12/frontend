export type AiProvider = 'deepseek';

export interface AiConfig {
  provider: AiProvider;
  baseUrl: string;
  apiKey: string;
  model: string;
}

export function getAiConfig(): AiConfig {
  const provider = (process.env.AI_PROVIDER || 'deepseek') as AiProvider;
  const baseUrl = process.env.AI_BASE_URL || 'https://api.deepseek.com';
  const apiKey = process.env.DEEPSEEK_API_KEY || '';
  const model = process.env.AI_MODEL || 'deepseek-chat';

  if (!apiKey) {
    throw new Error('AI API key is missing. Set DEEPSEEK_API_KEY in .env.local');
  }

  return {
    provider,
    baseUrl: baseUrl.replace(/\/$/, ''),
    apiKey,
    model,
  };
}


