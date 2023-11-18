import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Input, Label, Modal } from "~/components";

const createBoardSchema = z.object({
  name: z.string().min(4, {
    message: "Enter at least 4 characters",
  }),
  color: z.string().regex(new RegExp(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/)),
  description: z
    .string()
    .min(4, {
      message: "Enter at least 4 characters",
    })
    .max(255, {
      message: "Enter a maximum of 255 characters",
    }),
});

type CreateBoardData = z.infer<typeof createBoardSchema>;

interface CreateBoardForm {
  onCloseForm: () => void;
}

export function CreateBoardForm({ onCloseForm }: CreateBoardForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBoardData>({
    resolver: zodResolver(createBoardSchema),
  });

  async function handleSubmitCreateBoardForm(data: CreateBoardData) {
    console.log({ data });
  }

  console.log({ errors });

  return (
    <Modal.Panel>
      <Modal.Title>Create board</Modal.Title>

      <form onSubmit={handleSubmit(handleSubmitCreateBoardForm)}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>
                <p className="pl-1 text-sm font-medium text-gray-800">Name</p>
                <Input.Text
                  placeholder="Enter the board name"
                  hasError={!!errors?.name?.message}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="pl-1 text-xs text-red-500 font-medium">
                    {errors.name.message}
                  </span>
                )}
              </Label>
            </div>

            <Label>
              <p className="pl-1 text-sm font-medium text-gray-800">Color</p>
              <Input.Color
                hasError={!!errors?.color?.message}
                {...register("color")}
              />
              {errors.color && (
                <span className="pl-1 text-xs text-red-500 font-medium">
                  {errors.color.message}
                </span>
              )}
            </Label>
          </div>

          <Label>
            <p className="pl-1 text-sm font-medium text-gray-800">
              Description
            </p>
            <Input.TextArea
              placeholder="Enter the board description"
              hasError={!!errors?.description?.message}
              {...register("description")}
            />
            {errors.description && (
              <span className="pl-1 text-xs text-red-500 font-medium">
                {errors.description.message}
              </span>
            )}
          </Label>
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

          <Button type="submit" className="w-[150px]" disabled={isSubmitting}>
            Create
          </Button>
        </div>
      </form>
    </Modal.Panel>
  );
}
