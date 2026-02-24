"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Trash2, Edit2, Check } from "lucide-react";

type Criteria = { id: string; name: string; description: string; weight: number; maxScore: number; category: string };
type Score = { criteriaId: string; score: number; notes: string };
type Supplier = {
  id: string; name: string; cnpj: string; email: string; phone: string;
  category: string; website: string; address: string; status: string; score: number; notes: string;
  scores: { criteriaId: string; score: number; notes: string; criteria: Criteria }[];
};

const statusLabel: Record<string, string> = {
  pending: "Pendente", qualified: "Qualificado", conditional: "Condicional", disqualified: "Desqualificado",
};
const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  qualified: "bg-green-100 text-green-700 border-green-200",
  conditional: "bg-blue-100 text-blue-700 border-blue-200",
  disqualified: "bg-red-100 text-red-700 border-red-200",
};

export default function SupplierDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [scores, setScores] = useState<Record<string, Score>>({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [tab, setTab] = useState<"info" | "qualify">("info");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/suppliers/${id}`).then(r => r.json()).then((s: Supplier) => {
      setSupplier(s);
      const existing: Record<string, Score> = {};
      for (const sc of s.scores) {
        existing[sc.criteriaId] = { criteriaId: sc.criteriaId, score: sc.score, notes: sc.notes ?? "" };
      }
      setScores(existing);
    });
    fetch("/api/criteria").then(r => r.json()).then(setCriteria);
  }, [id]);

  function setScore(criteriaId: string, score: number) {
    setScores(prev => ({ ...prev, [criteriaId]: { ...prev[criteriaId], criteriaId, score, notes: prev[criteriaId]?.notes ?? "" } }));
  }
  function setNote(criteriaId: string, notes: string) {
    setScores(prev => ({ ...prev, [criteriaId]: { ...prev[criteriaId], criteriaId, score: prev[criteriaId]?.score ?? 0, notes } }));
  }

  async function handleQualify() {
    setSaving(true);
    const res = await fetch(`/api/suppliers/${id}/qualify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scores: Object.values(scores) }),
    });
    const data = await res.json();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setSupplier(prev => prev ? { ...prev, score: data.score, status: data.status } : prev);
  }

  async function handleDelete() {
    if (!confirm("Deseja excluir este fornecedor?")) return;
    setDeleting(true);
    await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
    router.push("/dashboard/suppliers");
  }

  if (!supplier) return <div className="p-8 text-slate-400">Carregando...</div>;

  const scoredCount = Object.keys(scores).length;
  const progress = criteria.length > 0 ? (scoredCount / criteria.length) * 100 : 0;

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/dashboard/suppliers" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar para fornecedores
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{supplier.name}</h1>
            <p className="text-slate-500 mt-1">{supplier.category} · {supplier.cnpj}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium px-3 py-1.5 rounded-full border ${statusColor[supplier.status]}`}>
              {statusLabel[supplier.status]}
            </span>
            {supplier.score > 0 && (
              <span className="text-2xl font-bold text-slate-800">{supplier.score.toFixed(1)}<span className="text-sm text-slate-400 font-normal">/100</span></span>
            )}
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-200 mb-6 gap-1">
        {(["info", "qualify"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${tab === t ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"}`}>
            {t === "info" ? "Informações" : "Qualificacao"}
          </button>
        ))}
      </div>

      {tab === "info" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Dados do Fornecedor</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: "Email", value: supplier.email },
                { label: "Telefone", value: supplier.phone },
                { label: "Website", value: supplier.website || "-" },
                { label: "Endereço", value: supplier.address || "-" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-slate-800">{value}</p>
                </div>
              ))}
              {supplier.notes && (
                <div className="col-span-2">
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-0.5">Observações</p>
                  <p className="text-slate-800">{supplier.notes}</p>
                </div>
              )}
            </div>
          </div>

          {supplier.scores.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Scores por Critério</h2>
              <div className="space-y-3">
                {supplier.scores.map(sc => (
                  <div key={sc.criteriaId} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700 font-medium">{sc.criteria.name}</span>
                        <span className="text-slate-500">{sc.score}/{sc.criteria.maxScore}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${(sc.score / sc.criteria.maxScore) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setTab("qualify")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
              <Star className="w-4 h-4" />
              {supplier.scores.length > 0 ? "Reeditar Qualificação" : "Iniciar Qualificação"}
            </button>
            <button onClick={handleDelete} disabled={deleting}
              className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
              <Trash2 className="w-4 h-4" />
              {deleting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      )}

      {tab === "qualify" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600 font-medium">Progresso da avaliação</span>
              <span className="text-slate-500">{scoredCount}/{criteria.length} critérios</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {criteria.map(c => {
            const current = scores[c.id]?.score ?? 0;
            return (
              <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-slate-800">{c.name}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{c.description}</p>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    Peso {(c.weight * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-slate-500 w-16">Nota: <span className="font-bold text-slate-800">{current}</span>/{c.maxScore}</span>
                    <input type="range" min={0} max={c.maxScore} value={current}
                      onChange={e => setScore(c.id, Number(e.target.value))}
                      className="flex-1 accent-blue-600" />
                  </div>
                  <input type="text" value={scores[c.id]?.notes ?? ""} onChange={e => setNote(c.id, e.target.value)}
                    placeholder="Observação (opcional)"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            );
          })}

          <div className="flex gap-3">
            <button onClick={handleQualify} disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60 text-sm">
              {saved ? <><Check className="w-4 h-4" /> Salvo!</> : saving ? "Calculando..." : <><Star className="w-4 h-4" /> Salvar Qualificação</>}
            </button>
            <button onClick={() => setTab("info")}
              className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
