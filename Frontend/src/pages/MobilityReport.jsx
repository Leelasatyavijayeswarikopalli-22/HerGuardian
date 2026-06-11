import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

export default function MobilityReport() {
  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Mobility Safety Report
      </h1>

      <Card>

        <div className="space-y-4">

          <Input placeholder="Home Location" />

          <Input placeholder="Work Location" />

          <Input placeholder="Shift Timing" />

          <Button className="w-full">
            Generate Report
          </Button>

        </div>

      </Card>

    </div>
  );
}