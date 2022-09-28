import { ButtonHTMLAttributes, useEffect, useState } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function AppButton({
  size = "md",
  children,
  fullWidth = false,
  ...rest
}: ButtonProps) {
  const [sizeClass, setSizeClass] = useState<string>("");
  useEffect(() => {
    let str = "";
    if (size === "sm") {
      str = "h-6 px-2 py-1 text-xs";
    }
    if (size === "md") {
      str = "h-8 px-4 py-2 text-sm";
    }
    if (size === "lg") {
      str = "h-10 px-6 py-3 text-sm";
    }
    setSizeClass(str);
  }, [size]);
  return (
    <button
      {...rest}
      className={`rounded outline-none bg-blue-600 text-white flex justify-center items-center ${sizeClass} ${
        rest.className
      } ${fullWidth ? "w-full" : ""} `}
    >
      {children}
    </button>
  );
}
