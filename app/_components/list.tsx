import { getAll } from '@vercel/edge-config';
import { Recipe, RecipeEdgeConfigItems } from '../_lib/types';
import { STIX_Two_Text } from 'next/font/google'
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Suspense } from 'react';
import { PositiveOrNegative } from './positive-or-negative';

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
        <Link href={`/recipe/${key}`} className="bg-white min-w-[240px] flex flex-col border-[0.5px] border-solid border-current rounded-xl">           
            <div className="relative w-full h-auto aspect-[6/4] bg-gray-100 rounded-t-xl">
                <Suspense fallback={null}>
                    <Image 
                        alt={`Image shot with Ricoh GRIIIx using custom ${recipe.name} recipe`} 
                        className="rounded-t-xl"
                        src={recipe.image} 
                        fill
                    />
                </Suspense>
            </div>
            <div className="p-4 text-black">
                <span className={`${italicFont.className} text-xl sm:text-3xl xl:text-5xl`}>{key} {recipe.name}</span>
                <hr className="my-3 border-t-[0.5px] border-current border-solid"/>
                <div className="text-xs sm:text-base"><b>IMAGE CONTROL:</b> {recipe.imageControl}</div>
                <div className="text-xs sm:text-base"><b>WHITE BALANCE:</b> {recipe.whiteBalance.type} | {recipe.whiteBalance.value}</div>
                <hr className="my-3 border-t-[0.5px] border-current border-solid"/>
                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-base">
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
                <div className="flex gap-1 items-center font-medium text-xs sm:text-base">EXPLORE <ArrowRightIcon/></div>
            </div>
        </Link>
    )
}
