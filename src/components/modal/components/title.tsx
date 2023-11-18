import { Dialog, DialogTitleProps } from "@headlessui/react";

type ModalTitleProps = DialogTitleProps<"header">;

export function ModalTitle({ children, ...rest }: ModalTitleProps) {
  return (
    <Dialog.Title {...rest} className="font-medium text-2xl text-gray-800">
      {children}
    </Dialog.Title>
  );
}
