import { tv, VariantProps } from "tailwind-variants";

export const inputColorStyles = tv({
  base: "w-10 ring-2 ring-gray-200 transition-all h-10 rounded p-1",
  variants: {
    hasError: {
      true: "bg-red-50 ring-2 ring-red-500",
      false: "focus:bg-gray-100",
    },
  },
  defaultVariants: {
    hasError: false,
  },
});

export type InputColorVariantsProps = VariantProps<typeof inputColorStyles>;
