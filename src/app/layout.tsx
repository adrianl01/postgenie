import "@/globals.css";
import React from "react";

export const metadata = {
  title: "PostGenie",
  description: "AI Social Media Assistant - MVP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
