'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ChangeEventHandler, ReactNode, useState } from 'react'
import { ButtonLink } from '../_components/button-link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { STIX_Two_Text } from 'next/font/google'
import Form from 'next/form'
import { generateRecipe } from './actions'

const italicFont = STIX_Two_Text({
  style: 'italic',
  subsets: ['latin'],
})

export default function RecipeGenerationPage() {
  const [image, setImage] = useState<File>()
  const [recipe, setRecipe] = useState<ReactNode>()

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return notFound()
  }

  const onSubmit = async (formData: FormData) => {
    try {
      const toRender = await generateRecipe(formData)

      if (!toRender) {
        // TODO: Error toast
        return
      }

      if (typeof toRender === 'object' && 'error' in toRender) {
        // TODO: Error toast
        return
      }

      setRecipe(toRender)
    } catch (e) {
      setRecipe(<div>An unexpected error occurred</div>)
    }
  }

  const onImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <section className='flex flex-col gap-7'>
      <div className='flex flex-col sm:flex-row gap-4 items-center'>
        <ButtonLink href='/'>
          <div className='text-xs md:text-base font-medium flex items-center gap-1'>
            <ArrowLeftIcon strokeWidth='10px' />
            GO BACK
          </div>
        </ButtonLink>
        <h3
          className={`${italicFont.className} text-xl md:text-2xl xl:text-4xl`}
        >
          Ricoh Recipe Playground
        </h3>
      </div>
      <div className='flex flex-col md:flex-row w-full gap-6'>
        <Form
          action={onSubmit}
          className='flex flex-col min-w-full md:min-w-96 p-6 gap-4 bg-white border-[0.5px] border-solid border-current rounded-xl'
        >
          <h2
            className={`${italicFont.className} text-lg md:text-xl xl:text-3xl`}
          >
            Input
          </h2>
          <hr className='border-t-[0.5px] border-current border-solid' />
          <p>Generate a Ricoh Recipe from any photo.</p>
          <input
            type='file'
            accept='image/*'
            name='image'
            onChange={onImageChange}
            required
            className='flex h-10 w-full rounded-md border-[0.5px] border-current px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          />
          <div className='flex flex-col relative w-full h-auto aspect-square'>
            {image ? (
              <Image
                className='rounded-md'
                src={URL.createObjectURL(image)}
                alt='Uploaded Image Preview'
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : null}
          </div>
          <button
            className='self-end flex items-center justify-center border-[0.5px] border-solid border-current rounded-[50%] w-fit px-5 py-3'
            type='submit'
          >
            Send
          </button>
        </Form>

        <div className='flex flex-col w-full p-6 gap-4 bg-white border-[0.5px] border-solid border-current rounded-xl'>
          <h2
            className={`${italicFont.className} text-lg md:text-xl xl:text-3xl`}
          >
            AI-Generated Recipe
          </h2>
          <hr className='border-t-[0.5px] border-current border-solid' />
          {recipe}
        </div>
      </div>
    </section>
  )
}
