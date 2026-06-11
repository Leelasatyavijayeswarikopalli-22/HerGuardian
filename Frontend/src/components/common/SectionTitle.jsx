export default function SectionTitle({
  title,
  subtitle
}) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}