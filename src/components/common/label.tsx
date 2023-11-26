import { ComponentProps } from "react";

type LabelProps = ComponentProps<"label"> & {
  children: React.ReactNode;
};

export function Label({ children }: LabelProps) {
  return <label className="flex flex-col gap-2">{children}</label>;
}
