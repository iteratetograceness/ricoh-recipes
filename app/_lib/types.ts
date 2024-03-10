import { z } from 'zod';

const ImageControlEnum = z.enum(['Standard', 'Vivid', 'Monotone', 'Soft Monotone', 'Hard Monotone', 'Positive Film', 'Negative Film', 'Bleach Bypass', 'Retro', 'HDR Tone', 'Cross Processing', 'Custom']);
type ImageControlEnum = z.infer<typeof ImageControlEnum>;

const WhiteBalanceEnum = z.enum(['Auto', 'Multi Auto', 'Daylight', 'Shade', 'Cloudy', 'Daylight Color', 'Daylight White', 'Cool White', 'Warm White', 'Tungsten', 'CTE', 'Manual', 'Color Temperature']);

const Recipe = z.object({
    name: z.string(),
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
        value: z.string().regex(/^(0|(A|B)(1[0-4]|[1-9])):(0|(G|M)(1[0-4]|[1-9]))$/).optional(),
        k: z.number().int().min(2500).max(10000).optional(),
    }),
    highlightCorrection:z.enum(['Auto', 'Low', 'Medium', 'High', 'Off']),
    shadowCorrection: z.enum(['Auto', 'Low', 'Medium', 'High', 'Off']),
    peripheralIlluminationCorrection: z.enum(['On', 'Off']),
    highIsoNoiseReduction: z.enum(['Auto', 'Low', 'Medium', 'High', 'Off']),
    thumbnail: z.string().url(),
    credit: z.string(),
});

export type Recipe = z.infer<typeof Recipe>;
export type RecipeEdgeConfigItems = Record<string, Recipe>;

export const ImageInputSchema = z.object({
    image: z.string().url(),
    top_p: z.number().max(1).default(1),
    max_tokens: z.number().int().default(1024),
    temperature: z.number().default(0.2),
});
export type ImageInput = z.infer<typeof ImageInputSchema>;
