// Navbar superior: enlaces de navegación, nombre del usuario autenticado y cierre de sesión.
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout as logoutService } from "@/services/auth/loginAuth";
import { useI18n } from "@/lib/i18n";
import LanguageSelector from "@/components/LanguageSelector";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useI18n();
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

    // En login/register solo mostramos el selector de idioma (para poder traducir esas páginas).
    if (pathname.startsWith("/auth")) {
        return (
            <div className="absolute right-6 top-6 z-20">
                <LanguageSelector />
            </div>
        );
    }

    return (
        <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <Link href="/" className="text-lg font-bold text-sky-600">
                Simulacro
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
                <Link href="/favorites" className="hover:text-sky-600">{t("nav.favorites")}</Link>
                <Link href="/cart" className="hover:text-sky-600">{t("nav.cart")}</Link>
                <Link href="/users" className="hover:text-sky-600">{t("users")}</Link>
                {nombre ? (
                    <>
                        <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                            {t("nav.greeting")} {nombre}
                        </span>
                        <button onClick={logout} className="text-rose-600 hover:text-rose-700">
                            {t("nav.logout")}
                        </button>
                    </>
                ) : (
                    <Link href="/auth/login" className="hover:text-sky-600">{t("nav.login")}</Link>
                )}
                <LanguageSelector />
            </div>
        </nav>
    );
}
