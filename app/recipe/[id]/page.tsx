import { notFound } from 'next/navigation'
import { list } from '@vercel/blob'
import { ImageGallery } from '~/app/_components/image-gallery'
import { RecipeCard } from '~/app/_components/recipe'
import { getAllRecipes, getRecipe } from '~/app/_lib/db'
import { Suspense } from 'react'
import { Details } from './details'

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = params.then((p) => p.id)

  return (
    <Suspense fallback={null}>
      <Details id={id} />
    </Suspense>
  )
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes()
  return Object.keys(recipes).map((id) => ({
    id,
  }))
}
