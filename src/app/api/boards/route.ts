import { NextResponse } from "next/server";

import { prisma } from "~/lib/prisma";

export async function GET() {
  const boards = await prisma.board.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return NextResponse.json({ data: boards }, { status: 200 });
}
