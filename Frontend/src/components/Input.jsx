export default function Input({
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full
        rounded-xl
        border
        border-slate-300
        px-4
        py-3
        outline-none
        focus:border-pink-500
        focus:ring-2
        focus:ring-pink-200
        ${className}
      `}
    />
  );
}