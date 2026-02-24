import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const supplier = await prisma.supplier.findFirst({
    where: { id, userId: session.user.id },
    include: { scores: { include: { criteria: true } } },
  });
  if (!supplier) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(supplier);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await req.json();
  const supplier = await prisma.supplier.update({ where: { id }, data });
  return NextResponse.json(supplier);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.supplier.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
