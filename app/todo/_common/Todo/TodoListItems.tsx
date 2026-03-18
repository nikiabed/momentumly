import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useContext,
  useState,
} from "react";
import TodoEditInput from "./TodoEditInput";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";

type itemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  list: string[];
};
export const TodoListItems: FC<itemProps> = ({ list, ...props }: any) => {
  const { todo, isEdit, setEdit, handleNewChange,editedTask, handleEditedTask } = useContext(TodoContext);

  const handleEdit = (index: string) => {
    todo.map((list: any) => {
      if (list.id === index) {
        setEdit(() => !isEdit);
      }
    });
  };

  return (
    <div
      {...props}
      className="flex justify-center items-center gap-1 bg-pink-100 rounded-lg hover:bg-pink-50 group py-2 pl-2"
    >
      {isEdit ? (
        <form
          name="edited task"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(editedTask)
            handleNewChange && handleNewChange(list.id);
          }}
          className="flex items-center justify-center w-full"
        >
          <button
            type="button"
            className="pr-5 px-1"
            onClick={() => {
              setEdit(() => !isEdit);
            }}
          >
            -
          </button>
          <button type="submit" className="pl-1 px-2">
            +
          </button>
          <input
            type="text"
            defaultValue={list.title}
            autoFocus
            className="h-10 px-2 w-full bg-pink-100 rounded-lg group-hover:bg-pink-50 focus:outline-none on focus:bg-white"
            onChange={handleEditedTask}
          />
        </form>
      ) : (
        <TodoEditInput list={list} handleEdit={handleEdit} />
      )}
    </div>
  );
};
