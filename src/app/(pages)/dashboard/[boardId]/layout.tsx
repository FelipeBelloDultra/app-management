import { CreateTask } from "~/components/board";

interface BoardResponse {
  data: {
    id: string;
    name: string;
    color: string;
    description: string;
    created_at: Date;
  };
}

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
  children: React.ReactNode;
}

export default async function BoardIdLayout({
  children,
  params: { boardId },
}: BoardIdPageProps) {
  const response = await fetch(`http://localhost:3000/api/boards/${boardId}`, {
    method: "GET",
    next: {
      revalidate: 60 * 60 * 1, // 1 hour
      tags: [`board-${boardId}`],
    },
  });
  const { data }: BoardResponse = await response.json();

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

      <section className="relative h-full">{children}</section>
    </main>
  );
}
