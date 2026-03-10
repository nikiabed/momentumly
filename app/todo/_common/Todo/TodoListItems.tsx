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
  idx: number;
};
export const TodoListItems: FC<itemProps> = ({ list, idx, ...props }: any) => {
  const { todo, setTodo } = useContext(TodoContext);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isId, setId] = useState<number>(-1);
  const [editedTask, setEditedTask] = useState<string>("");

  const handleEdit = (index: number) => {
    setId(index);
    todo.map((_: any, idx: number) => {
      if (idx == index) {
        setEdit(() => !isEdit);
      }
    });
  };

  const handleNewChange = (index: number) => {
    let editedTodoList = todo.map((list: any, idx: number) => {
      if (index == idx && editedTask) {
        list.title = editedTask;
        return list;
      }
      return list;
    });
    {
      setTodo && setTodo(editedTodoList);
    }
    setEdit(() => !isEdit);
  };

  return (
    <div
      {...props}
      className="flex gap-1 bg-pink-100 rounded-lg hover:bg-pink-50 group py-2  pl-2"
    >
      {isEdit && isId == idx ? (
        <form
          name="edited task"
          key={idx + 5}
          onSubmit={(e) => {
            e.preventDefault();
            handleNewChange(idx);
          }}
          className="flex items-center justify-center w-full"
        >
          <button
            key={idx + 6}
            type="button"
            className="pr-5 px-1"
            onClick={() => {
              setEdit(() => !isEdit);
            }}
          >
            -
          </button>
          <button key={idx + 7} type="submit" className="pl-1 px-2">
            +
          </button>
          <input
            key={idx}
            type="text"
            defaultValue={list.title}
            autoFocus
            className="h-10 px-2 w-full bg-pink-100 rounded-lg group-hover:bg-pink-50 focus:outline-none on focus:bg-white"
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </form>
      ) : (
        <TodoEditInput list={list} idx={idx} handleEdit={handleEdit} />
      )}
    </div>
  );
};
