import Image from "next/image";

import { TaskBoard } from "~/components/board";

type BoardIdPageProps = {
  params: {
    boardId: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

interface BoardResponse {
  data: {
    tasks: {
      id: string;
      name: string;
      descriptions: string;
      status: "WAITING" | "DOING" | "FINISHED";
      expires_at: Date;
      created_at: Date;
      updated_at: Date;
      board_id: string;
    }[];
    total: number;
  };
}

async function getBoardById(
  boardId: string,
  params: {
    page: string;
    limit: string;
  }
) {
  const response = await fetch(
    `http://localhost:3000/api/boards/${boardId}/tasks?${new URLSearchParams({
      page: params.page,
      limit: params.limit,
    })}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const { data }: BoardResponse = await response.json();

  return data;
}

export default async function Page({ params, searchParams }: BoardIdPageProps) {
  const page = searchParams?.page || "1";
  const limit = searchParams?.limit || "10";

  const data = await getBoardById(params.boardId, {
    limit: String(limit),
    page: String(page),
  });

  return data.tasks.length ? (
    <TaskBoard tasks={data.tasks} total={data.total} />
  ) : (
    <div className="text-center">
      <Image
        src="/create-task.svg"
        alt="No data image"
        width="547"
        height="326"
        className="h-[326px] w-[547px] inline-block"
      />
    </div>
  );
}
