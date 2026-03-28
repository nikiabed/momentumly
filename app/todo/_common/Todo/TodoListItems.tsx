import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useContext,
} from "react";
import TodoEditInput from "./TodoEditInput";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { CloseCircle, TickCircle } from "iconsax-reactjs";

type itemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  list: string[];
};
export const TodoListItems: FC<itemProps> = ({ list, ...props }: any) => {
  const { handleNewChange, handleEditedTask, handleIsEdit } =
    useContext(TodoContext);

  return (
    <div
      {...props}
      className="flex justify-center items-center gap-1 bg-pink-100 rounded-lg hover:bg-pink-50 group py-2 pl-2"
    >
      {list.isEdit ? (
        <form
          name="edited task"
          onKeyDown={(e: any) => {
            console.log(e);
            if (e.key === "Escape") {
              handleIsEdit && handleIsEdit(list.id);
            }
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleNewChange && handleNewChange(list.id);
          }}
          className="flex items-center justify-center w-full"
        >
          <button
            type="button"
            className="pr-5 px-1"
            onClick={() => {
              handleIsEdit && handleIsEdit(list.id);
            }}
          >
            <CloseCircle size={20} />
          </button>
          <button type="submit" className="pl-1 px-2">
            <TickCircle size={20} />
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
        <TodoEditInput list={list} />
      )}
    </div>
  );
};
