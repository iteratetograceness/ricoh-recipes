import { get, getAll } from '@vercel/edge-config'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { Recipe, RecipeEdgeConfigItems } from './types'
import { list } from '@vercel/blob'

export async function getAllRecipes() {
  'use cache'
  cacheTag('recipes')
  const recipes = await getAll<RecipeEdgeConfigItems>()
  return recipes
}

export async function getRecipe(id: string) {
  'use cache'
  cacheTag(`recipe-${id}`)
  const recipe = await get<Recipe>(id)
  return recipe
}

export async function getRecipePhotos({
  id,
  name,
}: {
  id: string
  name: string
}) {
  'use cache'
  cacheTag(`recipe-photos-${id}`)
  const photos = await list({
    prefix: `${id} - ${name}`,
  })
  return photos
}
