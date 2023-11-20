type Task = {
  id: string;
  name: string;
  descriptions: string | null;
  status: "WAITING" | "DOING" | "FINISHED";
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
  board_id: string;
};

async function loadTaskById(taskId: string) {
  const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
    method: "GET",
    next: {
      revalidate: 60 * 60 * 1, // 1 hour
      tags: [`task-${taskId}`],
    },
  });
  const { data }: { data: Task } = await response.json();

  return data;
}

export default async function Page({ params }: { params: { taskId: string } }) {
  const data = await loadTaskById(params.taskId);

  console.log(data);

  return (
    <div>
      <h1>Task</h1>
    </div>
  );
}
