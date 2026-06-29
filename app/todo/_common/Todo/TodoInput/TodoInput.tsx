import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { input, ListItemProps } from "../Todo.const";
import { Add } from "iconsax-reactjs";
import { useTodoContext } from "@/app/_utils/hooks";

type InputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement> & {
    item : ListItemProps
  }

export const TodoInput: FC<InputProps> = ({item}) => {
  const {handleSubmit, handleChange, inputValue} = useTodoContext()
  return (
      <form name="todo" onSubmit={(e:any)=>handleSubmit?.(e,item)} className="py-2 pl-2 items-center flex w-full bg-pink-100 rounded-lg group hover:bg-white">
        <button type="submit" className={`pl-4 pr-5 h-10 text-black/55`} >
          <Add size={20} />
        </button>
        <input
          onChange={handleChange ?? undefined}
          type="text"
          className=" p-2 rounded-lg bg-pink-100 group-hover:bg-white w-full text-black focus:outline-none focus:bg-white"
          placeholder={input.placeholder}
          value={inputValue ?? ""}
          name="task"
        />
      </form>
  );
};