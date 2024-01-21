import { getAll } from '@vercel/edge-config';
import { Recipe, RecipeEdgeConfigItems } from '../_lib/types';
import { STIX_Two_Text } from 'next/font/google'
import Link from 'next/link';

const italicFont = STIX_Two_Text({
    style: 'italic',
    subsets: ['latin']
})

export async function List(): Promise<JSX.Element> {
    const recipes = await getAll<RecipeEdgeConfigItems>()
    const recipeCount = Object.keys(recipes).length
    const longestIndexLength = recipeCount.toString().length

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(recipes).map(([index, recipe]) => (
                <ListItem key={index} index={index} longestIndexLength={longestIndexLength} recipe={recipe} />
            ))}
        </div>
    )
}

/**
 * TODO:
 * - [ ] Show image on hover
 * - [ ] Page for each recipe
 */

function ListItem({
    recipe,
    index,
    longestIndexLength,
}: {
    recipe: Recipe;
    index: string;
    longestIndexLength: number;
}): JSX.Element {
    const key = ("0" + index).slice(-Math.max(longestIndexLength, 2))

    return (
        <div className="min-w-[300px] flex flex-col p-4 border-[0.5px] border-solid border-current rounded-xl">           
            <span className={`${italicFont.className} text-3xl xl:text-5xl`}>{key} {recipe.name}</span>
            <hr className="my-3 border-t-[0.5px] border-current border-solid"/>
            <div><b>IMAGE CONTROL:</b> {recipe.imageControl}</div>
            <div><b>WHITE BALANCE:</b> {recipe.whiteBalance.type} | {recipe.whiteBalance.value}</div>
            <hr className="my-3 border-t-[0.5px] border-current border-solid"/>
            <div className="grid grid-cols-2 gap-2 text-sm text-md">
                <div className="flex items-center gap-2"><b>SATURATION:</b> <PositiveOrNegative value={recipe.saturation} /></div>
                <div className="flex items-center gap-2"><b>HUE:</b> <PositiveOrNegative value={recipe.hue} /></div>
                <div className="flex items-center gap-2"><b>HIGH/LOW:</b> <PositiveOrNegative value={recipe.highLow} /></div>
                <div className="flex items-center gap-2"><b>CONTRAST:</b> <PositiveOrNegative value={recipe.contrast} /></div>
                <div className="flex items-center gap-2"><b>HIGHLIGHT:</b> <PositiveOrNegative value={recipe.highlight} /></div>
                <div className="flex items-center gap-2"><b>SHADOW:</b> <PositiveOrNegative value={recipe.shadow} /></div>
                <div className="flex items-center gap-2"><b>SHARPNESS:</b> <PositiveOrNegative value={recipe.sharpness} /></div>
                <div className="flex items-center gap-2"><b>SHADING:</b> <PositiveOrNegative value={recipe.shading} /></div>
                <div className="flex items-center gap-2"><b>CLARITY:</b> <PositiveOrNegative value={recipe.clarity} /></div>
            </div>
            <hr className="my-3 border-t-[0.5px] border-current border-solid"/>
            <Link href="/">See More [arrow icon]</Link>
        </div>
    )
}

function PositiveOrNegative({ value }: {
    value: number;
}): JSX.Element {
    const stringValue = value > 0 ? `+${value}` : `${value}`

    return (
        <span className="flex items-center justify-center bg-black rounded-full text-white w-7 py-[0.5px] text-sm">
            {stringValue}
        </span>
    )
}