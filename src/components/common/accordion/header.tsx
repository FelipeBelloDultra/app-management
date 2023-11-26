import { tv } from "tailwind-variants";
import { ChevronDown } from "lucide-react";
import { DisclosureButtonProps, Disclosure } from "@headlessui/react";

type AccordionHeaderProps = DisclosureButtonProps<"div"> & {
  children: React.ReactNode;
};

const accordionIconStyle = tv({
  base: "bg-white transition-all shrink-0 flex items-center justify-center border rounded-full h-9 w-9",
  variants: {
    open: {
      true: "-rotate-180 bg-gray-100",
      false: "rotate-0",
    },
  },
  defaultVariants: { open: false },
});

export function AccordionHeader({ children, ...rest }: AccordionHeaderProps) {
  return (
    <Disclosure.Button
      {...rest}
      className="flex items-center px-4 py-2 bg-white rounded"
    >
      {({ open }) => (
        <div className="flex items-center flex-1 justify-between">
          {children}

          <span className={accordionIconStyle({ open })}>
            <ChevronDown size={20} />
          </span>
        </div>
      )}
    </Disclosure.Button>
  );
}
