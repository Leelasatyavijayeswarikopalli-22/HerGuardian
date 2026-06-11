export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-purple-900 shadow-md
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}