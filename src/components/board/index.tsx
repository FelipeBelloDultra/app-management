"use client";

import { tv } from "tailwind-variants";
import { Accordion } from "../common";

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

const taskStatusStyle = tv({
  base: "border-2 font-bold text-sm py-1 px-2 self-start ml-4 rounded-full",
  variants: {
    status: {
      waiting: "bg-yellow-100 border-yellow-600",
      doing: "bg-blue-100 border-blue-600",
      finished: "bg-green-100 border-green-600",
    },
  },
  defaultVariants: {
    status: "waiting",
  },
});

export function Board({ tasks }: BoardProps) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <span key={task.id} className="flex flex-col">
          <Accordion.Root>
            <Accordion.Header>
              <div className="flex justify-between w-3/4">
                <h3 className="capitalize font-medium text-xl text-gray-500 self-center text-left">
                  {task.name}
                </h3>

                <span
                  className={taskStatusStyle({
                    status: task.status.toLowerCase() as
                      | "waiting"
                      | "doing"
                      | "finished",
                  })}
                >
                  {task.status}
                </span>
              </div>
            </Accordion.Header>

            <Accordion.Content>
              <div>
                <div className="flex">
                  <div className="w-3/4">
                    <p className="text-sm font-medium text-gray-800 pr-4">
                      {task.descriptions}
                    </p>
                  </div>
                  <div className="w-1/4 flex flex-col gap-2">
                    <p className="font-medium text-sm text-gray-500 text-right">
                      created at:{" "}
                      {Intl.DateTimeFormat("pt-BR").format(
                        new Date(task.created_at)
                      )}
                    </p>

                    <p className="font-medium text-sm text-gray-500 text-right">
                      last update:{" "}
                      {Intl.DateTimeFormat("pt-BR").format(
                        new Date(task.updated_at)
                      )}
                    </p>

                    <p className="font-medium text-sm text-red-500 text-right">
                      expires date:{" "}
                      {Intl.DateTimeFormat("pt-BR").format(
                        new Date(task.expires_at)
                      )}
                    </p>
                  </div>
                </div>

                <div>Tags:</div>
              </div>
            </Accordion.Content>
          </Accordion.Root>
        </span>
      ))}
    </div>
  );
}
