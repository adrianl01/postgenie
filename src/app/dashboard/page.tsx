"use client";
import React, { useState } from "react";
import PostForm from "../../components/PostForm";
import PostPreview from "../../components/PostPreview";

export default function DashboardPage() {
  const [result, setResult] = useState<any>(null);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Posts generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PostForm onResult={setResult} />
          <PostPreview result={result} />
        </div>
      </div>
    </main>
  );
}
