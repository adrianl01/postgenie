"use client";
import React, { useState } from "react";
import axios from "axios";

type Props = {
  onResult: (res: any) => void;
};

export default function PostForm({ onResult }: Props) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState({ status: false, message: "" });
  const errorHandlers = {
    status: false,
    message: ["This field is required.", "Must be at least 10 characters."],
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Submitting form with topic:", topic);
    try {
      if (!topic.trim()) {
        setShowError({ status: true, message: errorHandlers.message[0] });
        return;
      }
      if (topic.trim().length < 10) {
        setShowError({ status: true, message: errorHandlers.message[1] });
        return;
      }
      setShowError({ status: false, message: "" });
      const res = await axios.post("/api/generate", { topic, platform, tone });
      onResult(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
      <label className="block mb-2 text-sm font-medium">Post theme</label>
      <input
        type="text"
        title="post topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onBlur={() => setShowError({ status: false, message: "" })}
        className={`w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          showError.status ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Ej: Productivity tips"
        // required
        // onInvalid={(e) =>
        //   (e.target as HTMLInputElement).setCustomValidity(
        //     "Please provide a topic"
        //   )
        // }
        // onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
      />
      {showError.status && (
        <p className="text-red-500 text-sm mt-1 transition animation-duration-500 animate-fade-in animate-fade-out">
          {showError.message}
        </p>
      )}
      <label className="block mb-2 text-sm font-medium">Socials</label>
      <select
        title="socials"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option>X</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
        <option>Facebook</option>
      </select>

      <label className="block mb-2 text-sm font-medium">Tones</label>
      <select
        title="post type"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option>Professional</option>
        <option>Informal</option>
        <option>Inspiring</option>
        <option>Humoristic</option>
      </select>

      <button
        disabled={loading}
        className="w-full py-2 bg-indigo-600 text-white rounded"
      >
        {loading ? "Generanting..." : "Generate post"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </form>
  );
}
