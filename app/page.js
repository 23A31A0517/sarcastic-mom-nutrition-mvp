"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [problem, setProblem] = useState("");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(step + 1);

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch("/api/advice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem, answers })
    });

    const data = await res.json();
    setResult(data.reply);
    setLoading(false);
    setStep(3);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center mb-4">
          💇 Sarcastic Mom Health Lab
        </h1>

        {step === 1 && (
          <div className="space-y-4">
            <p>Select your problem:</p>
            <button
              onClick={() => { setProblem("hairfall"); handleNext(); }}
              className="bg-red-100 p-3 rounded-xl w-full"
            >
              Hairfall
            </button>
            <button
              onClick={() => { setProblem("pimples"); handleNext(); }}
              className="bg-red-100 p-3 rounded-xl w-full"
            >
              Pimples
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p>Answer honestly. Mom knows anyway.</p>

            <input
              type="number"
              placeholder="How many hours do you sleep?"
              className="border p-2 rounded-xl w-full"
              onChange={(e) =>
                setAnswers({ ...answers, sleep: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Stress level (1-10)"
              className="border p-2 rounded-xl w-full"
              onChange={(e) =>
                setAnswers({ ...answers, stress: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Protein intake (low/medium/high)"
              className="border p-2 rounded-xl w-full"
              onChange={(e) =>
                setAnswers({ ...answers, protein: e.target.value })
              }
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl w-full"
            >
              Let Mom Analyze
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            {loading ? (
              <p>Mom is judging...</p>
            ) : (
              <>
                <div className="bg-gray-200 p-4 rounded-xl">
                  {result}
                </div>
                <button
                  onClick={() => { setStep(1); setResult(null); }}
                  className="bg-gray-300 p-2 rounded-xl w-full"
                >
                  Start Again
                </button>
              </>
            )}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-6 text-center">
          This is not medical advice.
        </p>

      </div>
    </main>
  );
}
