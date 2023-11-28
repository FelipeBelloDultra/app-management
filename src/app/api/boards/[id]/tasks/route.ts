import { NextRequest, NextResponse } from "next/server";

import { prisma } from "~/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const url = request.nextUrl.searchParams;

  let page = Number(url.get("page") || "1");
  let limit = Number(url.get("limit") || "10");
  let status = String(url.get("status"));

  const where: {
    board_id: string;
    status?: "WAITING" | "DOING" | "FINISHED";
  } = {
    board_id: params.id,
  };

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
      where,
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
    }),
  ]);

  return NextResponse.json(
    { data: { tasks, total: totalTasks } },
    { status: 200 }
  );
}
