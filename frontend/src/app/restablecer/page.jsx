"use client";
import { useState } from "react";
import Link from "next/link";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRecuperar(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Ocurrió un error al procesar la solicitud");
        return;
      }
      setMessage(data.msg);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/stadium.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight">
            FIFA 2026
            <br />
            ANALYTICS
          </h1>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#0f0f0f] flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">
            Recuperar Cuenta
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Introduce tu correo electrónico para recibir el enlace.
          </p>

          {error && (
            <p className="mb-5 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm">
              {error}
            </p>
          )}
          {message && (
            <p className="mb-5 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm">
              {message}
            </p>
          )}

          <form onSubmit={handleRecuperar} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Correo Electrónico
              </label>
              <div className="flex items-center gap-3 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus-within:border-gray-400 transition-colors">
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white text-sm outline-none w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-black font-bold text-sm py-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            <Link
              href="/login"
              className="text-white font-semibold hover:underline"
            >
              Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
