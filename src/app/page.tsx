"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-2">PostGenie</h1>
        <p className="text-gray-600 mb-6">
          AI Social Media Post Generator — create texts, hashtags in seconds.
        </p>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
