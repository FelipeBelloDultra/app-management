import { NextRequest, NextResponse } from "next/server";

import { prisma } from "~/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const boards = await prisma.board.findUniqueOrThrow({
    where: {
      id: params.id,
    },
    select: {
      tasks: {
        select: {
          id: true,
          name: true,
          tags: {
            select: {
              color: true,
              slug: true,
            },
          },
          descriptions: true,
          status: true,
          updated_at: true,
        },
      },
      description: true,
      created_at: true,
      name: true,
      id: true,
      color: true,
    },
  });

  return NextResponse.json({ data: boards }, { status: 200 });
}
