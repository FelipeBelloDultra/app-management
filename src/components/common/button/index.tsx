import { ComponentProps } from "react";

import { ButtonVariantsProps, buttonStyles } from "./styles";

type ButtonProps = ComponentProps<"button"> & ButtonVariantsProps;

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
      className={buttonStyles({ color, size, className })}
    >
      {children}
    </button>
  );
}
