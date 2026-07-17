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
          <p className="text-sm text-slate-900">
            {title}
          </p>

        <h3
className="mt-3
text-4xl
font-bold
text-purple-700"
>

{value}

</h3>


<p
className="mt-2
text-sm
text-slate-500"
>

/100 Safety Score

</p>
        </div>

        <div>
          {icon}
        </div>

      </div>

    </Card>
  );
}