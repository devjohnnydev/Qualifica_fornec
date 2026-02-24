import Link from "next/link";
import { CheckCircle, BarChart3, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Shield className="w-7 h-7 text-blue-300" />
          <span className="text-white font-bold text-xl">FornecedorQ</span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="text-blue-200 hover:text-white px-4 py-2 rounded-lg transition-colors">
            Entrar
          </Link>
          <Link href="/register" className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-lg font-medium transition-colors">
            Criar conta grátis
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-blue-800/50 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-700/50">
            Qualificação inteligente de fornecedores
          </span>
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Qualifique seus fornecedores com critérios objetivos
          </h1>
          <p className="text-xl text-blue-200 mb-10 leading-relaxed">
            Avalie, pontue e gerencie fornecedores com critérios customizáveis. 
            Tome decisões baseadas em dados e reduza riscos na sua cadeia de suprimentos.
          </p>
          <Link href="/register" className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg">
            Começar gratuitamente
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[
            { icon: CheckCircle, title: "Critérios Customizáveis", desc: "Defina pesos e critérios de avaliação de acordo com as necessidades da sua empresa." },
            { icon: BarChart3, title: "Score Automático", desc: "Pontuação calculada automaticamente com base nos critérios ponderados que você definir." },
            { icon: Users, title: "Gestão Centralizada", desc: "Todos os seus fornecedores em um único lugar, com histórico e status de qualificação." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <Icon className="w-8 h-8 text-blue-300 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-blue-200 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
