"use client";

import { TaskItem } from "./task-item";

interface BoardProps {
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
}

export function TaskBoard({ tasks }: BoardProps) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
