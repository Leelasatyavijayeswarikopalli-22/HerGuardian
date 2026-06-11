import { useState } from "react";
import Card from "../Card";
import Button from "../Button";
import Input from "../Input";
import { Mic } from "lucide-react";

export default function SecretPhraseForm() {
  const [phrase, setPhrase] = useState("");

  const handleSave = () => {
    alert("Secret Phrase Saved");
  };

  return (
    <Card>

      <div className="mb-5 flex items-center gap-2">
        <Mic className="text-pink-600" />

        <h2 className="text-xl text-blue-950 font-semibold">
          Voice SOS Setup
        </h2>
      </div>

      <Input className="text-blue-950"
        placeholder="Enter Secret Phrase"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
      />

      <p className="mt-3 text-sm text-slate-800">
        Example:
        "The blue notebook is on my desk"
      </p>

      <Button
        className="mt-5 w-full"
        onClick={handleSave}
      >
        Save Phrase
      </Button>

    </Card>
  );
}