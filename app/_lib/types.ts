import { z } from 'zod';

const ImageControlEnum = z.enum(['Standard', 'Vivid', 'Monotone', 'Soft Monotone', 'Hard Monotone', 'Positive Film', 'Negative Film', 'Bleach Bypass', 'Retro', 'HDR Tone', 'Cross Processing', 'Custom']);
type ImageControlEnum = z.infer<typeof ImageControlEnum>;

const WhiteBalanceEnum = z.enum(['Auto', 'Multi Auto', 'Daylight', 'Shade', 'Cloudy', 'Daylight Color', 'Daylight White', 'Cool White', 'Warm White', 'Tungsten', 'CTE', 'Manual', 'Color Temperature']);

export const recipeSchema = z.object({
  name: z.string().default('Untitled').describe('The name of the recipe'),
  imageControl: ImageControlEnum,
  saturation: z.number().int().min(-4).max(4).default(0),
  hue: z.number().int().min(-4).max(4).default(0),
  highLow: z.number().int().min(-4).max(4).default(0),
  contrast: z.number().int().min(-4).max(4).default(0),
  highlight: z.number().int().min(-4).max(4).default(0),
  shadow: z.number().int().min(-4).max(4).default(0),
  sharpness: z.number().int().min(-4).max(4).default(0),
  shading: z.number().int().min(-4).max(4).default(0),
  clarity: z.number().int().min(-4).max(4).default(0),
  whiteBalance: z.object({
    type: WhiteBalanceEnum,
    value: z
      .string()
      .regex(/^(0|(A|B)(1[0-4]|[1-9])):(0|(G|M)(1[0-4]|[1-9]))$/)
      .optional(),
    k: z.number().int().min(2500).max(10000).optional(),
  }),
  highlightCorrection: z.enum(['Auto', 'Low', 'Medium', 'High', 'Off']),
  shadowCorrection: z.enum(['Auto', 'Low', 'Medium', 'High', 'Off']),
  peripheralIlluminationCorrection: z.enum(['On', 'Off']),
  highIsoNoiseReduction: z.enum(['Auto', 'Low', 'Medium', 'High', 'Off']),
  additionalNotes: z.string().optional(),
  thumbnail: z.string().url(),
  credit: z.string(),
})

export type Recipe = z.infer<typeof recipeSchema>

export const llmRecipeSchema = recipeSchema.omit({
  thumbnail: true,
  credit: true,
})
export type LLMRecipe = z.infer<typeof llmRecipeSchema>
export type RecipeEdgeConfigItems = Record<string, Recipe>

export const imageUrlSchema = z.string().url()
