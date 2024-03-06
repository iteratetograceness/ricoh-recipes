'use server';

import Replicate from 'replicate';
import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';
import { ImageInputSchema } from '../_lib/types';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY || '',
});

const model = 'yorickvp/llava-13b';
const version = 'a0fdc44e4f2e1f20f2bb4e27846899953ac8e66c5886c5878fa1d6b73ce009e5';
const prompt = `Generate a recipe with specific camera settings and post-processing techniques for the Ricoh GRIIIx camera that replicates and helps achieve a similar or nearly identical visual style, filter, aesthetic, color scheme, vibe, and overall look of this photo. Key elements to include are: 
(1) Camera Settings: Specify recommended settings for the Ricoh GR Camera to capture images with a similar aesthetic.
(2) Post-Processing Settings: Outline editing techniques and adjustments to achieve the desired filter or vibe.
(3) Color Palette and Tone: Provide guidance on color grading and tonal adjustments to match the mood of the original photo.
(4) Special Settings: Recommend any additional settings or enhancements to replicate the unique style of the uploaded image.
(5) Context: Provide any additional guidance around adjusting for particular lighting conditions, subject matter, or other factors that may affect the final look of the photo.

Additionally, be concise!`;

export async function generateRecipe(formData: FormData) {
    const image = formData.get('image');

    if (!image) {
        throw new Error('Image is required');
    }

    const imageUrl = await uploadImage(image as File);

    const input = {
        image: imageUrl,
        top_p: 1,
        max_tokens: 1024,
        temperature: 0.2,
    };

    const parsedInput = ImageInputSchema.safeParse(input);

    if (!parsedInput.success) {
        throw new Error('Invalid input');
    }

    const inputWithPrompt = { ...parsedInput.data, prompt };

    return await replicate.predictions.create({ model, version, input: inputWithPrompt, stream: true });
}

export async function uploadImage(image: File) {
    const key = nanoid();
    const file = await put(key, image, {
        access: 'public',
        token: process.env.RECIPE_INPUT_READ_WRITE_TOKEN,
    });
    return file.url;
}
