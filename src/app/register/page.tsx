"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error || "Erro ao cadastrar");
    else router.push("/login?registered=1");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-2xl text-slate-800">FornecedorQ</span>
          </div>
          <p className="text-slate-500">Crie sua conta gratuitamente</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-4">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
          {[
            { label: "Nome completo", key: "name", type: "text" },
            { label: "Empresa", key: "company", type: "text" },
            { label: "Email", key: "email", type: "email" },
            { label: "Senha", key: "password", type: "password" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
              <input type={type} value={form[key as keyof typeof form]} onChange={e => set(key, e.target.value)} required
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60">
            {loading ? "Cadastrando..." : "Criar conta"}
          </button>
          <p className="text-center text-sm text-slate-500">
            Já tem conta?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
