import { Links } from "./components/links";
import { CreateBoard } from "./components/create-board";

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
          <Links boards={boards} />
        ) : (
          <div className="rounded bg-gray-100 p-3 flex items-center justify-center mt-4">
            <p className="font-bold text-sm">No board registered</p>
          </div>
        )}
      </div>

      <CreateBoard />
    </div>
  );
}
