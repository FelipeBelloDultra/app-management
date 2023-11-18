import { tv, VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: `flex items-center justify-center rounded-md px-3 font-bold transition-all data-[disabled=false]:hover:opacity-70 data-[disabled=false]:cursor-pointer`,
  variants: {
    color: {
      primary: "bg-cyan-500 text-white active:bg-cyan-600",
      secondary: "bg-gray-200 text-gray-800 border-2 active:bg-gray-300",
    },
    size: {
      sm: "h-8 text-xs",
      md: "h-11 text-sm",
      lg: "h-12 text-base",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type ButtonVariantsProps = VariantProps<typeof buttonStyles>;
