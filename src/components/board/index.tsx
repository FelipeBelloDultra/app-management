"use client";

import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";

import { DragDrop } from "..";
import { useParams } from "next/navigation";

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

type TaskStatus = "WAITING" | "DOING" | "FINISHED";

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

const BOARD_COLUMNS = [
  {
    name: "waiting",
    value: "WAITING",
  },
  {
    name: "doing",
    value: "DOING",
  },
  {
    name: "finished",
    value: "FINISHED",
  },
] as const;

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
    <div className="bg-white flex-1 rounded border p-4 flex gap-4">
      <DragDrop.Root onDragEnd={onDragEnd}>
        {BOARD_COLUMNS.map((boardColumn) => (
          <DragDrop.Column
            key={boardColumn.value}
            droppableId={boardColumn.value}
            columnName={boardColumn.name}
          >
            {reducedTasks[boardColumn.value].map((taskItem, index) => (
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
