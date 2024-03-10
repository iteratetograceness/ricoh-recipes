import Replicate, { Prediction } from 'replicate';
import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';
import { ImageInputSchema } from '../_lib/types';
import { createAI, createStreamableUI } from 'ai/rsc';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY || '',
});

const model = 'jueungrace/ricoh-llava-13b';
const version = '38e5c1f974ad8d17eaeed923fd1925f3644171ddd578a0831587e196b434a233';

const prompt = `Identify the optimal settings for the Ricoh GR III and Ricoh GR IIIx to precisely replicate the photographic filter and color scheme presented in the submitted photo. Specific settings to include are:

- Image Control/Effect (valid options: Standard, Vivid, Monotone, Soft Monotone, Hard Monotone, Hi-Contrast B&W, Positive Film, Bleach Bypass, Retro, HDR Tone, Cross Processing)
- Saturation (valid options: -4 to +4, non-monotone modes only)
- Hue (valid options: -4 to +4, non-monotone modes only)
- High/Low Key (valid options: -4 to +4)
- Contrast (valid options: -4 to +4)
- Contrast - Highlight (valid options: -4 to +4)
- Contrast - Shadow (valid options: -4 to +4)
- Sharpness (valid options: -4 to +4)
- Toning (valid options: -4 to +4)
- Shading (valid options: -4 to +4)
- Clarity (valid options: -4 to +4)
- Highlight Correction (valid options: Auto, On, Off)
- Shadow Correction (valid options: Auto, Low, Medium, High, Off)
- Peripheral Illumination Correction (valid options: On, Off)
- Noise Reduction (valid options: Auto, Low, Medium, High, Custom, Off)
- White Balance: (valid options: Auto White Balance, Multi Auto White Balance, Daylight, Shade, Cloudy, Fl. - Daylight Color, Fl. - Daylight White, Fl. - Cool White, Fl. - Warm White, Tungsten, CTE, Manual White Balance, Color Temperature; for Color Temperature, valid options are 2500K to 10000K in 10K increments)
- White Balance Compensation A/B (valid options: -14 to +14, e.g. A1 or B-2)
- White Balance Compensation G/M (valid options: -14 to +14, e.g. G3 or M-4)`;

export async function generateRecipe(formData: FormData) {
    'use server';

    const image = formData.get('image');

    if (!image) {
        throw new Error('Image is required');
    }

    const imageUrl = await uploadImage(image as File);

    const input = {
        image: imageUrl,
        top_p: .5,
        max_tokens: 1024,
        temperature: 0.2,
    };

    const parsedInput = ImageInputSchema.safeParse(input);

    if (!parsedInput.success) {
        throw new Error('Invalid input');
    }

    const inputWithPrompt = { ...parsedInput.data, prompt };

    const node = createStreamableUI()
    const onProgress = (prediction: Prediction) => {
        node.update(prediction.output)
    }

    (async() => {
        await replicate.run(`${model}:${version}`, { input: inputWithPrompt }, onProgress);
    })()

    return node.value;
}

export const AI = createAI({ actions: { generateRecipe }, initialUIState: { response: undefined }})

export async function uploadImage(image: File) {
    const key = nanoid();
    const file = await put(key, image, {
        access: 'public',
        token: process.env.RECIPE_INPUT_READ_WRITE_TOKEN,
    });
    return file.url;
}
