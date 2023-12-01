"use client";

import { useState } from "react";

import { Button, Modal } from "~/components/common";
import { TaskForm } from "~/components/board";

export function CreateTask() {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);

  return (
    <>
      <Button
        className="w-[200px]"
        size="sm"
        onClick={() => setOpenCreateTaskModal(true)}
      >
        Create new task
      </Button>

      <Modal.Root
        open={openCreateTaskModal}
        onClose={() => setOpenCreateTaskModal(false)}
      >
        <TaskForm onCloseForm={() => setOpenCreateTaskModal(false)} />
      </Modal.Root>
    </>
  );
}
