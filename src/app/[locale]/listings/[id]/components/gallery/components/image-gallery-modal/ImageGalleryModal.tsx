"use client";

import { FC, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";

import { Modal } from "@/components/common/modal/Modal"; // твоя обёртка
type Props = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
};

export const ImageGalleryModal: FC<Props> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
  });

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // инициализация
  }, [emblaApi, onSelect]);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {images.map((src, i) => (
            <div
              key={i}
              className={classNames(
                "px-1 w-9/10 shrink-0 min-w-0 flex justify-center items-center transition-opacity duration-300 mx-auto rounded-lg",
                "xl:w-2/3 xl:px-3",
                {
                  "opacity-100": i === activeIndex,
                  "opacity-20": i !== activeIndex,
                }
              )}
            >
              <img
                src={src}
                className={classNames(
                  "object-cover w-full rounded-lg",
                  "xl:max-w-3/4"
                )}
                alt={`Image ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
