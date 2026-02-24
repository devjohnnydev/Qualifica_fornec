"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";

type Criteria = { id: string; name: string; description: string; weight: number; maxScore: number; category: string };

export default function CriteriaPage() {
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", weight: "0.10", maxScore: "10", category: "" });

  const categories = ["Produto", "Logística", "Financeiro", "Compliance", "Relacionamento", "Técnico", "Outro"];

  function resetForm() { setForm({ name: "", description: "", weight: "0.10", maxScore: "10", category: "" }); }

  useEffect(() => {
    fetch("/api/criteria").then(r => r.json()).then(d => { setCriteria(d); setLoading(false); });
  }, []);

  const totalWeight = criteria.reduce((a, c) => a + c.weight, 0);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/criteria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, weight: parseFloat(form.weight), maxScore: parseInt(form.maxScore) }),
    });
    const data = await res.json();
    setCriteria(prev => [...prev, data]);
    setAdding(false);
    resetForm();
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/criteria", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, ...form, weight: parseFloat(form.weight), maxScore: parseInt(form.maxScore) }),
    });
    const data = await res.json();
    setCriteria(prev => prev.map(c => c.id === editId ? data : c));
    setEditId(null);
    resetForm();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este critério?")) return;
    await fetch("/api/criteria", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setCriteria(prev => prev.filter(c => c.id !== id));
  }

  function startEdit(c: Criteria) {
    setEditId(c.id);
    setForm({ name: c.name, description: c.description, weight: c.weight.toString(), maxScore: c.maxScore.toString(), category: c.category });
    setAdding(false);
  }

  const weightOk = Math.abs(totalWeight - 1) < 0.01;

  const FormFields = ({ onSubmit, onCancel }: { onSubmit: (e: React.FormEvent) => void; onCancel: () => void }) => (
    <form onSubmit={onSubmit} className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-slate-600 mb-1">Nome *</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-slate-600 mb-1">Descrição *</label>
          <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Peso (ex: 0.20 = 20%) *</label>
          <input type="number" step="0.01" min="0.01" max="1" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} required
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Nota Máxima *</label>
          <input type="number" min="1" max="100" value={form.maxScore} onChange={e => setForm(f => ({ ...f, maxScore: e.target.value }))} required
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Categoria *</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Selecione...</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Check className="w-3.5 h-3.5" /> Salvar
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <X className="w-3.5 h-3.5" /> Cancelar
        </button>
      </div>
    </form>
  );

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Critérios de Qualificação</h1>
          <p className="text-slate-500 mt-1">Defina os critérios e pesos para avaliação dos fornecedores</p>
        </div>
        <button onClick={() => { setAdding(true); setEditId(null); resetForm(); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
          <Plus className="w-4 h-4" /> Novo Critério
        </button>
      </div>

      <div className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium border ${weightOk ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}>
        Soma dos pesos: {(totalWeight * 100).toFixed(0)}% {weightOk ? "(correto)" : "- idealmente deve somar 100%"}
      </div>

      {adding && <div className="mb-4"><FormFields onSubmit={handleAdd} onCancel={() => setAdding(false)} /></div>}

      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Carregando...</div>
        ) : criteria.length === 0 ? (
          <div className="p-8 text-center text-slate-400">Nenhum critério cadastrado.</div>
        ) : criteria.map(c => (
          <div key={c.id}>
            {editId === c.id ? (
              <FormFields onSubmit={handleEdit} onCancel={() => setEditId(null)} />
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-slate-800">{c.name}</h3>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{c.category}</span>
                  </div>
                  <p className="text-sm text-slate-500">{c.description}</p>
                  <p className="text-xs text-slate-400 mt-1">Peso: {(c.weight * 100).toFixed(0)}% · Nota máx: {c.maxScore}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(c)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
