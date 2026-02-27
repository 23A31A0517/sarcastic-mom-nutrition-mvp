"use client";

import { useState } from "react";

export default function Home() {
  const [meal, setMeal] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meal.trim()) return;

    const userMessage = { role: "user", content: meal };
    setMessages((prev) => [...prev, userMessage]);
    setMeal("");
    setLoading(true);

    try {
      const res = await fetch("/api/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meal })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oh wonderful. It broke. Maybe eat a vegetable while we fix this."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-2">
          🥦 Sarcastic Mom Nutrition Advisor
        </h1>

        <p className="text-sm text-center text-gray-500 mb-6">
          Log your meal. Get judged lovingly.
        </p>

        <div className="flex-1 space-y-3 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl text-sm max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-200 p-3 rounded-xl text-sm max-w-[80%]">
              Judging...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            placeholder="What did you eat?"
            className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50"
          >
            Judge Me
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-6 text-center">
          This is not medical advice.
        </p>
      </div>
    </main>
  );
}
