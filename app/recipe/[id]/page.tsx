import { get } from "@vercel/edge-config";
import { notFound } from "next/navigation";
import { STIX_Two_Text } from 'next/font/google'
import { Recipe } from "~/app/_lib/types";
import { ButtonLink } from "~/app/_components/button-link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { list } from "@vercel/blob";
import { ImageGallery } from "~/app/_components/image-gallery";

// TODO: Figure out how I want to display the recipe details on this page:

const italicFont = STIX_Two_Text({
  style: 'italic',
  subsets: ['latin']
})

export default async function RecipePage({
    params: { id },
  }: {
    params: { id: string };
  }) {
    const recipe = await get<Recipe>(Number(id).toString())

    if (!recipe) return notFound();

    const photos = await list({
      prefix: `${id} - ${recipe.name}`,
    });

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <ButtonLink href="/">
            <div className="text-xs md:text-base font-medium flex items-center gap-1">
                <ArrowLeftIcon strokeWidth="10px" />
                GO BACK
            </div>
          </ButtonLink>
          <h3 className={`${italicFont.className} text-3xl md:text-4xl xl:text-6xl`}>{id} {recipe.name}</h3>
        </div>
        <ImageGallery photos={photos.blobs} recipeName={recipe.name} />
        {/* <div className="relative h-fit sm:h-72">
          <div 
            className="relative mb-7 sm:mb-0 sm:absolute right-0 top-0 sm:-right-16 sm:top-10 md:-top-24 border-[0.5px] border-solid border-current border-r-0 p-4 rounded-l-lg flex flex-col pr-44 w-fit gap-2 text-sm md:text-md"
          >
            <div className="text-sm"><b>IMAGE CONTROL:</b> {recipe.imageControl}</div>
            <div className="text-sm"><b>WHITE BALANCE:</b> {recipe.whiteBalance.type} | {recipe.whiteBalance.value}</div>
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
        </div> */}
      </div>
    );
  }