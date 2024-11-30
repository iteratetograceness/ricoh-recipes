import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { LLMRecipe, Recipe } from '~/app/_lib/types'
import { PositiveOrNegative } from './positive-or-negative'
import { ReactNode } from 'react'

export function RecipeCard({
  recipe,
  id,
  llm = false,
  emptyState = null,
}: {
  recipe?: Recipe | LLMRecipe
  id?: string
  llm?: boolean
  emptyState?: ReactNode
}) {
  if (!recipe) return emptyState

  const creator = 'credit' in recipe ? recipe.credit : null

  return (
    <div className='flex flex-col gap-10 rounded-3xl bg-whiteish p-4'>
      {!llm && (
        <Link href='/' className='font-medium flex items-center gap-1'>
          <ArrowLeftIcon className='size-5' />
          GO BACK
        </Link>
      )}

      <div id='metadata' className='flex flex-col gap-1'>
        <h3 className='text-3xl md:text-4xl xl:text-5xl font-medium'>
          {id} {recipe.name.toUpperCase()}
        </h3>
        {creator && <p>CREATED BY {creator.toUpperCase()}</p>}
      </div>

      <div id='values' className='flex flex-col gap-4 text-sm sm:text-base '>
        <div className='flex flex-col gap-2'>
          <div>
            <b>IMAGE CONTROL:</b> {recipe.imageControl}
          </div>

          {/* todo */}
          <div>
            <b>WHITE BALANCE:</b> <WhiteBalance value={recipe.whiteBalance} />
          </div>

          <div className='flex items-center gap-2'>
            <b>SATURATION:</b>
            <PositiveOrNegative value={recipe.saturation} />
          </div>
          <div className='flex items-center gap-2'>
            <b>HUE:</b> <PositiveOrNegative value={recipe.hue} />
          </div>
          <div className='flex items-center gap-2'>
            <b>HIGH/LOW:</b> <PositiveOrNegative value={recipe.highLow} />
          </div>
          <div className='flex items-center gap-2'>
            <b>CONTRAST:</b> <PositiveOrNegative value={recipe.contrast} />
          </div>
          <div className='flex items-center gap-2'>
            <b>HIGHLIGHT:</b> <PositiveOrNegative value={recipe.highlight} />
          </div>
          <div className='flex items-center gap-2'>
            <b>SHADOW:</b> <PositiveOrNegative value={recipe.shadow} />
          </div>
          <div className='flex items-center gap-2'>
            <b>SHARPNESS:</b> <PositiveOrNegative value={recipe.sharpness} />
          </div>
          <div className='flex items-center gap-2'>
            <b>SHADING:</b> <PositiveOrNegative value={recipe.shading} />
          </div>
          <div className='flex items-center gap-2'>
            <b>CLARITY:</b> <PositiveOrNegative value={recipe.clarity} />
          </div>
        </div>
        <hr />
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <b>HIGHLIGHT CORRECTION:</b> {recipe.highlightCorrection}
          </div>
          <div className='flex items-center gap-2'>
            <b>SHADOW CORRECTION:</b> {recipe.highlightCorrection}
          </div>
          <div className='flex items-center gap-2'>
            <b>PERIPHERAL ILL. CORRECTION:</b>{' '}
            {recipe.peripheralIlluminationCorrection}
          </div>
          <div className='flex items-center gap-2'>
            <b>HIGH ISO NOISE REDUCTION:</b> {recipe.highIsoNoiseReduction}
          </div>
        </div>
        {recipe.additionalNotes && (
          <>
            <hr />
            <div className='flex flex-col gap-2'>
              <b>NOTES:</b>
              {recipe.additionalNotes}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function WhiteBalance({ value }: { value?: Partial<Recipe['whiteBalance']> }) {
  if (!value) return null

  const t = 'type' in value ? value.type : null
  const v = 'value' in value ? value.value : null
  const k = 'k' in value && value.k ? value.k : null

  return (
    <p className='inline-flex items-center gap-1'>
      <span>{t}</span>
      <span>{v ? (t ? ` | ${v}` : v) : null}</span>
      <PositiveOrNegative value={k} />
    </p>
  )
}
