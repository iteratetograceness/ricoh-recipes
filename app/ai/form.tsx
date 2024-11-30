'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import cn from 'classnames'
import {
  ChangeEventHandler,
  useCallback,
  useRef,
  useState,
  useTransition,
} from 'react'
import { ArrowLeftIcon, MagicWandIcon, UploadIcon } from '@radix-ui/react-icons'
import Form from 'next/form'
import { generateRecipe } from './actions'
import { LLMRecipe } from '../_lib/types'
import { readStreamableValue } from 'ai/rsc'
import { RecipeCard } from '../_components/recipe'
import Link from 'next/link'

export const metadata = {
  title: 'AI Recipe Generator',
  description: 'Generate a Ricoh Recipe from a photo.',
}

export default function RecipeGenerationForm() {
  const [image, setImage] = useState<File>()
  const [recipe, setRecipe] = useState<LLMRecipe>()
  const [isPending, startTransition] = useTransition()

  const fileInputRef = useRef<HTMLInputElement>(null)

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return notFound()
  }

  const onSubmit = useCallback(async () => {
    if (!image || isPending) return

    startTransition(async () => {
      try {
        const result = await generateRecipe(image)

        if (result.error || !result.recipe) {
          // TODO: Error toast
          return
        }

        for await (const partialObject of readStreamableValue(result.recipe)) {
          if (partialObject) {
            setRecipe(partialObject)
          }
        }
      } catch (e) {
        // TODO: Error toast + expose error in UI
        setRecipe(undefined)
      }
    })
  }, [image, isPending])

  const onImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRecipe(undefined)
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const onUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <section className='flex flex-col gap-5'>
      <div className='bg-whiteish rounded-3xl p-4 flex flex-col md:flex-row w-full gap-4 justify-between'>
        <div className='flex flex-col gap-10 md:h-[230px]'>
          <Link href='/' className='flex items-center gap-2 font-medium'>
            <ArrowLeftIcon className='size-5' />
            GO HOME
          </Link>

          <div className='flex flex-col gap-1'>
            <h3 className='text-3xl md:text-4xl xl:text-5xl font-medium'>
              PLAYGROUND
            </h3>
            <p>UPLOAD A PHOTO TO GENERATE A RECIPE</p>
          </div>

          <Form action={onSubmit} id='recipe-form'>
            <input
              type='file'
              accept='image/*'
              name='image'
              onChange={onImageChange}
              ref={fileInputRef}
              className='hidden'
            />
            <div
              id='actions'
              className='flex flex-col md:flex-row gap-4 font-medium text-sm'
            >
              <button
                className={cn(
                  'flex items-center gap-2 rounded-xl p-4 bg-primary-foreground text-whiteish',
                  image &&
                    '!text-primary-foreground !bg-whiteish !border !border-primary-foreground',
                  isPending && 'opacity-50 cursor-not-allowed'
                )}
                disabled={isPending}
                onClick={onUpload}
                type='button'
              >
                <UploadIcon className='size-5' />
                {image ? 'CHOOSE ANOTHER PHOTO' : 'START BY UPLOADING A PHOTO'}
              </button>

              <button
                className={cn(
                  'flex items-center gap-2 bg-primary-foreground text-whiteish rounded-xl p-4',
                  (!image || isPending) && 'opacity-50',
                  isPending && 'cursor-not-allowed'
                )}
                type='submit'
                form='recipe-form'
                disabled={!image || isPending}
              >
                <MagicWandIcon className='size-5' />
                GENERATE RECIPE
              </button>
            </div>
          </Form>
        </div>

        <div className='rounded-3xl p-4 gap-10 relative w-full h-auto aspect-square md:size-[230px]'>
          {image && (
            <Image
              className='rounded-3xl'
              src={URL.createObjectURL(image)}
              alt='Uploaded Image Preview'
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      </div>

      <RecipeCard
        recipe={recipe}
        emptyState={<EmptyRecipe show={Boolean(image)} pending={isPending} />}
        llm
      />
    </section>
  )
}

function EmptyRecipe({ show, pending }: { show: boolean; pending: boolean }) {
  if (!show) return null
  return (
    <div className='flex flex-col gap-10 rounded-3xl bg-whiteish p-4 text-center h-72 items-center justify-center'>
      {pending ? 'YOUR RECIPE IS COOKING' : 'YOUR RECIPE WILL APPEAR HERE'}
    </div>
  )
}
