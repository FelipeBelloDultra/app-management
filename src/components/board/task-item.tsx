import { tv } from "tailwind-variants";
import { Accordion, Button } from "../common";

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

interface TaskItemProps {
  task: {
    id: string;
    name: string;
    status: "WAITING" | "DOING" | "FINISHED";
    description: string | null;
    created_at: Date;
    updated_at: Date;
    expires_at: Date;
  };
  onTaskItemClick: (task: {
    id: string;
    name: string;
    status: "WAITING" | "DOING" | "FINISHED";
    description: string | null;
    expires_at: Date;
  }) => void;
}

export function TaskItem({ task, onTaskItemClick }: TaskItemProps) {
  return (
    <span className="flex flex-col">
      <Accordion.Root>
        <Accordion.Header>
          <div className="flex justify-between w-3/4">
            <h3 className="capitalize font-medium text-xl  text-gray-500 self-center text-left truncate max-w-xs">
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
            <div className="flex justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-lg text-gray-500">
                  {task.name}
                </h4>

                <p className="text-sm font-medium text-gray-800 mt-2 pr-4">
                  {task.description}
                </p>
              </div>
              <div className="flex flex-col gap-2">
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

                <Button
                  size="sm"
                  color="secondary"
                  onClick={() =>
                    onTaskItemClick({
                      description: task.description,
                      expires_at: task.expires_at,
                      id: task.id,
                      name: task.name,
                      status: task.status,
                    })
                  }
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Root>
    </span>
  );
}
