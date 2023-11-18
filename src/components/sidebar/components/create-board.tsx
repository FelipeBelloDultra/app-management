"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button, Modal } from "~/components";

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
        <Modal.Panel>
          <Modal.Title>Hello</Modal.Title>
          I&apos;am a full modal
        </Modal.Panel>
      </Modal.Root>
    </>
  );
}
