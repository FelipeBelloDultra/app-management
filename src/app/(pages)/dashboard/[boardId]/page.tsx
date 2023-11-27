import Image from "next/image";

import { TaskBoard } from "~/components/board";

type BoardIdPageProps = {
  params: {
    boardId: string;
  };
};

interface BoardResponse {
  data: {
    id: string;
    name: string;
    descriptions: string;
    status: "WAITING" | "DOING" | "FINISHED";
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
    board_id: string;
  }[];
}

async function getBoardById(boardId: string) {
  const response = await fetch(
    `http://localhost:3000/api/boards/${boardId}/tasks`,
    {
      method: "GET",
      // cache: 'no-store',
      next: {
        revalidate: 60 * 60 * 1, // 1 hour
      },
    }
  );
  const { data }: BoardResponse = await response.json();

  return data;
}

export default async function Page({ params }: BoardIdPageProps) {
  const data = await getBoardById(params.boardId);

  return data.length ? (
    <TaskBoard tasks={data} />
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
