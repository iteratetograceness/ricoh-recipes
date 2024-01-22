import { ListBlobResultBlob } from "@vercel/blob";
import Image from "next/image";

export function ImageGallery({ recipeName, photos }: {
    recipeName: string;
    photos: ListBlobResultBlob[];
}): JSX.Element {
    const filterOutFolder = photos.filter((photo) => !photo.pathname.endsWith('/'))
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 -mx-10">
          <div className="relative w-full md:w-3/5 h-auto aspect-square bg-gray-100 justify-self-end self-end">
            <Image className="object-cover" alt={`Image taken with Ricoh GRIIx using custom ${recipeName} recipe`} src={filterOutFolder[0].url} fill />
          </div>

          <div className="relative w-full h-auto aspect-square bg-gray-100">
            <Image className="object-cover" alt={`Image taken with Ricoh GRIIx using custom ${recipeName} recipe`} src={filterOutFolder[1].url} fill />
          </div>

          <div className="relative w-full h-auto aspect-square bg-gray-100">
            <Image className="object-cover" alt={`Image taken with Ricoh GRIIx using custom ${recipeName} recipe`} src={filterOutFolder[2].url} fill />
          </div>

          <div className="relative w-full md:w-3/5 h-auto aspect-square bg-gray-100">
            <Image className="object-cover" alt={`Image taken with Ricoh GRIIx using custom ${recipeName} recipe`} src={filterOutFolder[3].url} fill />
          </div>
        </div>
    )
}