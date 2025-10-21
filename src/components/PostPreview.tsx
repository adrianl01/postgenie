"use client";
import React, { useEffect, useState } from "react";
import CopiedSign from "./Copied";

type dataType = {
  title: string;
  content: string;
  hashtags?: string[];
};

export default function PostPreview({ result }: { result: any }) {
  const [data, setData] = useState({} as dataType | null);
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    setData(result);
  }, [result]);
  if (!data) {
    return (
      <div className="flex justify-center items-center bg-white p-6 rounded-xl shadow h-full">
        <p className="text-gray-500">Here you'll see your generated post</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow h-full">
      <h3 className="font-semibold text-lg mb-2">{data.title}</h3>
      <p
        onClick={(e) => {
          e.preventDefault();
          const textContent = data.content.replace(/\n/g, "\n");
          navigator.clipboard.writeText(textContent);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }}
        title="Click to copy this caption"
        className="mb-4 whitespace-pre-wrap rounded-xl shadow transition hover:shadow-lg p-2"
      >
        {data.content}
      </p>
      <div className="flex flex-wrap gap-2">
        {result &&
          result.hashtags?.map((h: string, idx: number) => (
            <span
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                const textContent = `#${h.replace("#", "")}`;
                navigator.clipboard.writeText(textContent);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              className="text-sm px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
            >
              #{h.replace("#", "")}
            </span>
          ))}
      </div>
      {isCopied && <CopiedSign />}
    </div>
  );
}
