"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const categories = ["Tecnologia", "Logística", "Matéria-Prima", "Serviços", "Equipamentos", "Alimentação", "Saúde", "Construção", "Outro"];

export default function NewSupplierPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", cnpj: "", email: "", phone: "", category: "", website: "", address: "", notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error || "Erro ao cadastrar");
    else router.push(`/dashboard/suppliers/${data.id}`);
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard/suppliers" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Novo Fornecedor</h1>
        <p className="text-slate-500 mt-1">Preencha os dados do fornecedor</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Razão Social / Nome *", key: "name", type: "text", required: true, full: true },
            { label: "CNPJ *", key: "cnpj", type: "text", required: true },
            { label: "Email *", key: "email", type: "email", required: true },
            { label: "Telefone *", key: "phone", type: "text", required: true },
            { label: "Website", key: "website", type: "url", required: false },
            { label: "Endereço", key: "address", type: "text", required: false },
          ].map(({ label, key, type, required, full }) => (
            <div key={key} className={full ? "col-span-2" : ""}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
              <input type={type} value={form[key as keyof typeof form]} onChange={e => set(key, e.target.value)} required={required}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categoria *</label>
            <select value={form.category} onChange={e => set("category", e.target.value)} required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Selecione...</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Observações</label>
          <textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60 text-sm">
            {loading ? "Salvando..." : "Cadastrar Fornecedor"}
          </button>
          <Link href="/dashboard/suppliers"
            className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
