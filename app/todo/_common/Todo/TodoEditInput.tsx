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
        defaultChecked={list.status}
        key={idx}
        className="mx-4 bg-pink-100 rounded-lg group-hover:bg-pink-50"
        aria-checked={list.status}
        onClick={() => changeTaskState && changeTaskState(idx)}
      />
      <div
        key={idx + 1}
        aria-checked={list.status}
        className="flex items-center aria-checked:line-through aria-checked:text-black/30 w-full"
      >
        {list.title}
      </div>
      <button
        key={idx + 4}
        onClick={() => handleEdit(idx)}
        className="cursor-pointer px-2 h-10 text-sm bg-blue-400 rounded-lg text-pink-50"
      >
        ویرایش
      </button>

      <button
        key={idx + 3}
        className="cursor-pointer px-3 h-10 text-sm bg-rose-400 rounded-lg text-pink-50"
        onClick={() => {
          handleDelete && handleDelete(idx);
        }}
      >
        حذف
      </button>
    </>
  );
}
