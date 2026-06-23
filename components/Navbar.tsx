"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout as logoutService } from "@/services/auth/loginAuth";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [nombre, setNombre] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                setNombre(JSON.parse(stored).nombre ?? null);
            } catch {
                setNombre(null);
            }
        }
    }, [pathname]);

    const logout = async () => {
        await logoutService();
        localStorage.removeItem("user");
        setNombre(null);
        router.push("/auth/login");
    };

    if (pathname.startsWith("/auth")) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <Link href="/" className="text-lg font-bold text-sky-600">
                prueba de desempeño
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
                <Link href="/favorites" className="hover:text-sky-600">Favoritos</Link>
                <Link href="/users" className="hover:text-sky-600">Usuarios</Link>
                {nombre ? (
                    <>
                        <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                            Hola, {nombre}
                        </span>
                        <button onClick={logout} className="text-rose-600 hover:text-rose-700">
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link href="/auth/login" className="hover:text-sky-600">Iniciar sesión</Link>
                )}
            </div>
        </nav>
    );
}
