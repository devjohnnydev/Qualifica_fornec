import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id: supplierId } = await params;
  const { scores } = await req.json();

  const criteria = await prisma.qualificationCriteria.findMany({ where: { userId: session.user.id } });

  for (const s of scores) {
    await prisma.supplierScore.upsert({
      where: { supplierId_criteriaId: { supplierId, criteriaId: s.criteriaId } },
      update: { score: s.score, notes: s.notes },
      create: { supplierId, criteriaId: s.criteriaId, score: s.score, notes: s.notes },
    });
  }

  const allScores = await prisma.supplierScore.findMany({ where: { supplierId }, include: { criteria: true } });
  let totalWeight = 0;
  let weightedScore = 0;
  for (const s of allScores) {
    const weight = s.criteria.weight;
    totalWeight += weight;
    weightedScore += (s.score / s.criteria.maxScore) * 100 * weight;
  }
  const finalScore = totalWeight > 0 ? weightedScore / totalWeight : 0;

  let status = "pending";
  if (allScores.length === criteria.length) {
    if (finalScore >= 70) status = "qualified";
    else if (finalScore >= 40) status = "conditional";
    else status = "disqualified";
  }

  await prisma.supplier.update({ where: { id: supplierId }, data: { score: Math.round(finalScore * 10) / 10, status } });

  return NextResponse.json({ score: finalScore, status });
}
