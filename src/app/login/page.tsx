"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setError("Email ou senha incorretos");
    else router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-2xl text-slate-800">FornecedorQ</span>
          </div>
          <p className="text-slate-500">Acesse sua conta</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-4">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60">
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <p className="text-center text-sm text-slate-500">
            Não tem conta?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
