import { FC, useContext } from "react";
import { InputProps } from "./Todo.const";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";

export const TodoInput: FC<InputProps> = () => {

  const {handleSubmit, handleChange, inputValue} = useContext(TodoContext)
  return (
      <form name="todo" onSubmit={handleSubmit} className="py-2 pl-2 items-center flex w-full bg-pink-100 rounded-lg group hover:bg-white">
        <button type="submit" className={`px-5 h-10 text-black`} >
          +
        </button>
        <input
          onChange={handleChange}
          type="text"
          className=" p-2 rounded-lg bg-pink-100 group-hover:bg-white w-full text-black focus:outline-none focus:bg-white"
          placeholder="کارهات چیا هستن قشنگ جون"
          value={inputValue}
          name="task"
        />
      </form>
  );
};

export default TodoInput;
