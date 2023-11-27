import { NextRequest, NextResponse } from "next/server";

import { prisma } from "~/lib/prisma";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Context) {
  const boards = await prisma.board.findUniqueOrThrow({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      color: true,
      description: true,
      created_at: true,
    },
  });

  return NextResponse.json(
    {
      data: boards,
    },
    { status: 200 }
  );
}
