"use client"
import { useState } from "react";

export default function TodoList({ todoList }: any) {
    const [checked, setChecked] = useState(true)

  return (
    <div className="w-full mt-5">
      <ul className="flex flex-col gap-1 w-full">
        {todoList.map((list: any, idx: number) => {
          return (
            <div
              key={idx + 2}
              className="flex bg-pink-100 rounded-lg hover:bg-pink-50 group"
            >
              <button
                key={idx + 1}
                type="button"
                className="m-5 px-5 bg-amber-50 text-black"
                aria-checked={checked}
                onClick={()=> setChecked(!checked)}
              >
                +
              </button>
              <li
                key={idx}
                className="aria-checked:line-through aria-checked:text-black/30 w-full bg-pink-100 rounded-lg group-hover:bg-pink-50 flex items-center"
                aria-checked={checked}
              >
                {list.title} {list.status}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
