"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { InfoBar } from "./components/info-bar/InfoBar";
import { MAX_IMAGES_IN_GRID } from "./constants";

const GalleryTrigger = dynamic(
  () => import("./components/gallery-trigger/GalleryTrigger"),
  {
    ssr: false,
  }
);

type Props = {
  images: string[];
};

export const Gallery: FC<Props> = ({ images }) => {
  const primaryImages = images.slice(0, MAX_IMAGES_IN_GRID);

  return (
    <>
      <div className="relative aspect-video md:hidden">
        <GalleryTrigger
          images={images}
          index={0}
          className={classNames(
            "shadow-lg relative w-full h-full object-cover rounded-lg border-solid border-divider/25 border-1"
          )}
        />
        <InfoBar imageCount={images.length} />
      </div>

      <div
        className={twMerge(
          classNames("hidden", "md:block md:grid md:gap-2 md:w-full", {
            "md:grid-cols-2": primaryImages.length > 1,
            "md:grid-cols-3": primaryImages.length > 2,
            "xl:grid-cols-4": primaryImages.length > 4,
          })
        )}
      >
        {primaryImages.map((image, index) => (
          <div
            key={index}
            className={twMerge(
              classNames("relative", {
                "col-span-2 row-span-2": !index && primaryImages.length > 2,
                "md:hidden xl:block": index > 2,
                "hidden xl:hidden": primaryImages.length === 4 && index === 3,
                "aspect-video": primaryImages.length === 1,
              })
            )}
          >
            <GalleryTrigger
              images={images}
              index={index}
              className={twMerge(
                classNames(
                  "object-cover w-full h-full shadow-lg border-solid border-divider/25 border-1",
                  {
                    "rounded-lg": primaryImages.length === 1,
                    "rounded-l-lg": !index && primaryImages.length > 1,
                    "rounded-r-lg": index && primaryImages.length === 2,
                    "rounded-tr-lg xl:rounded-none":
                      index === 1 && primaryImages.length > 2,
                    "rounded-br-lg xl:rounded-none":
                      index === 2 && primaryImages.length > 2,
                    "xl:rounded-tr-lg":
                      (index === 1 &&
                        primaryImages.length > 2 &&
                        primaryImages.length < 5) ||
                      (index === 2 && primaryImages.length > 4),
                    "xl:rounded-br-lg":
                      (index === 2 &&
                        primaryImages.length > 2 &&
                        primaryImages.length < 5) ||
                      (index === 4 && primaryImages.length > 4),
                  }
                )
              )}
            />
            {!index ? <InfoBar imageCount={images.length} /> : null}
          </div>
        ))}
      </div>
    </>
  );
};
