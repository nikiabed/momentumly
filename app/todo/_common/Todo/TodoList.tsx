"use client";
import { TodoListItems } from "./TodoListItems";
import { TodoListType } from "./Todo.const";
import { useState } from "react";

export default function TodoList({
  todo,
  setTodo,
}: {
  todo: TodoListType;
  setTodo: any;
}) {
  const [dragEnter, setDragEnter] = useState(false);
  const [dragPage, setDragPage] = useState(0);
  const handleDrag = (e: any) => {
    setDragPage(e.pageY);
    
  };
  const handleDragEnter = (e: any) => {
    // console.log(dragEnter);
    // console.log(e)
  };
  const handleDragLeave = (e: any) => {
    // setList((prev) =>
    //   prev.map((li: any) => (li.dragEnter ? { ...li, dragEnter: false } : li)),
    // );
  };

  const [dropped, setDrop] = useState(false);
  const [dropped1, setDrop1] = useState(false);
  const [newItem, setNewItem] = useState({
    id: crypto.randomUUID(),
    title: "box1",
    dragEnter: false,
    dropped: false,
  });

  const handleOver = (e: any) => {
    e.preventDefault();
    setDragEnter(true);
    console.log(e)
    // console.log(e.pageY, "handleOver");
    if (e.pageY - dragPage < 80 && e.pageY - dragPage > 50) {
      // console.log("jaye avali");
      setTodo((old: any) => {
        let clone = [...old];
        clone.map((c: any) => {
          if (c.id == e.target.key) {
            clone.splice(0, 1);
          }
        });
        return clone;
      });
    }

    // const item = list.map((li: any) => {
    //   if (li.dragEnter) {
    //     return li;
    //   }
    // });
    // item.filter((l: any) => l!=undefined);
    // console.log(item)
    // setNewItem(item[0]);
    // // setList((prev) =>
    // //   prev.filter((li: any) => (!li.dragEnter)),
    // // );
    // // setNewItem({ ...newItem , id:list.length+1 });
  };

  const handleDrop = (e: any) => {
    setDragEnter(false);
    // console.log(newItem);
    // console.log(newItem.id)
    // console.log(newItem.id)
    // newItem && setList((old:any)=>{
    //   let clone=[...old]
    //   clone.splice(1)
    //   return clone
    // });
  };
  return (
    <>
      <ul
        onDrop={handleDrop}
        onDragOver={handleOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className="flex flex-col gap-1 w-full"
      >
        {todo.map((list: any) => {
          return (
            <TodoListItems
              key={list.id}
              list={list}
              draggable={true}
              onDragStart={handleDrag}
            />
          );
        })}
      </ul>
    </>
  );
}
