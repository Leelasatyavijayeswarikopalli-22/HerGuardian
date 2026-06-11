import Card from "../Card";

export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {value}
          </h3>
        </div>

        <div>
          {icon}
        </div>

      </div>

    </Card>
  );
}