import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "..";

interface BoardsResponse {
  data: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

async function getBoards() {
  const response = await fetch("http://localhost:3000/api/boards", {
    method: "GET",
    next: {
      revalidate: 60 * 60 * 1, // 1 hour
      tags: ["boards"],
    },
  });
  const { data }: BoardsResponse = await response.json();

  return data;
}

export async function Sidebar() {
  const boards = await getBoards();
  const hasResponseData = !!boards.length;

  return (
    <div className="h-full w-64 bg-white shadow-sm px-4 py-10 flex flex-col gap-4">
      <div className="mt-12 py-1 mb-6 overflow-y-auto">
        <h3 className="uppercase font-medium text-xl text-gray-500">
          My boards
        </h3>

        {hasResponseData ? (
          <div className="mt-4 flex flex-col gap-2">
            {boards.map((board) => (
              <Link
                href={`/dashboard/${board.id}`}
                prefetch={false}
                key={board.id}
                className={`font-medium text-lg text-gray-950 py-2 mx-1 px-5 hover:underline transition-all hover:bg-gray-100 border-l-2`}
                style={{ borderLeftColor: board.color }}
              >
                {board.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-md bg-gray-100 p-3 flex items-center justify-center mt-4">
            <p className="font-bold text-sm">No board registered</p>
          </div>
        )}
      </div>

      <Button color="secondary" size="sm" className="w-full">
        <Plus className="mr-1 text-gray-800" size={18} />
        Create new board
      </Button>
    </div>
  );
}
