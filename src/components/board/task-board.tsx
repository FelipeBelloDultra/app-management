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
  total: number;
}

export function TaskBoard({ tasks, total }: BoardProps) {
  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col gap-2 overflow-y-scroll pt-2 px-2 pb-6">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div>{total}</div>
    </div>
  );
}
