"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button, Input, Label, Modal } from "~/components/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

const taskSchema = z.object({
  status: z.string(),
  name: z.string().min(4, {
    message: "Enter at least 4 characters",
  }),
  description: z
    .string()
    .min(4, {
      message: "Enter at least 4 characters",
    })
    .max(255, {
      message: "Enter a maximum of 255 characters",
    }),
  expires_at: z
    .string()
    .transform((expiresAt) => {
      const [year, month, date] = expiresAt.split("-");

      return new Date(Number(year), Number(month) - 1, Number(date));
    })
    .refine((expiresAt) => expiresAt.getTime() >= new Date().getTime(), {
      message: "The expiration date must be greater than the current date",
    }),
});

type TaskData = z.output<typeof taskSchema>;
type TaskDataInput = z.input<typeof taskSchema>;

interface TaskFormProps {
  selectedTask?: {
    name: string;
    status: "WAITING" | "DOING" | "FINISHED";
    description: string | null;
    expires_at: Date;
    id: string;
  };
  onCloseForm: () => void;
}

export function TaskForm({ onCloseForm, selectedTask }: TaskFormProps) {
  const hasSelectedTask = !!selectedTask && !!Object.keys(selectedTask);

  function restoreExpirationTaskDate(date?: Date) {
    if (!date) return undefined;

    return new Date(date).toISOString().substring(0, 10);
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TaskDataInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: selectedTask?.status || "WAITING",
      description: selectedTask?.description || undefined,
      expires_at: restoreExpirationTaskDate(selectedTask?.expires_at),
      name: selectedTask?.name || undefined,
    },
  });

  const router = useRouter();
  const { boardId } = useParams();

  async function handleSubmitFormTask(data: unknown) {
    const formData = data as TaskData;

    await fetch(`http://localhost:3000/api/boards/${boardId}/tasks`, {
      method: hasSelectedTask ? "PUT" : "POST",
      body: hasSelectedTask
        ? JSON.stringify({ ...selectedTask, ...formData })
        : JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.refresh();
    onCloseForm();
  }

  return (
    <Modal.Panel>
      <Modal.Title>{hasSelectedTask ? "Update" : "Create"} task</Modal.Title>

      <form
        onSubmit={handleSubmit(handleSubmitFormTask)}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-3">
          <span className="w-2/4">
            <Label>
              <p className="pl-1 text-sm font-medium text-gray-800">Name</p>
              <Input.Text
                placeholder="Enter the task name"
                hasError={!!errors?.name?.message}
                {...register("name")}
              />
              {errors.name && (
                <span className="pl-1 text-xs text-red-500 font-medium">
                  {errors.name.message}
                </span>
              )}
            </Label>
          </span>

          <span className="w-2/4">
            <Label>
              <p className="pl-1 text-sm font-medium text-gray-800">
                Expires at
              </p>
              <Input.Text
                type="date"
                {...register("expires_at")}
                hasError={!!errors?.expires_at}
              />
              {errors.expires_at && (
                <span className="pl-1 text-xs text-red-500 font-medium">
                  {errors.expires_at.message}
                </span>
              )}
            </Label>
          </span>
        </div>

        <Label>
          <p className="pl-1 text-sm font-medium text-gray-800">Description</p>
          <Input.TextArea
            placeholder="Enter the task description"
            hasError={!!errors?.description?.message}
            {...register("description")}
          />
          {errors.description && (
            <span className="pl-1 text-xs text-red-500 font-medium">
              {errors.description.message}
            </span>
          )}
        </Label>

        <div className="flex flex-col gap-2">
          <p className="pl-1 text-sm font-medium text-gray-800">Status</p>

          <span className="flex gap-3">
            <label className="inline-flex">
              <input type="radio" value="WAITING" {...register("status")} />
              <p className="pl-1 text-sm font-medium text-gray-800">Waiting</p>
            </label>

            <label className="inline-flex">
              <input type="radio" value="DOING" {...register("status")} />
              <p className="pl-1 text-sm font-medium text-gray-800">Doing</p>
            </label>

            <label className="inline-flex">
              <input type="radio" value="FINISHED" {...register("status")} />
              <p className="pl-1 text-sm font-medium text-gray-800">Finished</p>
            </label>
          </span>
        </div>

        <div className="flex justify-end gap-4 border-t mt-10 pt-6">
          <Button
            className="w-[150px]"
            color="secondary"
            disabled={isSubmitting}
            onClick={onCloseForm}
          >
            Cancel
          </Button>

          {hasSelectedTask ? (
            <Button type="submit" className="w-[150px]" disabled={isSubmitting}>
              Update!
            </Button>
          ) : (
            <Button type="submit" className="w-[150px]" disabled={isSubmitting}>
              Create!
            </Button>
          )}
        </div>
      </form>
    </Modal.Panel>
  );
}
