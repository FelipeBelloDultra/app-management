import {
  Disclosure,
  DisclosurePanelProps,
  Transition,
} from "@headlessui/react";

type AccordionContentProps = DisclosurePanelProps<"div">;

export function AccordionContent({ children, ...rest }: AccordionContentProps) {
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <Disclosure.Panel {...rest} className="p-5 bg-white mt-1">
        {children}
      </Disclosure.Panel>
    </Transition>
  );
}
