"use client";

import { FC } from "react";
import classNames from "classnames";

import { useModal } from "@/components/common/modal/ModalContext";

import { ImageGalleryModal } from "../image-gallery-modal/ImageGalleryModal";

type Props = {
  images: string[];
  index: number;
  className?: string;
};

const GalleryTrigger: FC<Props> = ({ images, index, className }) => {
  const { openModal, closeModal } = useModal();

  const handleClick = () => {
    openModal(
      "gallery",
      <ImageGalleryModal
        images={images}
        initialIndex={index}
        onClose={() => closeModal("gallery")}
      />
    );
  };

  return (
    <img
      src={images[index]}
      alt={`Preview ${index + 1}`}
      onClick={handleClick}
      className={classNames("cursor-pointer", className)}
    />
  );
};

export default GalleryTrigger;
