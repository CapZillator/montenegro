import { FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";

import { deleteListingImageFetcher } from "@/fetchers/images";
import { uploadImageFetcher } from "@/fetchers/images";
import { useToast } from "@/hooks/use-toast/useToast";
import { useTranslation } from "@/hooks/use-translation/useTranslation";
import { truncateFileName } from "@/utils/files";

import { Button } from "../../button/Button";
import { ButtonIcon } from "../../button/enums";
import { Close } from "../../icons/actions/Close";
import { Upload } from "../../icons/actions/Upload";
import { Image } from "../../icons/Image";
import { Photo } from "../../icons/Photo";
import { ImagePreview } from "./components/image-preview/ImagePreview";
import { ALLOWED_TYPES, MAX_FILE_SIZE_MB, MAX_IMAGES } from "./constants";

type Props = {
  name: string;
  control: Control<any, any>;
  disabled?: boolean;
};

export const ImageUploader: FC<Props> = ({ name, control, disabled }) => {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter(
        (file) =>
          ALLOWED_TYPES.includes(file.type) &&
          file.size <= MAX_FILE_SIZE_MB * 1024 * 1024
      );

      if (filteredFiles.length < acceptedFiles.length) {
        showToast(t("warnings.wrongFile"), "info");
      }

      setImages((prev) => [...prev, ...filteredFiles]);
    },
    multiple: true,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value: uploadedUrls = [], onChange } = field;

        const handleUpload = async () => {
          if (images.length + uploadedUrls.length > MAX_IMAGES) {
            showToast(t("warnings.tooMany"), "info");

            return;
          }

          setUploading(true);

          try {
            const formData = new FormData();
            images.forEach((image) => formData.append("file", image));
            const uploadedImages = await uploadImageFetcher(formData);

            if (uploadedImages.results) {
              onChange([
                ...uploadedUrls,
                ...uploadedImages.results.map((img: any) => img.secure_url),
              ]);
              setImages([]);
            }
          } catch (_error) {
            showToast(t("errors.uploadFailed"), "error");
          }

          setUploading(false);
        };

        const handleDelete = async (publicId: string) => {
          try {
            setUploading(true);
            await deleteListingImageFetcher([publicId]);

            onChange(
              uploadedUrls.filter((url: string) => !url.includes(publicId))
            );
          } catch (_error) {
            showToast(t("errors.deleteFailed"), "error");
          } finally {
            setUploading(false);
          }
        };

        const isLimitReached =
          images.length + uploadedUrls.length >= MAX_IMAGES;

        return (
          <div className="p-4 border border-gray-300 rounded-lg">
            <div
              {...getRootProps()}
              className="flex items-center justify-center border-dashed border-2 border-secondary-content p-6 text-center cursor-pointer rounded-sm"
            >
              <input {...getInputProps()} {...{ disabled }} />
              <div className={classNames("flex items-center gap-4")}>
                <Upload className="w-15 h-15 stroke-secondary-content" />
                <div className="text-start">
                  <p>{t("files.dragToAdd")}</p>
                  <p className={classNames("text-sm")}>
                    {t("files.restriction")}
                  </p>
                </div>
              </div>
            </div>

            {images.length > 0 && (
              <div className="mt-4 space-y-2">
                <ul>
                  {images.map((file, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Image className="fill-primary-content/75 w-4 h-4" />
                      <span>{truncateFileName(file.name)}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setImages(images.filter((_, i) => i !== index))
                        }
                        disabled={disabled || uploading}
                        className="w-4 h-4"
                      >
                        <Close className="fill-secondary-content cursor-pointer" />
                      </button>
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  disabled={isLimitReached || uploading}
                  onClick={handleUpload}
                  icon={ButtonIcon.UPLOAD}
                  iconClassName="stroke-primary"
                >
                  <span>{t("actions.upload")}</span>
                </Button>
              </div>
            )}

            {uploadedUrls.length > 0 && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Photo className="w-5 h-5 fill-primary-content" />
                  <span className="text-lg">
                    {uploadedUrls.length} / {MAX_IMAGES}
                  </span>
                </div>
                {
                  <ImagePreview
                    uploadedUrls={uploadedUrls}
                    setUploadedUrls={(newUrls) => onChange(newUrls)}
                    handleDelete={handleDelete}
                    {...{ disabled }}
                  />
                }
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
