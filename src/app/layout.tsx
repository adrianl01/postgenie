import "@/globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
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
    <ClerkProvider>
      <html lang="es">
        <body className="bg-gray-500 text-gray-900">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
