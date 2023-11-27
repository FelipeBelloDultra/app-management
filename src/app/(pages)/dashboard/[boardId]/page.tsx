import Image from "next/image";

import { TaskBoard, CreateTask } from "~/components/board";

type BoardIdPageProps = {
  params: {
    boardId: string;
  };
};

interface BoardResponse {
  data: {
    id: string;
    name: string;
    color: string;
    description: string;
    created_at: Date;
    tasks: {
      id: string;
      name: string;
      descriptions: string | null;
      status: "WAITING" | "DOING" | "FINISHED";
      expires_at: Date;
      created_at: Date;
      updated_at: Date;
      board_id: string;
    }[];
  };
}

async function getBoardById(boardId: string) {
  const response = await fetch(`http://localhost:3000/api/boards/${boardId}`, {
    method: "GET",
    next: {
      revalidate: 60 * 60 * 1, // 1 hour
      tags: [`boards-${boardId}`],
    },
  });
  const { data }: BoardResponse = await response.json();

  return data;
}

export default async function Page({ params }: BoardIdPageProps) {
  const data = await getBoardById(params.boardId);

  return (
    <main className="flex flex-col gap-9 h-full">
      <header
        className="flex flex-col gap-3 border-b-2 pb-5"
        style={{ borderColor: data.color }}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl text-gray-900">{data.name}</h1>

          <p className="font-medium text-sm text-gray-500">
            created at:{" "}
            {Intl.DateTimeFormat("pt-BR").format(new Date(data.created_at))}
          </p>
        </div>

        <pre className="text-sm text-gray-600">{data.description}</pre>

        <CreateTask />
      </header>

      <section className="relative h-full">
        {!!data.tasks.length ? (
          <TaskBoard tasks={data.tasks} />
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
        )}
      </section>
    </main>
  );
}
