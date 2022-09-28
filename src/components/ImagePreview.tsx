import React, { CSSProperties, useState } from "react";
import {
  convertBytesToKiloBytes,
  convertBytesToMegabytes,
  downloadFile,
} from "../utils/utils";
import AppButton from "./AppButton";
import Share from "./Share";

interface ImagePreviewProps {
  imageUrl: string;
  canDownload?: boolean;
  imageSize: number;
  imageDimensions: {
    width: number;
    height: number;
  };
  fileName?: string;
  fileExtension?: string;
  showDownloadForm?: boolean;
  small?: boolean;
  file?: File;
}

const smallImageStyle: CSSProperties = {
  // maxWidth: "32rem",
  maxHeight: "20rem",
};

const normalImageStyle: CSSProperties = {
  // maxWidth: "48rem",
  maxHeight: "20rem",
};

export default function ImagePreview({
  imageUrl,
  imageDimensions,
  imageSize,
  fileExtension,
  showDownloadForm,
  small,
  file,
}: ImagePreviewProps) {
  const [fileName, setFileName] = useState<string>("file");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileExtension) return;
    downloadFile(imageUrl, fileName, fileExtension);
  };

  return (
    <div className="grid gap-2">
      <div
        className="rounded-lg overflow-hidden border-4 border-blue-300"
        style={small ? { ...smallImageStyle } : { ...normalImageStyle }}
      >
        <img src={imageUrl} alt={imageUrl} className="h-full mx-auto" />
      </div>
      <div className="flex justify-between items-center gap-4 text-gray-600 text-xs">
        <p>{`${imageDimensions.width} x ${imageDimensions.height}`}</p>
        <p>
          {convertBytesToMegabytes(imageSize) + "MB"} (
          {convertBytesToKiloBytes(imageSize) + "KB"})
        </p>
      </div>

      {showDownloadForm && fileExtension && (
        <React.Fragment>
          <div className="text-center my-3">
            {file && <Share file={file} fileName={fileName} />}
          </div>
          <form className="grid gap-2 justify-center" onSubmit={handleSubmit}>
            <div className="font-mono text-sm">
              <input
                className=" h-6 px-2 outline-none border rounded-sm"
                onChange={(e) => setFileName(e.target.value)}
                value={fileName}
                required
                placeholder="File name"
              />
              <span>.{fileExtension}</span>
            </div>
            <AppButton type="submit">Download</AppButton>
          </form>
        </React.Fragment>
      )}
    </div>
  );
}
