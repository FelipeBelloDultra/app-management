import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function PUT(
  request: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  const { id: taskId } = context.params;
  const { boardId, status } = await request.json();

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
      board_id: boardId,
    },
    data: {
      status,
    },
  });

  revalidateTag(`boards-${boardId}`);

  return NextResponse.json({ task: updatedTask }, { status: 201 });
}
