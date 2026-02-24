import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Users, CheckCircle, Clock, XCircle, AlertTriangle, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user!.id as string;

  const suppliers = await prisma.supplier.findMany({ where: { userId } });
  const total = suppliers.length;
  const qualified = suppliers.filter(s => s.status === "qualified").length;
  const pending = suppliers.filter(s => s.status === "pending").length;
  const conditional = suppliers.filter(s => s.status === "conditional").length;
  const disqualified = suppliers.filter(s => s.status === "disqualified").length;
  const avgScore = total > 0 ? suppliers.reduce((a, s) => a + s.score, 0) / total : 0;

  const recent = await prisma.supplier.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  const statusLabel: Record<string, string> = {
    pending: "Pendente", qualified: "Qualificado", conditional: "Condicional", disqualified: "Desqualificado",
  };
  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    qualified: "bg-green-100 text-green-700",
    conditional: "bg-blue-100 text-blue-700",
    disqualified: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Visão geral dos seus fornecedores</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total", value: total, icon: Users, color: "text-slate-600", bg: "bg-slate-100" },
          { label: "Qualificados", value: qualified, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
          { label: "Pendentes", value: pending, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
          { label: "Condicionais", value: conditional, icon: AlertTriangle, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Desqualificados", value: disqualified, icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
          { label: "Score Médio", value: `${avgScore.toFixed(1)}`, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Atividade Recente</h2>
        </div>
        {recent.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>Nenhum fornecedor cadastrado ainda.</p>
            <a href="/dashboard/suppliers/new" className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium">
              Cadastrar primeiro fornecedor
            </a>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.map(s => (
              <a key={s.id} href={`/dashboard/suppliers/${s.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-medium text-slate-800">{s.name}</p>
                  <p className="text-sm text-slate-500">{s.category} · {s.cnpj}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-700">{s.score.toFixed(1)} pts</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[s.status]}`}>
                    {statusLabel[s.status]}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
