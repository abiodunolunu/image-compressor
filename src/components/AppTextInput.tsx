interface AppTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AppTextInput({ label, ...rest }: AppTextInputProps) {
  return (
    <div>
      <label
        htmlFor={rest.id}
        className="text-xs text-gray-600 cursor-pointer mb-1"
      >
        {label}
      </label>
      <input
        className="h-8 px-2 w-full border rounded focus:border-blue-400 outline-none text-sm"
        {...rest}
      />
    </div>
  );
}
