import { FC } from "react";
import { InputProps } from "./Todo.const";

export const TodoInput: FC<InputProps> = ({
  handleSubmit,
  handleChange,
  inputValue,
}) => {

  return (
      <form onSubmit={handleSubmit} className="py-2 items-center flex w-full bg-pink-100 rounded-lg group hover:bg-white">
        <button type="submit" className={`px-5 h-10 text-black`} >
          +
        </button>
        <input
          onChange={handleChange}
          type="text"
          className=" bg-pink-100 group-hover:bg-white w-full text-black focus:outline-none"
          placeholder="کارهات چیا هستن قشنگ جون"
          value={inputValue}
          name="task"
        />
      </form>
  );
};

export default TodoInput;
