"use client";

import { useState } from "react";

export default function TodoList({ todoList, setTodoList , inputValue, handleChange}: any) {
  const handleDelete = (index: number) => {
    setTodoList(
      (list: Array<{ id: number; title: string; status: boolean }>) => {
        return list.filter((_: any, i: number) => i !== index);
      },
    );
  };

  const changeTaskState = (index: number) => {
    const updatedList = todoList.map((list: any, idx: number) => {
      if (idx === index) {
        list.status = !list.status;
        return list;
      }
      return list;
    });
    console.log(updatedList);
    setTodoList(updatedList);
  };

  const [isEdit, setEdit] = useState<boolean>(false);
  const [isId, setId] = useState<number>(-1)
  const [editedTask, setEditedTask] = useState<string>("")
  const handleEdit = (index: number) => {
    setId(index)
    todoList.map((_:any,idx:number)=>{
      if(idx==index){
        setEdit(() => !isEdit);
      }
    })
    console.log(inputValue)
  };

  const handleNewChange =(index:number)=>{
    let editedTodoList = todoList.map((list:any,idx:number)=>{
      if (index == idx && editedTask) {
        list.title = editedTask
        return list
      }
      return list
    })
    setTodoList(editedTodoList)
    setEdit(()=>!isEdit)
  }

  return (
    <div className="w-full mt-5">
      <ul className="flex flex-col gap-1 w-full">
        {todoList.map((list: any, idx: number) => {
          return (
            <div
              key={idx + 2}
              className="flex gap-1 bg-pink-100 rounded-lg hover:bg-pink-50 group py-2  pl-2"
            >
              {isEdit && (isId==idx) ? (
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  handleNewChange(idx)
                  }} className="flex items-center justify-center w-full">
                
                  <button type="button" className="pr-5 px-1" onClick={()=>{setEdit(() => !isEdit);}}>
                    -
                  </button>
                  <button type="submit" className="pl-1">+</button>
                  <input
                    key={idx}
                    type="text"
                    defaultValue={list.title}
                    className="h-10 px-2 w-full bg-pink-100 rounded-lg group-hover:bg-pink-50 focus:outline-none on focus:bg-white"
                    onChange={(e)=>setEditedTask(e.target.value)}
                  />
                </form>
              ) : (
                <>
                  <input
                    type="checkbox"
                    defaultChecked={list.status}
                    key={idx}
                    className="mx-4 bg-pink-100 rounded-lg group-hover:bg-pink-50"
                    aria-checked={list.status}
                    onClick={() => changeTaskState(idx)}
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
                      handleDelete(idx);
                    }}
                  >
                    حذف
                  </button>
                </>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
