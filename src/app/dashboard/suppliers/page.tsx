"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";

type Supplier = {
  id: string; name: string; cnpj: string; email: string;
  category: string; status: string; score: number; createdAt: string;
};

const statusLabel: Record<string, string> = {
  pending: "Pendente", qualified: "Qualificado", conditional: "Condicional", disqualified: "Desqualificado",
};
const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  qualified: "bg-green-100 text-green-700",
  conditional: "bg-blue-100 text-blue-700",
  disqualified: "bg-red-100 text-red-700",
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/suppliers").then(r => r.json()).then(data => {
      setSuppliers(data);
      setLoading(false);
    });
  }, []);

  const filtered = suppliers.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.cnpj.includes(search) || s.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fornecedores</h1>
          <p className="text-slate-500 mt-1">{suppliers.length} fornecedor{suppliers.length !== 1 ? "es" : ""} cadastrado{suppliers.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/dashboard/suppliers/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Novo Fornecedor
        </Link>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome, CNPJ ou categoria..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none">
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="qualified">Qualificado</option>
            <option value="conditional">Condicional</option>
            <option value="disqualified">Desqualificado</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p>Nenhum fornecedor encontrado.</p>
            {suppliers.length === 0 && (
              <Link href="/dashboard/suppliers/new" className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium">
                Cadastrar primeiro fornecedor
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["Fornecedor", "CNPJ", "Categoria", "Score", "Status", ""].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 px-5 py-3 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.email}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{s.cnpj}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{s.category}</td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-bold ${s.score >= 70 ? "text-green-600" : s.score >= 40 ? "text-yellow-600" : s.score > 0 ? "text-red-600" : "text-slate-400"}`}>
                      {s.score > 0 ? `${s.score.toFixed(1)}` : "-"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[s.status]}`}>
                      {statusLabel[s.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/dashboard/suppliers/${s.id}`}
                      className="text-blue-600 hover:underline text-sm font-medium">
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
