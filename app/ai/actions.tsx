'use server'

import { put } from '@vercel/blob'
import { nanoid } from 'nanoid'
import { imageUrlSchema, llmRecipeSchema, LLMRecipe } from '../_lib/types'
import { nov24Prompt } from './prompts'
import { models } from './providers'
import { CoreMessage, streamObject } from 'ai'
import { createStreamableValue } from 'ai/rsc'

/**
 * TODO:
 *
 * - Abort signal
 * - Store recipe in database
 * - Put prompt version behind flag
 */

export async function generateRecipe(formData: FormData) {
  try {
    const image = formData.get('image')
    const model = formData.get('model') || 'gpt-4o'

    if (!image || !isImageFile(image)) {
      return { error: 'Image is required' }
    }

    if (!model || typeof model !== 'string') {
      return { error: 'Invalid model' }
    }

    const imageUrl = await uploadImage(image)
    const validatedImageUrl = imageUrlSchema.safeParse(imageUrl)

    if (!validatedImageUrl.success) {
      return { error: validatedImageUrl.error.message }
    }

    const messages: CoreMessage[] = [
      {
        role: 'system',
        content: nov24Prompt,
      },
      {
        role: 'user',
        content: [
          {
            type: 'image',
            image: validatedImageUrl.data,
          },
        ],
      },
    ]

    const stream = createStreamableValue<LLMRecipe>()

    // todo: error handling

    ;;(async () => {
      const { partialObjectStream } = streamObject({
        model: models.languageModel(model),
        messages,
        mode: 'json',
        schema: llmRecipeSchema,
        schemaName: 'Ricoh Recipe',
        schemaDescription: 'A recipe of settings for a Ricoh camera',
        topP: 0.5,
        maxTokens: 1024,
        temperature: 0.2,
      })

      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject as LLMRecipe)
      }

      stream.done()
    })()

    return { recipe: stream.value }
  } catch (e) {
    const error =
      e instanceof Error ? e.message : 'An unexpected error occurred'
    return { error }
  }
}

function isImageFile(image: unknown): image is File {
  return image instanceof File
}

export async function uploadImage(image: File) {
  const key = nanoid()
  const file = await put(key, image, {
    access: 'public',
    token: process.env.RECIPE_INPUT_READ_WRITE_TOKEN,
  })
  return file.url
}
