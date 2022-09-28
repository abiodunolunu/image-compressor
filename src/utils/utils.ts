export const getScaleFactor = (width: number, height: number) => {
  return width / height;
};

export const rounded = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const convertBytesToMegabytes = (bytes: number) => {
  return rounded(bytes / 1000 / 1000, 1);
};

export const convertBytesToKiloBytes = (bytes: number) => {
  return rounded(bytes / 1000, 1);
};

export const getNewWidthAccordingToScaleFactor = (
  height: number,
  scaleFactor: number
) => {
  return height * scaleFactor;
};

export const getNewHeightAccordingToScaleFactor = (
  width: number,
  scaleFactor: number
) => {
  return width / scaleFactor;
};

export const downloadFile = (
  url: string,
  fileName: string,
  fileExtension: string
) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName + "." + fileExtension;
  link.download;
  document.body.appendChild(link);

  link.click();

  // const link = document.createElement("a")
  //   link.href = url
  //   link.setAttribute("download", fileName || "")
  //   document.body.appendChild(link)
  //   link.click()
};

export const getImageExtenstionFromFileName = (fileName: string) => {
  return fileName.split(".").pop();
};
