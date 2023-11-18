import { Dialog, DialogPanelProps, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalPanelProps = DialogPanelProps<"div">;

export function ModalPanel({ children, ...props }: ModalPanelProps) {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog.Panel
        {...props}
        className="mx-auto max-w-xl w-full rounded border border-gray-100 bg-white py-4 px-8 relative"
      >
        {children}
      </Dialog.Panel>
    </Transition.Child>
  );
}
