export enum ImageType {
  JPEG = "image/jpeg",
  PNG = "image/png",
  WEBP = "image/webp",
  BMP = "image/bmp",
  TIFF = "image/tiff",
  ICO = "image/x-icon",
}

export const compressImage = (file: File, width: number, format: ImageType) => {
  console.log({ format });
  //check if file is an image
  if (!file.type.startsWith("image/")) {
    throw new Error("The file is not an image");
  }

  let scaleFactor: number;
  let height;
  const fileName = file.name;

  return new Promise<File>((resolve, reject) => {
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    img.src = imageUrl;

    img.onload = () => {
      scaleFactor = width / img.width;
      height = img.height * scaleFactor;
      const elem = document.createElement("canvas");
      elem.width = width;
      elem.height = height;
      const ctx = elem.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas context error");
      }
      ctx.drawImage(img, 0, 0, width, height);
      ctx.canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error("Canvas to blob error");
          }
          const file = new File([blob], `compressed.${format}`, {
            type: format,
            lastModified: Date.now(),
          });
          URL.revokeObjectURL(imageUrl);
          resolve(file);
        },
        `image/${format}`,
        1
      );
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
};

// get image width from file
export function getImageWidthAndHeight(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);
    img.src = imageUrl;
    img.onload = () => {
      URL.revokeObjectURL(imageUrl);
      resolve({ height: img.height, width: img.width });
    };
  });
}

export const getScaleFactor = (width: number, height: number) => {
  return width / height;
};
