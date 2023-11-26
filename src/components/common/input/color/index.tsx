"use client";

import { ComponentProps, forwardRef } from "react";

import { InputColorVariantsProps, inputColorStyles } from "./styles";

type InputColorProps = ComponentProps<"input"> & InputColorVariantsProps;

export const InputColor = forwardRef<HTMLInputElement, InputColorProps>(
  function InputForwardRef({ hasError, ...rest }, ref) {
    return (
      <input
        {...rest}
        type="color"
        className={inputColorStyles({ hasError })}
        ref={ref}
      />
    );
  }
);
