import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { name, email, password, company } = await req.json();
  if (!name || !email || !password || !company) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, company },
  });

  const defaultCriteria = [
    { name: "Qualidade", description: "Qualidade dos produtos/serviços fornecidos", weight: 0.25, category: "Produto" },
    { name: "Prazo de Entrega", description: "Pontualidade nas entregas", weight: 0.20, category: "Logística" },
    { name: "Preço", description: "Competitividade de preços no mercado", weight: 0.20, category: "Financeiro" },
    { name: "Documentação", description: "Regularidade fiscal e legal", weight: 0.15, category: "Compliance" },
    { name: "Atendimento", description: "Qualidade do suporte e relacionamento", weight: 0.10, category: "Relacionamento" },
    { name: "Capacidade Técnica", description: "Capacidade técnica e certificações", weight: 0.10, category: "Técnico" },
  ];

  for (const c of defaultCriteria) {
    await prisma.qualificationCriteria.create({ data: { ...c, userId: user.id } });
  }

  return NextResponse.json({ success: true });
}
