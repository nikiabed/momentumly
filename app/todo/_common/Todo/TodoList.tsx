"use client";
export default function TodoList({ todoList , setTodoList}: any) {
  
  const handleDelete = (index:number) => {
    setTodoList((list:Array<{ id: number; title: string; status: boolean }>)=>{
      return list.filter((_:any,i:number) => i!==index)
    })
  };

  const changeTaskState = (index:number) => {
    const updatedList = todoList.map((list:any,idx:number)=>{
      if (idx===index) {
        list.state = !list.state
        return list
      }
      return list
    })
    setTodoList(updatedList)
  }

  return (
    <div className="w-full mt-5">
      <ul className="flex flex-col gap-1 w-full">
        {todoList.map((list: any, idx: number) => {
          return (
            <div
              key={idx + 2}
              className="flex bg-pink-100 rounded-lg hover:bg-pink-50 group py-2  pl-2"
            >
              <button
                key={idx + 1}
                type="button"
                className="px-5 h-10 text-black"
                aria-checked={list.state}
                onClick={()=>changeTaskState(idx)}
              >
                +
              </button>
              <li
                key={idx}
                className=" aria-checked:line-through aria-checked:text-black/30 w-full bg-pink-100 rounded-lg group-hover:bg-pink-50 flex items-center"
                aria-checked={list.state}
              >
                {list.title} {list.status}
              </li>
              <button
                key={idx + 3}
                className=" px-3 h-10 text-sm bg-rose-400 rounded-lg text-pink-50"
                onClick={() => {
                  handleDelete(idx)
                }}
              >
                حذف
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
