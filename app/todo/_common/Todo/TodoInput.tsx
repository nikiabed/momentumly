import { FC } from "react";
import { InputProps } from "./Todo.const";

export const TodoInput: FC<InputProps> = ({
  handleSubmit,
  handleChange,
  inputValue,
  className
}) => {
  return (
      <form onSubmit={handleSubmit} >
        <button type="submit" className="m-5 px-5 bg-amber-50 text-black">
          +
        </button>
        <input
          onChange={handleChange}
          type="text"
          className="px-5 py-2 bg-pink-200 w-full rounded-xl text-black"
          placeholder="Add to do"
          value={inputValue}
          name="task"
        />
      </form>
  );
};

export default TodoInput;
