"use client";

import { ComponentProps, forwardRef } from "react";

import { InputTextAreaVariantsProps, inputTextAreaStyles } from "./styles";

type InputTextAreaProps = ComponentProps<"textarea"> &
  InputTextAreaVariantsProps;

export const InputTextArea = forwardRef<
  HTMLTextAreaElement,
  InputTextAreaProps
>(function InputForwardRef({ hasError, ...rest }, ref) {
  return (
    <textarea
      {...rest}
      className={inputTextAreaStyles({ hasError })}
      ref={ref}
    />
  );
});
