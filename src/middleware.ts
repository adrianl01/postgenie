import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Si la ruta es pública, dejamos pasar
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Verificamos si el usuario está autenticado
  const { userId } = await auth();
  if (!userId) {
    // Importante: redirigir o devolver respuesta válida
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Todo OK → continuar
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/"],
};
