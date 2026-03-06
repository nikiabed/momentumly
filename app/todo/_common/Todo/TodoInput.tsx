import { FC } from "react";
import { InputProps } from "./Todo.const";

export const TodoInput: FC<InputProps> = ({
  handleSubmit,
  handleChange,
  inputValue,
  className
}) => {

  return (
      <form onSubmit={handleSubmit} className="flex w-full bg-pink-100 rounded-lg group hover:bg-white">
        <button type="submit" className={`m-5 px-5 bg-amber-50 text-black`} >
          +
        </button>
        <input
          onChange={handleChange}
          type="text"
          className=" bg-pink-100 group-hover:bg-white w-full text-black rounded-lg focus:outline-none"
          placeholder="کارهات چیا هستن قشنگ جون"
          value={inputValue}
          name="task"
        />
      </form>
  );
};

export default TodoInput;
