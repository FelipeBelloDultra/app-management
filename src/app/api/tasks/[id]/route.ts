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

  revalidateTag(`task-${updatedTask.id}`);

  return NextResponse.json({ data: updatedTask }, { status: 201 });
}

export async function GET(
  request: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  const { id } = context.params;
  const task = await prisma.task.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      board_id: true,
      description: true,
      id: true,
      name: true,
      created_at: true,
      expires_at: true,
      status: true,
      updated_at: true,
    },
  });

  return NextResponse.json({ data: task }, { status: 200 });
}
