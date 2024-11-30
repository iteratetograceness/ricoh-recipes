'use cache'

import { getAll } from '@vercel/edge-config'
import { RecipeEdgeConfigItems, Recipe } from '../_lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Suspense } from 'react'

export async function List(): Promise<JSX.Element> {
  const recipes = await getAll<RecipeEdgeConfigItems>()
  const recipeCount = Object.keys(recipes).length
  const longestIndexLength = recipeCount.toString().length

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {Object.entries(recipes).map(([index, recipe]) => (
        <ListItem
          key={index}
          index={index}
          longestIndexLength={longestIndexLength}
          recipe={recipe}
        />
      ))}
    </div>
  )
}

function ListItem({
  recipe,
  index,
  longestIndexLength,
}: {
  recipe: Recipe
  index: string
  longestIndexLength: number
}): JSX.Element {
  const key = ('0' + index).slice(-Math.max(longestIndexLength, 2))

  return (
    <Link
      href={`/recipe/${key}`}
      className='bg-whiteish min-w-[240px] flex flex-col gap-4 rounded-3xl p-5'
    >
      <div className='relative w-full h-auto aspect-[6/4] bg-gray-100 rounded-xl'>
        <Suspense fallback={null}>
          <Image
            alt={`Image shot with Ricoh GRIIIx using custom ${recipe.name} recipe`}
            className='rounded-xl'
            src={recipe.thumbnail}
            fill
          />
        </Suspense>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-4 items-center'>
          <hr className='w-full border-t-2' />
          <p className='text-4xl font-bold'>{key}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <h4 className='text-3xl xl:text-4xl font-bold'>
            {recipe.name.toUpperCase()}
          </h4>

          <div className='flex gap-1 items-center font-medium text-sm sm:text-base'>
            SEE FULL RECIPE <ArrowRightIcon className='size-5' />
          </div>
        </div>
      </div>
    </Link>
  )
}
