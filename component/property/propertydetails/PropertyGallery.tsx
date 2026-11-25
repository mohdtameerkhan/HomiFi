
import Image from "next/image";
import { PropertyDetailsResponse } from "@/types/propertydetails";

type PropertyGalleryPhoto = {
  photos: PropertyDetailsResponse["detail"]["photos"];
};

export default function PropertyGallery({
  photos,
}: PropertyGalleryPhoto) {
  const visiblePhotos = photos.slice(0, 5);

  const extraPhotos = Math.max(photos.length - 5, 0);

  if (photos.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-gray-200">

      {/* Mobile Gallery */}
      <div className="relative h-65 sm:h-90 md:hidden">
        <Image
          src={photos[0].href}
          alt="Property image"
          fill
          priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

          className="object-cover"
        />

        <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 text-sm font-medium text-white">
          {photos.length} photos
        </div>
      </div>

      {/* Desktop Gallery */}
      <div className="hidden h-65 gap-2 sm:h-90 md:grid md:h-115 md:grid-cols-4 md:grid-rows-2">

        {/* Main Image */}
        <div className="relative col-span-2 row-span-2">
          <Image
            src={visiblePhotos[0].href}
            alt="Property main image"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>

        {/* Remaining Images */}
        {visiblePhotos.slice(1).map((photo, index) => {
          const isLastImage = index === 3;

          return (
            <div key={index} className="relative overflow-hidden">
              <Image
                src={photo.href}
                alt={`Property image ${index + 2}`}
                fill
                sizes="25vw"
                className="object-cover"
              />

              {/* More Photos Overlay */}
              {isLastImage && extraPhotos > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                  <span className="text-2xl font-semibold text-white">
                    +{extraPhotos} more
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
