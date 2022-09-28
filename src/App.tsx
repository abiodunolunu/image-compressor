import { useEffect, useState } from "react";
import "./App.css";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import GetImageForm from "./components/GetImageForm";
import ImagePreview from "./components/ImagePreview";
import { compressImage, getImageWidthAndHeight, ImageType } from "./compressor";
import { getImageExtenstionFromFileName } from "./utils/utils";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [compressedImage, setCompressedImage] = useState<File | null>(null);

  const [compressedImageExtension, setCompressedImageExtension] = useState("");

  const [compressedImageUrl, setCompressedImageUrl] = useState<string | null>(
    null
  );

  const [compressedImageDimensions, setCompressedImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (compressedImage) {
      console.log("ran", compressedImage);
      const ext = getImageExtenstionFromFileName(compressedImage.name);
      console.log({ ext });
      if (ext) {
        setCompressedImageExtension(ext);
      }
    }
  }, [compressedImage]);

  const modifyImage = async ({
    file,
    fileName,
    newWidth,
    format,
  }: {
    file: File;
    fileName: string;
    newWidth: number;
    format: ImageType;
  }) => {
    setIsLoading(true);
    if (compressedImageUrl) {
      URL.revokeObjectURL(compressedImageUrl);
    }
    console.log("modifyImage", { format });
    const result = await compressImage(file, newWidth, format);
    console.log("result", { result: result.type });
    setCompressedImage(() => result);
    setCompressedImageUrl(() => URL.createObjectURL(result));
    const { height, width } = await getImageWidthAndHeight(result);
    setCompressedImageDimensions({ width: width, height: height });

    setIsLoading(false);
    document.querySelector("#result")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const reset = () => {
    setCompressedImage(null);
    setCompressedImageExtension("");
    setCompressedImageUrl(null);
    setCompressedImageDimensions({ width: 0, height: 0 });
  };

  return (
    <div className="App grid pt-20">
      <AppHeader />
      <div className="min-h-screen flex flex-col gap-3 items-center justify-center">
        <p className="text-xl text-center font-medium">
          Resize images online, selecting the new image's size and quality and
          extension.
        </p>
        <GetImageForm
          modifyImage={modifyImage}
          isLoading={isLoading}
          reset={reset}
        />
      </div>
      {!!(compressedImage && compressedImageUrl) ? (
        <div
          id="result"
          className="min-h-screen flex flex-col gap-2  items-center justify-center bg-gray-50"
        >
          <h2 className="font-bold text-2xl uppercase">Result : </h2>
          <ImagePreview
            file={compressedImage}
            showDownloadForm
            imageSize={compressedImage.size}
            imageUrl={compressedImageUrl}
            imageDimensions={compressedImageDimensions}
            fileExtension={compressedImageExtension}
          />
        </div>
      ) : null}

      <AppFooter />
    </div>
  );
}

export default App;
