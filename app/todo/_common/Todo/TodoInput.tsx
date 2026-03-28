import { FC, useContext } from "react";
import { input, InputProps } from "./Todo.const";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { Add } from "iconsax-reactjs";

export const TodoInput: FC<InputProps> = () => {

  const {handleSubmit, handleChange, inputValue} = useContext(TodoContext)
  return (
      <form name="todo" onSubmit={handleSubmit} className="py-2 pl-2 items-center flex w-full bg-pink-100 rounded-lg group hover:bg-white">
        <button type="submit" className={`pl-4 pr-5 h-10 text-black/55`} >
          <Add size={20} />
        </button>
        <input
          onChange={handleChange}
          type="text"
          className=" p-2 rounded-lg bg-pink-100 group-hover:bg-white w-full text-black focus:outline-none focus:bg-white"
          placeholder={input.placeholder}
          value={inputValue}
          name="task"
        />
      </form>
  );
};

export default TodoInput;
