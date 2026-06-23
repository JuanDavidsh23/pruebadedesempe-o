// Middleware: solo protege las rutas privadas (favoritos y carrito).
// El catálogo (/) y el detalle de producto son públicos, visibles sin iniciar sesión.
import { NextRequest, NextResponse } from "next/server";

// Rutas que requieren sesión iniciada.
const protectedRoutes = ["/favorites", "/cart"];

export function middleware(request: NextRequest) {
    const session = request.cookies.get("session");
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname.startsWith("/auth");
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    // Sin sesión e intentando entrar a una ruta privada -> login.
    if (!session && isProtected) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Con sesión e intentando ver login/register -> home.
    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
