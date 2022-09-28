interface AppSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export default function AppSelect({
  label,
  children,
  ...rest
}: AppSelectProps) {
  return (
    <div>
      <label
        htmlFor={rest.id}
        className="text-xs text-gray-600 cursor-pointer mb-1"
      >
        {label}
      </label>
      <select
        className="h-8 px-2 w-full border rounded focus:border-blue-400 outline-none text-sm"
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}
