'use client';

import { ReplicateStream } from "ai";
import { generateRecipe } from "./actions";
import { Suspense, useState } from "react";
import { Reader } from "./reader";

export const runtime = 'nodejs';

export default function RecipeGenerationPage() {   
    const [reader, setReader] = useState<ReadableStreamDefaultReader<any>>(); 
    const onSubmit = async (formData: FormData) => {        
        const result = await generateRecipe(formData);
        const stream = await ReplicateStream(result);
        const reader = stream.getReader();
        setReader(reader);
    }

    return (
        <form action={onSubmit}>
            <input
                type="file"
                accept="image/*"
                name="image"
                required
            />
            <button type="submit">
                Send
            </button>
            <Suspense>
                <Reader reader={reader} />
            </Suspense>
        </form>
    )
}
