import { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";

export function ImageGallery({ recipeName, photos }: {
    recipeName: string;
    photos: ListBlobResultBlob[];
}): JSX.Element {
    const filterOutFolder = photos.filter((photo) => !photo.pathname.endsWith('/'))
    
    return (
      <div className='flex gap-4 w-fit'>
        {filterOutFolder.map((photo) => (
          <div
            className='relative w-[700px] h-auto aspect-[6/4] bg-gray-100 snap-center'
            key={photo.pathname}
          >
            <Image
              className='object-cover'
              alt={`Image taken with Ricoh GRIIx using custom ${recipeName} recipe`}
              src={photo.url}
              fill
            />
          </div>
        ))}
      </div>
    )
}