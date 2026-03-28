import { useContext } from "react";
import CompletedList from "../CompletedList";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { ListItemProps } from "../Todo.const";

const Complete = ({ item }: { item: ListItemProps }) => {
  const { todo } = useContext(TodoContext);
  const completedTodo = todo.filter((list: any) => list.status);
  const Icon = item.icon;
  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-[#cac8d8] to-[#239e9a] h-screen p-15">
      <div className="flex gap-5 text-rose-50">
        <Icon size={40} />
        <h2 className="font-semibold text-3xl">{item.title}</h2>
      </div>
      {<CompletedList todo={completedTodo} />}
    </div>
  );
};

export default Complete;
