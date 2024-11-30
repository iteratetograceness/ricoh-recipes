import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { mistral } from '@ai-sdk/mistral'
import { experimental_customProvider as customProvider } from 'ai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY')
}

export const models = customProvider({
  languageModels: {
    'gpt-4o': openai('gpt-4o'),
    // 'claude-3-5-sonnet-20241022': anthropic('claude-3-5-sonnet-20241022'),
    // 'claude-3-opus-20240229': anthropic('claude-3-opus-20240229'),
    // 'claude-3-sonnet-20240229': anthropic('claude-3-sonnet-20240229'),
    'claude-3-haiku-20240307': anthropic('claude-3-haiku-20240307'),
    'gemini-1.5-flash': google('gemini-1.5-flash'),
    // 'gemini-1.5-pro': google('gemini-1.5-pro'),
    'pixtral-large-latest': mistral('pixtral-large-latest'),
  },
  fallbackProvider: openai,
})
