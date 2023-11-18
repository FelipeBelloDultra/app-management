import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "~/lib/prisma";

const createBoardSchema = z.object({
  name: z.string().min(4, {
    message: "Enter at least 4 characters",
  }),
  color: z.string().regex(new RegExp(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/)),
  description: z
    .string()
    .min(4, {
      message: "Enter at least 4 characters",
    })
    .max(255, {
      message: "Enter a maximum of 255 characters",
    }),
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
