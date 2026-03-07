import { ChangeEventHandler, DetailedHTMLProps, FC, HTMLAttributes, SubmitEventHandler } from "react";

export type InputProps = {
  handleSubmit: SubmitEventHandler<HTMLFormElement> | undefined;
  handleChange:
    | ChangeEventHandler<HTMLInputElement, HTMLInputElement>
    | undefined;
  inputValue: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>