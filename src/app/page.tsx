"use client";
import PostForm from "@/components/PostForm";
import PostPreview from "@/components/PostPreview";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-2">PostGenie</h1>
        <p className="text-gray-600 mb-6">
          AI Social Media Post Generator — create texts, hashtags in seconds.
        </p>
        <div className="flex gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PostForm onResult={setResult} />
            <PostPreview result={result} />
          </div>
        </div>
      </div>
    </main>
  );
}
