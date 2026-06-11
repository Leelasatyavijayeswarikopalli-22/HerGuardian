import Card from "../components/Card";
import Badge from "../components/Badge";

export default function Profile() {
  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Profile
      </h1>

      <Card>

        <h2 className="text-xl font-semibold">
          Voice SOS
        </h2>

        <div className="mt-4">
          <Badge
            text="Active"
            color="green"
          />
        </div>

        <p className="mt-4">
          Secret Phrase: ************
        </p>

      </Card>

    </div>
  );
}