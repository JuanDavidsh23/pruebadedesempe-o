// Selector de idioma: cambia el idioma activo (es / en / pt) a través del contexto i18n.
"use client";

import { useI18n, type Lang } from "@/lib/i18n";

export default function LanguageSelector() {
    const { lang, setLang } = useI18n();

    return (
        <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            aria-label="Idioma"
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700"
        >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="pt">PT</option>
        </select>
    );
}
