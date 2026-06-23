"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/services/auth/registerAuth";
import { useI18n } from "@/lib/i18n";

export default function RegisterPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [form, setForm] = useState({ nombre: "", cc: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await CreateUser(form);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/auth/login");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200 md:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-sky-600 via-indigo-600 to-violet-700 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                {t("register.badge")}
              </span>
              <h2 className="mt-6 text-4xl font-semibold leading-tight">
                {t("register.welcomeTitle")}
              </h2>
            </div>
            <p className="text-sm text-sky-50/90">
              {t("register.welcomeText")}
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Simulacro</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">{t("register.title")}</h1>
              <p className="mt-1 text-sm text-slate-500">{t("register.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
                  {t("register.fullName")}
                </label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Juan García"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cc" className="text-sm font-medium text-slate-700">
                  {t("register.cc")}
                </label>
                <input
                  id="cc"
                  type="text"
                  name="cc"
                  value={form.cc}
                  onChange={handleChange}
                  placeholder="12345678"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  {t("common.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  {t("common.password")}
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-slate-700">
                  {t("register.role")}
                </label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="user">{t("register.roleUser")}</option>
                  <option value="admin">{t("register.roleAdmin")}</option>
                </select>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-sky-600 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-400"
              >
                {loading ? t("register.submitting") : t("register.submit")}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              {t("register.haveAccount")}{" "}
              <a href="/auth/login" className="font-semibold text-sky-600 hover:text-sky-700">
                {t("register.login")}
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}