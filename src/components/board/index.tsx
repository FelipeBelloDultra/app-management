"use client";

import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useParams } from "next/navigation";

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
      if (acc[task.status]) {
        acc[task.status].push(task);
        return acc;
      }

      return {
        ...acc,
        [task.status]: [task],
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
                <div className="bg-white p-2 border rounded">
                  <p>{taskItem.name}</p>
                </div>
              </DragDrop.ColumnItem>
            ))}
          </DragDrop.Column>
        ))}
      </DragDrop.Root>
    </div>
  );
}
