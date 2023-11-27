import { NextRequest, NextResponse } from "next/server";

import { prisma } from "~/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tasks = await prisma.task.findMany({
    where: {
      board_id: params.id,
    },
    select: {
      id: true,
      name: true,
      board_id: true,
      descriptions: true,
      status: true,
      created_at: true,
      expires_at: true,
      updated_at: true,
    },
  });

  return NextResponse.json({ data: tasks }, { status: 200 });
}
