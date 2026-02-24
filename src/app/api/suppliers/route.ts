import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const suppliers = await prisma.supplier.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { scores: { include: { criteria: true } } },
  });
  return NextResponse.json(suppliers);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const supplier = await prisma.supplier.create({
    data: { ...data, userId: session.user.id },
  });
  return NextResponse.json(supplier);
}
