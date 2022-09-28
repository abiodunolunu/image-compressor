import { ChangeEvent, useRef, useState } from "react";
import { getImageWidthAndHeight, ImageType } from "../compressor";
import {
  getNewHeightAccordingToScaleFactor,
  getNewWidthAccordingToScaleFactor,
  getScaleFactor,
} from "../utils/utils";
import AppButton from "./AppButton";
import AppSelect from "./AppSelect";
import AppTextInput from "./AppTextInput";
import ImagePreview from "./ImagePreview";

interface GetImageFormProps {
  modifyImage: ({
    file,
    fileName,
    newWidth,
    format,
  }: {
    file: File;
    fileName: string;
    newWidth: number;
    format: ImageType;
  }) => void;
  isLoading: boolean;
  reset: () => void;
}

export default function GetImageForm({
  modifyImage,
  isLoading,
  reset,
}: GetImageFormProps) {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [imageExtension, setImageExtension] = useState<string>("PNG");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const [scaleFactor, setScaleFactor] = useState<number>(0);

  const [newImageDimensions, setNewImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const toggleFilePicker = () => {
    if (filePickerRef.current) {
      filePickerRef.current.accept = "image/*";
      filePickerRef.current.click();
    }
  };

  const handleFilePickerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!filePickerRef.current) return;
    const target = e.target;
    const files = target.files;

    if (!files || files.length === 0) {
      return alert("You didn't pick any file");
    }

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      return alert("You didn't pick an image");
    }

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const { height, width } = await getImageWidthAndHeight(file);
    const scaleFactor = getScaleFactor(width, height);
    setFile(file);
    setImageDimensions({ width, height });
    setNewImageDimensions({ width, height });
    setImageUrl(URL.createObjectURL(file));
    setScaleFactor(scaleFactor);
  };

  const removeImage = () => {
    setFile(null);
    setImageUrl(null);
    setImageDimensions({ width: 0, height: 0 });
    setNewImageDimensions({ width: 0, height: 0 });
    setScaleFactor(0);
    reset();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    let { name, value } = target;
    if (+value < 1) {
      value = "1";
    }

    if (name === "width") {
      const width = parseInt(value);
      setNewImageDimensions({
        width: width,
        height: getNewHeightAccordingToScaleFactor(width, scaleFactor),
      });
    } else if (name === "height") {
      const height = parseInt(value);
      setNewImageDimensions({
        width: getNewWidthAccordingToScaleFactor(height, scaleFactor),
        height,
      });
    }
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
    if (!file) return;
    if (imageExtension === null) return;

    modifyImage({
      file: file,
      fileName: file.name,
      newWidth: newImageDimensions.width,
      format: imageExtension as ImageType,
    });
  };

  return (
    <div>
      <form
        className="flex flex-col gap-5 items-center justify-center"
        onSubmit={handleSubmit}
      >
        {!!(file && imageUrl) ? (
          <div>
            <div>
              <ImagePreview
                small
                imageSize={file.size}
                imageUrl={imageUrl}
                fileName={file.name}
                imageDimensions={{
                  width: imageDimensions.width,
                  height: imageDimensions.height,
                }}
              />
              <div className="text-center">
                <button
                  className="text-red-600 text-xs text-center cursor-pointer font-medium"
                  onClick={removeImage}
                  type="button"
                >
                  Remove Image
                </button>
              </div>
            </div>

            <div
              className="grid grid-cols-3 justify-center gap-1 gap-y-5 mx-auto"
              style={{ width: "240px" }}
            >
              <AppTextInput
                label="Width"
                id="Width"
                type="number"
                name="width"
                onChange={handleChange}
                value={newImageDimensions.width}
              />
              <AppTextInput
                label="Height"
                id="Height"
                type="number"
                name="height"
                onChange={handleChange}
                value={newImageDimensions.height}
              />
              <AppSelect
                label="Extension"
                onChange={(e) => setImageExtension(e.target.value)}
                value={imageExtension}
              >
                <option value="PNG" defaultChecked>
                  .png
                </option>
                <option value="bmp">.bmp</option>
                <option value="ico">.ico</option>
                <option value="jpeg">.jpeg</option>
                <option value="tiff">.tiff</option>
                <option value="webp">.webp</option>
              </AppSelect>
              <AppButton className="col-span-3 mx-auto" fullWidth type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </AppButton>
            </div>
          </div>
        ) : (
          <AppButton onClick={toggleFilePicker} size="lg" type="button">
            <input
              type="file"
              ref={filePickerRef}
              className="hidden"
              onChange={handleFilePickerChange}
            />
            Pick an image
          </AppButton>
        )}
      </form>
    </div>
  );
}
