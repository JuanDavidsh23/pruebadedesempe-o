"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth/loginAuth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    localStorage.setItem("user", JSON.stringify(result.data));
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200 md:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-sky-600 via-indigo-600 to-violet-700 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                Bienvenido de nuevo
              </span>
              <h2 className="mt-6 text-4xl font-semibold leading-tight">
                Gestiona tu cuenta con estilo y seguridad.
              </h2>
            </div>
            <p className="text-sm text-sky-50/90">
              Accede a tu panel, revisa información y continúa donde lo dejaste.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">prueba de desempeño</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Iniciar sesión</h1>
              <p className="mt-1 text-sm text-slate-500">Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
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
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              ¿No tienes cuenta?{" "}
              <a href="/auth/register" className="font-semibold text-sky-600 hover:text-sky-700">
                Regístrate
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
