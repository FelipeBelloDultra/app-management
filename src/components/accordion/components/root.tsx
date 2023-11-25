import { Disclosure, DisclosureProps } from "@headlessui/react";

type AccordionRootProps = DisclosureProps<"div">;

export function AccordionRoot({ children, ...rest }: AccordionRootProps) {
  return <Disclosure {...rest}>{children}</Disclosure>;
}
