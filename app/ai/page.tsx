import { notFound } from 'next/navigation'
import RecipeGenerationForm from './form'

export const metadata = {
  title: 'Recipe Playground',
  description: 'Generate a Ricoh Recipe from a photo.',
}

export default function RecipeGenerationPage() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return notFound()
  }

  return <RecipeGenerationForm />
}
