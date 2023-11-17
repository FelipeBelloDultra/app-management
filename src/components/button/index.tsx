import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: `rounded-md px-3 font-bold transition-all data-[disabled=false]:hover:opacity-70 data-[disabled=false]:cursor-pointer`,
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

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>;

export function Button({
  color,
  size,
  disabled = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      data-disabled={disabled}
      className={button({ color, size, className })}
    >
      {children}
    </button>
  );
}
