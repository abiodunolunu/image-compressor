interface ShareProps {
  file: File;
  fileName: string;
}

import sharePNG from "../assets/images/share.png";
export default function Share({ file, fileName }: ShareProps) {
  const triggerShare = () => {
    if (!navigator || !navigator.share)
      return alert("Your browser does not support this feature");

    navigator.share({
      title: fileName + "compressed with " + location.href,
      files: [file],
      text: fileName || "IMAGE",
    });
  };

  return (
    <button className="mx-auto" onClick={() => triggerShare()}>
      <img src={sharePNG} alt="share-icon" className="h-10" />
    </button>
  );
}
