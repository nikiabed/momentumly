import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { input } from "../Todo.const";
import { Add } from "iconsax-reactjs";
import { useTodoContext } from "@/app/_utils/hooks";
import { Board } from "@/app/types";

type InputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  item: Board;
};

export const TodoInput: FC<InputProps> = ({ item }) => {
  const { handleSubmit, handleChange, inputValue } = useTodoContext();
  return (
    <form
      name="todo"
      onSubmit={(e) => {
        handleSubmit?.(e, item);
      }}
      className="py-2 pl-2 items-center flex w-full bg-background rounded-lg group hover:bg-background/50"
    >
      <button type="submit" className={`pl-4 pr-5 h-10 text-foreground/80`}>
        <Add size={20} />
      </button>
      <input
        onChange={handleChange ?? undefined}
        type="text"
        className=" p-2 rounded-lg bg-background group-hover:bg-background/90 w-full text-foreground/80 focus:outline-none focus:bg-background/50"
        placeholder={input.placeholder}
        value={inputValue ?? ""}
        name="task"
      />
    </form>
  );
};
