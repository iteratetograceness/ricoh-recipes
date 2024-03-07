import Replicate, { Prediction } from 'replicate';
import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';
import { ImageInputSchema } from '../_lib/types';
import { createAI, createStreamableUI } from 'ai/rsc';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY || '',
});

const model = 'yorickvp/llava-13b';
const version = 'a0fdc44e4f2e1f20f2bb4e27846899953ac8e66c5886c5878fa1d6b73ce009e5';
const prompt = `What settings for the Ricoh GR III and Ricoh GR IIIx cameras will achieve the specific photographic effect, style, filter, aesthetic, color scheme, and vibe of the provided photo? Include the following settings:
- Image Control/Effect
- Saturation
- Hue 
- High/Low Key
- Contrast
- Contrast (Highlight)
- Contrast (Shadow)
- Sharpness
- Toning
- Shading
- Clarity
- Highlight Correction
- Shadow Correction
- Peripheral Illumination Correction
- Noise Reduction
- White Balance
- White Balance Compensation A/B
- White Balance Compensation G/M
- ISO
- Exposure Compensation
Recommended any setting adjustments that may need to be made based on lighting conditions, location, subject matter, and other factors that may affect the final look of the photo.`;

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

    // return await replicate.predictions.create({ model, version, input: inputWithPrompt, stream: true });
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
