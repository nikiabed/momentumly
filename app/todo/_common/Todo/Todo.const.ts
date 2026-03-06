import { ChangeEventHandler, DetailedHTMLProps, FC, HTMLAttributes, SubmitEventHandler } from "react";

export enum Status {
  done = "انجام شده",
  inProgress = "در حال انجام",
  isPending = "در انتظار",
}

export type InputProps = {
  handleSubmit: SubmitEventHandler<HTMLFormElement> | undefined;
  handleChange:
    | ChangeEventHandler<HTMLInputElement, HTMLInputElement>
    | undefined;
  inputValue: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>