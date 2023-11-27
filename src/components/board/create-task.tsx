"use client";

import { useState } from "react";

import { Button, Modal } from "~/components/common";
import { CreateTaskForm } from ".";

export function CreateTask() {
  const [openCreateBoardModal, setOpenCreateBoardModal] = useState(false);

  return (
    <>
      <Button
        className="w-[200px]"
        size="sm"
        onClick={() => setOpenCreateBoardModal(true)}
      >
        Create new task
      </Button>

      <Modal.Root
        open={openCreateBoardModal}
        onClose={() => setOpenCreateBoardModal(false)}
      >
        <CreateTaskForm />
      </Modal.Root>
    </>
  );
}
