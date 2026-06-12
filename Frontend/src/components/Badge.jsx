export default function Badge({
  text,
  color = "green",
}) {
  const colors = {
    green: "bg-green-400 text-black",
    yellow: "bg-yellow-400 text-black",
    red: "bg-red-400 text-black",
    blue: "bg-blue-400 text-black",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        text-cyan-500
        font-semibold
        ${colors[color]}
      `}
    >
      {text}
    </span>
  );
}