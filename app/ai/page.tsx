'use client';

import { notFound } from "next/navigation";
import { AI } from "./actions";
import { useActions, useUIState } from "ai/rsc";

export default function RecipeGenerationPage() {   
    const { generateRecipe } = useActions<typeof AI>()
    const [uiState, setUIState] = useUIState<typeof AI>()

    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
        return notFound();
    };

    const onSubmit = async (formData: FormData) => {       
        const toRender = await generateRecipe(formData); 
        setUIState({ response: toRender }); 
    };
    
    return (
        <form action={onSubmit} className="flex flex-col">
            <input
                type="file"
                accept="image/*"
                name="image"
                required
            />
            <button type="submit">
                Send
            </button>
            <>{uiState.response}</>
        </form>
    )
}
