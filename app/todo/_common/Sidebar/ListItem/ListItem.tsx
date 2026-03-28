import { useContext, JSX, useState } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { ListItemProps} from "../../Todo";

const ListItem = ({
  focused,
  handleClick,
}: {
  focused: ListItemProps;
  handleClick: (e: any) => void;
}) => {
  const { todo } = useContext(TodoContext);
  const Icon2 = focused.icon;
  const notCompletedTodo = todo.filter((list: any) => !list.status);
  const completedTodo = todo.filter((list: any) => list.status);
  const [todoNum, setTodoNum] = useState()


  return (
    <li
      id={focused.id}
      onClick={handleClick}
      className={`justify-between cursor-pointer pl-1 py-2 w-full rounded flex gap-1 items-center group hover:bg-black/5 hover:rounded ${focused.state ? "bg-black/5" : "bg-none"} `}
    >
      <div
        id={focused.id}
        className={`flex items-center gap-1.5 before:border-r-4 before:border-transparent before:rounded before:h-5 ${focused.state ? " justify-between before:border-rose-700!" : ""}`}
      >
        <div id={focused.id} className=" flex items-center gap-4">
          <Icon2 id={focused.id} size={20} className="text-rose-400" />
          <span id={focused.id}>{focused.title}</span>
        </div>
      </div>
      {todo.length > 0 && focused.id != "4" && (
        <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
          {focused.id == "3" ? completedTodo.length : notCompletedTodo.length}
        </span>
      )}
    </li>
  );
};

export default ListItem;
