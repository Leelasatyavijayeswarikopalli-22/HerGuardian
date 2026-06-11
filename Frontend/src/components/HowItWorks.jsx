export default function HowItWorks() {
  const steps = [
    "User selects destination",
    "AI analyzes route safety",
    "Community reports are considered",
    "Safety score is generated",
    "Voice SOS remains active",
  ];

  return (
    <section className="bg-white py-20">

      <div className="mx-auto max-w-5xl px-6">

        <h2 className="mb-12 text-center text-4xl font-bold">
          How It Works
        </h2>

        <div className="space-y-6">

          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl border p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 font-bold text-white">
                {index + 1}
              </div>

              <p>{step}</p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}