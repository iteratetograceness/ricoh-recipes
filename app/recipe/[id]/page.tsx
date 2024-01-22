import { get } from "@vercel/edge-config";
import { notFound } from "next/navigation";
import { STIX_Two_Text } from 'next/font/google'
import { Recipe } from "~/app/_lib/types";
import { ButtonLink } from "~/app/_components/button-link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { list } from "@vercel/blob";
import { ImageGallery } from "~/app/_components/image-gallery";

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
      </div>
    );
  }