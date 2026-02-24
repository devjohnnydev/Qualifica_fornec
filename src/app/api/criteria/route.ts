import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const criteria = await prisma.qualificationCriteria.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(criteria);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const criteria = await prisma.qualificationCriteria.create({
    data: { ...data, userId: session.user.id },
  });
  return NextResponse.json(criteria);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await req.json();
  const criteria = await prisma.qualificationCriteria.update({ where: { id }, data });
  return NextResponse.json(criteria);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.qualificationCriteria.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
