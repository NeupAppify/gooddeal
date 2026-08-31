"use client";

/*
::neup.documentation::property-gallery
::function PropertyGallery(props)
::title Property Gallery

::public

Renders a property album view and opens a full-screen viewer when an image is selected.

::param external props.images
::datatype string[]
::required true

The property image URLs to show in the gallery.

::param external props.title
::datatype string
::required true

The property title used for image alt text and viewer context.

::returns
::datatype React.ReactElement

An interactive gallery with responsive album tiles and a full-page image viewer.

::public end

::end
*/

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useState } from "react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const galleryImages = images.length > 0 ? images : ["/hero.png"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const activeImage = galleryImages[activeIndex] ?? galleryImages[0];
  const visibleImages = galleryImages.slice(0, 3);

  const openViewer = (index: number) => {
    setActiveIndex(index);
    setViewerOpen(true);
  };

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <>
      <section className="pt-24 pb-4 bg-white">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12">
          <div
            className={
              galleryImages.length === 1
                ? "grid gap-3"
                : "grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]"
            }
          >
            <button
              type="button"
              onClick={() => openViewer(0)}
              className={`group relative overflow-hidden rounded-lg bg-platinum text-left ${
                galleryImages.length === 1 ? "aspect-[16/6]" : "aspect-[16/7] lg:aspect-auto"
              }`}
            >
              <Image
                src={visibleImages[0]}
                alt={title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-charcoal shadow-lg">
                <Expand className="h-4 w-4" />
                View full screen
              </div>
            </button>

            {galleryImages.length > 1 && (
              <div className={galleryImages.length === 2 ? "grid gap-3" : "grid grid-cols-2 gap-3 lg:grid-cols-1"}>
                {visibleImages.slice(1).map((image, offsetIndex) => {
                  const imageIndex = offsetIndex + 1;
                  const isAllImagesTile = galleryImages.length >= 3 && imageIndex === 2;

                  return (
                    <button
                      key={`${image}-${imageIndex}`}
                      type="button"
                      onClick={() => openViewer(imageIndex)}
                      className="group relative aspect-[16/7] overflow-hidden rounded-lg bg-platinum"
                    >
                      <Image
                        src={image}
                        alt={`${title} view ${imageIndex + 1}`}
                        fill
                        className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                      {isAllImagesTile && (
                        <div className="absolute inset-0 flex items-end justify-end bg-black/35 p-4">
                          <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-charcoal shadow-lg">
                            <Expand className="h-4 w-4" />
                            View all images
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {viewerOpen && (
        <div className="fixed inset-0 z-[100] bg-black text-white">
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-4 py-4 md:px-8">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{title}</div>
              <div className="text-xs text-white/70">
                {activeIndex + 1} of {galleryImages.length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              aria-label="Close image viewer"
              className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative h-full w-full px-4 py-20 md:px-16">
            <Image
              src={activeImage}
              alt={`${title} full-screen view`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
