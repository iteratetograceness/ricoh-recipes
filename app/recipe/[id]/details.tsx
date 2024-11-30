import { notFound } from 'next/navigation'
import { ImageGallery } from '~/app/_components/image-gallery'
import { RecipeCard } from '~/app/_components/recipe'
import { getRecipe, getRecipePhotos } from '~/app/_lib/db'

export async function Details({ id }: { id: Promise<string> }) {
  const recipeId = await id
  const recipe = await getRecipe(recipeId)

  if (!recipe) return notFound()

  const photos = await getRecipePhotos({
    id: recipeId,
    name: recipe.name,
  })

  return (
    <div className='relative flex flex-col gap-4 -mb-4'>
      <RecipeCard recipe={recipe} id={recipeId} />
      {/* TODO: Improve communicating that this element is scrollable */}
      <div className='relative left-[50%] -translate-x-1/2 w-screen overflow-x-scroll snap-x snap-mandatory overscroll-x-contain mt-10 smooth-scroll touch-pan-x'>
        <ImageGallery photos={photos.blobs} recipeName={recipe.name} />
      </div>
    </div>
  )
}
