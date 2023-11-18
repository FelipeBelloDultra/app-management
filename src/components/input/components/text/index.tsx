"use client";

import { ComponentProps, forwardRef } from "react";

import { InputTextVariantsProps, inputTextStyles } from "./styles";

type InputTextProps = ComponentProps<"input"> & InputTextVariantsProps;

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputForwardRef({ hasError, ...rest }, ref) {
    return (
      <input {...rest} className={inputTextStyles({ hasError })} ref={ref} />
    );
  }
);
