import { useState } from "react";
import Button from "../Button";
import Card from "../Card";

export default function ReportForm() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Card>

      <h2 className="mb-5 text-xl font-semibold">
        Community Safety Report
      </h2>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 w-full rounded-xl border p-3"
      >
        <option value="">
          Select Category
        </option>

        <option>
          Harassment
        </option>

        <option>
          Poor Lighting
        </option>

        <option>
          Unsafe Transport
        </option>

        <option>
          Stalking
        </option>
      </select>

      <textarea
        rows="5"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Describe the issue..."
        className="w-full rounded-xl border p-3"
      />

      <Button className="mt-5 w-full">
        Submit Report
      </Button>

    </Card>
  );
}