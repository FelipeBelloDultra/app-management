import { Fragment } from "react";
import { Dialog, DialogProps, Transition } from "@headlessui/react";

type ModalRootProps = DialogProps<"div"> & {
  children: React.ReactNode;
};

export function ModalRoot({ open, children, ...rest }: ModalRootProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog open={open} {...rest} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {children}
        </div>
      </Dialog>
    </Transition>
  );
}
