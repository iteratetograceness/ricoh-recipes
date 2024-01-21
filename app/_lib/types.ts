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
        value: z.string().regex(/^(0|(G|M)(1[0-4]|[1-9])):(0|(A|B)(1[0-4]|[1-9]))$/),
    })
});

export type Recipe = z.infer<typeof Recipe>;
export type RecipeEdgeConfigItems = Record<string, Recipe>;
