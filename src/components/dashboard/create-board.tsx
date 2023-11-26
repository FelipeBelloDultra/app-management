"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button, Modal } from "~/components/common";
import { CreateBoardForm } from ".";

export function CreateBoard() {
  const [openCreateBoardModal, setOpenCreateBoardModal] = useState(false);

  return (
    <>
      <Button
        color="secondary"
        size="sm"
        className="w-full"
        onClick={() => setOpenCreateBoardModal(true)}
      >
        <Plus className="mr-1 text-gray-800" size={18} />
        Create new board
      </Button>

      <Modal.Root
        open={openCreateBoardModal}
        onClose={() => setOpenCreateBoardModal(false)}
      >
        <CreateBoardForm onCloseForm={() => setOpenCreateBoardModal(false)} />
      </Modal.Root>
    </>
  );
}
