"use client"

import { useState } from "react";
import Link from "next/link"


export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simular registro
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Registro exitoso:", formData);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-sky-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-200/50 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Crear cuenta</h1>
            <p className="text-slate-500 mt-2">
              Ingresa tus datos para registrarte
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.nombre
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
                } focus:outline-none focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400`}
                aria-invalid={errors.nombre ? "true" : "false"}
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
              />
              {errors.nombre && (
                <p id="nombre-error" className="mt-1.5 text-sm text-red-500">
                  {errors.nombre}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
                } focus:outline-none focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
                } focus:outline-none focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400`}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-200 focus:ring-blue-200 focus:border-blue-400"
                } focus:outline-none focus:ring-2 transition-all text-slate-800 placeholder:text-slate-400`}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
              />
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="mt-1.5 text-sm text-red-500"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 mt-6"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Registrando...
                </span>
              ) : (
                "Crear cuenta"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Al registrarte, aceptas nuestros{" "}
          <Link href="/terminos" className="text-blue-500 hover:underline">
            Términos de servicio
          </Link>{" "}
          y{" "}
          <Link href="/privacidad" className="text-blue-500 hover:underline">
            Política de privacidad
          </Link>
        </p>
      </div>
    </main>
  );
}