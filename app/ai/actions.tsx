'use server'

import { put } from '@vercel/blob'
import { nanoid } from 'nanoid'
import { ImageInputSchema } from '../_lib/types'
import { createStreamableUI, streamUI } from 'ai/rsc'
// import { PositiveOrNegative } from '../_components/positive-or-negative'
import { nov24Prompt } from './prompts'
import { models } from './providers'

/**
 * TODO:
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

    const parsedInput = ImageInputSchema.safeParse({
      image: imageUrl,
      top_p: 0.5,
      max_tokens: 1024,
      temperature: 0.2,
    })

    if (!parsedInput.success) {
      return { error: parsedInput.error.message }
    }

    // const onProgress = (prediction: Prediction) => {
    //   console.log('onProgress', prediction.output)
    //   ui.done()
    //   if (prediction.output) {
    //     ui.update(
    //       <div className='flex flex-col gap-1'>{prediction.output}</div>
    //     )
    //   }
    //   // if (prediction.output) {

    //   //   let string = ''
    //   //   for (const str of prediction.output) {
    //   //     string = string.concat(str)
    //   //   }
    //   //   const splitByNewline = string.split('\n')
    //   //   const elements = []
    //   //   for (const line of splitByNewline) {
    //   //     const propertyAndValue = line.split(': ')
    //   //     if (propertyAndValue.length === 2) {
    //   //       const isNumber = !isNaN(Number(propertyAndValue[1]))
    //   //       elements.push(
    //   //         <div
    //   //           className='flex items-center gap-2'
    //   //           key={propertyAndValue[0]}
    //   //         >
    //   //           <b>{propertyAndValue[0]}:</b>
    //   //           {isNumber ? (
    //   //             <PositiveOrNegative value={Number(propertyAndValue[1])} />
    //   //           ) : (
    //   //             propertyAndValue[1]
    //   //           )}
    //   //         </div>
    //   //       )
    //   //     }
    //   //   }
    //   //   ui.update(<div className='flex flex-col gap-1'>{elements}</div>)
    //   // }
    // }

    const result = await streamUI({
      model: models.languageModel(model),
      prompt: nov24Prompt,
      // TODO: messages
      text: ({ content }) => <div>{content}</div>,
    })

    return result.value
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
