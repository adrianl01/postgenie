"use client";
import React, { useState } from "react";
import axios from "axios";

type Props = {
  onResult: (res: any) => void;
};

export default function PostForm({ onResult }: Props) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("X");
  const [tone, setTone] = useState("Profesional");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log(topic, platform, tone);
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
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="Ej: Productividad en lunes"
        required
      />

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
        {loading ? "Generanting..." : "Generar post"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </form>
  );
}
