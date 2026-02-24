"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Shield, LayoutDashboard, Users, Settings, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/suppliers", label: "Fornecedores", icon: Users },
  { href: "/dashboard/criteria", label: "Critérios", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [userOpen, setUserOpen] = useState(false);

  return (
    <aside className="w-60 min-h-screen bg-slate-900 flex flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-700/50">
        <Shield className="w-6 h-6 text-blue-400" />
        <span className="font-bold text-white text-lg">FornecedorQ</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}>
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-700/50">
        <button onClick={() => setUserOpen(!userOpen)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-white text-xs font-medium truncate">{session?.user?.name}</p>
            <p className="text-slate-500 text-xs truncate">{(session?.user as { company?: string })?.company}</p>
          </div>
          <ChevronDown className="w-4 h-4 shrink-0" />
        </button>
        {userOpen && (
          <button onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-1 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-slate-800 transition-colors text-sm">
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        )}
      </div>
    </aside>
  );
}
