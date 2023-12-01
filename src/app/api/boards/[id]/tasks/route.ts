import { TaskStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "~/lib/prisma";

const taskSchema = z.object({
  status: z.string(),
  name: z.string().min(4, {
    message: "Enter at least 4 characters",
  }),
  description: z
    .string()
    .min(4, {
      message: "Enter at least 4 characters",
    })
    .max(255, {
      message: "Enter a maximum of 255 characters",
    }),
  expires_at: z
    .string()
    .transform((expiresAt) => new Date(expiresAt))
    .refine((expiresAt) => expiresAt.getTime() >= new Date().getTime(), {
      message: "The expiration date must be greater than the current date",
    }),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = request.nextUrl.searchParams;

  let page = Number(url.get("page") || "1");
  let limit = Number(url.get("limit") || "10");
  let status = String(url.get("status"));
  let orderBy = String(url.get("order_by"));
  let sort = String(url.get("sort"));

  const where: {
    board_id: string;
    status?: "WAITING" | "DOING" | "FINISHED";
  } = {
    board_id: params.id,
  };

  if (
    orderBy !== "updated_at" &&
    orderBy !== "created_at" &&
    orderBy !== "expires_at"
  ) {
    orderBy = "created_at";
  }

  if (sort !== "asc" && sort !== "desc") {
    sort = "desc";
  }

  if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
    limit = 10;
    page = 1;
  }

  if (status === "WAITING" || status === "DOING" || status === "FINISHED") {
    where.status = status;
  }

  const [totalTasks, tasks] = await Promise.all([
    prisma.task.count({
      where,
    }),
    prisma.task.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [orderBy]: sort,
      },
      where,
      select: {
        id: true,
        name: true,
        board_id: true,
        description: true,
        status: true,
        created_at: true,
        expires_at: true,
        updated_at: true,
      },
    }),
  ]);

  return NextResponse.json(
    { data: { tasks, total: totalTasks } },
    { status: 200 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const boardId = params.id;
  const data = await request.json();

  await prisma.task.update({
    where: {
      id: data.id,
      board_id: boardId,
    },
    data,
  });

  return NextResponse.json({}, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const boardId = params.id;
  const data = await request.json();

  const { description, expires_at, name, status } = taskSchema.parse(data);

  const { id } = await prisma.task.create({
    data: {
      board_id: boardId,
      description,
      expires_at,
      name,
      status: status as TaskStatus,
    },
  });

  return NextResponse.json({ data: { id } }, { status: 201 });
}
