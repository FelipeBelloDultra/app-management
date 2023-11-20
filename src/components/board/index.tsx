"use client";

import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useParams } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { DragDrop } from "..";

type Task = {
  id: string;
  name: string;
  descriptions: string | null;
  status: TaskStatus;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
  board_id: string;
};

const BOARD_COLUMNS = {
  WAITING: "Waiting",
  DOING: "Doing",
  FINISHED: "Finished",
} as const;

type TaskStatus = keyof typeof BOARD_COLUMNS;

type BoardProps = {
  tasks: Task[];
};

function reduceTasks(tasks: Task[]) {
  return tasks.reduce(
    (acc, task) => {
      const taskGroup = acc[task.status] ?? [];
      const sortedTaskGroup = taskGroup
        .concat(task)
        .sort(
          (a, b) =>
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );

      return {
        ...acc,
        [task.status]: sortedTaskGroup,
      };
    },
    {} as {
      [key: string]: Task[];
    }
  );
}

export function Board({ tasks, ...rest }: BoardProps) {
  const [reducedTasks, setReducedTasks] = useState(reduceTasks(tasks));

  const { boardId } = useParams();

  async function onDragEnd(result: DropResult) {
    const { draggableId, destination, source } = result;

    if (!destination) return;

    const isSameColumn = destination.droppableId === source.droppableId;

    if (isSameColumn) return;

    const sourceId = source.droppableId as TaskStatus;
    const destinationId = destination.droppableId as TaskStatus;
    const sourceIndex = source.index;

    const updatedTasks = { ...reducedTasks };

    const [draggedItem] = updatedTasks[sourceId].splice(sourceIndex, 1);

    updatedTasks[destinationId] = [draggedItem, ...updatedTasks[destinationId]];

    setReducedTasks(updatedTasks);

    await fetch(`http://localhost:3000/api/tasks/${draggableId}`, {
      method: "PUT",
      body: JSON.stringify({
        boardId,
        status: destinationId,
      }),
    });
  }

  return (
    <div className="h-full p-4 bg-white rounded border flex gap-4">
      <DragDrop.Root onDragEnd={onDragEnd}>
        {Object.entries(BOARD_COLUMNS).map(([statusPrefix, statusTitle]) => (
          <DragDrop.Column
            key={statusPrefix}
            droppableId={statusPrefix}
            columnName={statusTitle}
          >
            {reducedTasks[statusPrefix].map((taskItem, index) => (
              <DragDrop.ColumnItem
                key={taskItem.id}
                draggableId={taskItem.id}
                index={index}
              >
                <div className="bg-white p-2 border rounded flex flex-col gap-2">
                  <header className="flex items-start justify-between">
                    <h4 className="text-sm font-bold text-gray-800">
                      {taskItem.name}
                    </h4>

                    <Link
                      href={`/dashboard/task/${taskItem.id}`}
                      className="text-cyan-900 p-2 -m-2 transition-opacity hover:opacity-70"
                    >
                      <ExternalLink height={18} width={18} />
                    </Link>
                  </header>

                  {taskItem.descriptions && (
                    <p className="text-xs text-gray-700">
                      {taskItem.descriptions}
                    </p>
                  )}
                </div>
              </DragDrop.ColumnItem>
            ))}
          </DragDrop.Column>
        ))}
      </DragDrop.Root>
    </div>
  );
}
