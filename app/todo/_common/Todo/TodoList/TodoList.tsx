"use client";
import { useCallback, useState } from "react";
import { TodoListType } from "../Todo.const";
import { TodoListItems } from "../TodoListItem";

export const TodoList = ({
  todo,
  setTodo,
}: {
  todo: TodoListType;
  setTodo: any;
}) => {
  const [dragEnter, setDragEnter] = useState(false);
  const [dragPage, setDragPage] = useState(0);
  const handleDrag = (e: any) => {
    setDragPage(e.pageY);
    
  };
  const handleDragEnter = (e: any) => {
    
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
    if (e.pageY - dragPage < 80 && e.pageY - dragPage > 50) {
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
    // setNewItem(item[0]);
    // // setList((prev) =>
    // //   prev.filter((li: any) => (!li.dragEnter)),
    // // );
    // // setNewItem({ ...newItem , id:list.length+1 });
  };

  const handleDrop = useCallback((e: any) => {
    setDragEnter(false);
    // newItem && setList((old:any)=>{
    //   let clone=[...old]
    //   clone.splice(1)
    //   return clone
    // });
  },[]);
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
