import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "~/lib/prisma";
import { setTimeout } from "timers/promises";

const createBoardSchema = z.object({
  name: z.string(),
  color: z.string().regex(new RegExp(/^(0x|0X)?[a-fA-F0-9]+$'/)),
  description: z.string(),
});

export async function GET() {
  const boards = await prisma.board.findMany({
    select: {
      name: true,
      id: true,
      color: true,
    },
  });

  return NextResponse.json({ data: boards }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { color, description, name } = createBoardSchema.parse(request.body);

  await prisma.board.create({
    data: {
      color,
      description,
      name,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
