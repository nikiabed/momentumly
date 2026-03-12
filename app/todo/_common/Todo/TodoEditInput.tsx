import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { useContext } from "react";

export default function TodoEditInput({
  list,
  idx,
  handleEdit,
}: any) {

  const {changeTaskState, handleDelete} = useContext(TodoContext)
  return (
    <>
      <input
        type="checkbox"
        checked={list.status}
        className="mx-4 bg-pink-100 rounded-lg group-hover:bg-pink-50"
        // aria-checked={list.status}
        onChange={() => changeTaskState && changeTaskState(list.id)}
      />
      <div
        aria-checked={list.status}
        className="flex items-center aria-checked:line-through aria-checked:text-black/30 w-full"
      >
        {list.title}
      </div>
      <button
        onClick={() => handleEdit(list.id)}
        className="cursor-pointer px-2 h-10 text-sm bg-blue-400 rounded-lg text-pink-50"
      >
        ویرایش
      </button>

      <button
        className="cursor-pointer px-3 h-10 text-sm bg-rose-400 rounded-lg text-pink-50"
        onClick={() => {
          handleDelete && handleDelete(list.id);
        }}
      >
        حذف
      </button>
    </>
  );
}
