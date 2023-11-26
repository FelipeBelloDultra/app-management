import { tv, VariantProps } from "tailwind-variants";

export const inputTextAreaStyles = tv({
  base: "w-full ring-2 ring-gray-200 transition-all h-28 text-sm rounded px-4 py-2 resize-none",
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

export type InputTextAreaVariantsProps = VariantProps<
  typeof inputTextAreaStyles
>;
