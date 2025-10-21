"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  // Clerk usará las variables de entorno NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
  // para redirigir después del login. Si preferís, podés pasar redirectUrl aquí.
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Log In</h1>
        <SignIn path="/sign-in" routing="path" />
      </div>
    </main>
  );
}
