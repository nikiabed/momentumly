import { useContext, useState } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import Header from "./Header/TodayHeader";
import TodoInput from "../TodoInput";
import TodoList from "../TodoList";
import CompletedList from "../CompletedList";

type ListItem = {
  id?: number | undefined;
  title?: string | undefined;
  dragEnter?: boolean | undefined;
  dropped?: boolean | undefined;
};

const Today = ({ item }: any) => {
  const { todo, setTodo } = useContext(TodoContext);
  const notCompletedTodo = todo.filter((list: any) => {
    const date = new Date();
    return !list.status && list.date === date.toDateString();
  });
  const completedTodo = todo.filter((list: any) => {
    const date = new Date();
    return list.status && list.date === date.toDateString();
  });
  const [list, setList] = useState([
    {
      id: crypto.randomUUID(),
      title: "box1",
      dragEnter: false,
      dropped: false,
    },
    {
      id: crypto.randomUUID(),
      title: "box2",
      dragEnter: false,
      dropped: false,
    },
    {
      id: crypto.randomUUID(),
      title: "box3",
      dragEnter: false,
      dropped: false,
    },
  ]);
  // const dragList = list.filter((li:any)=>!li.dragEnter)
  // const draggedItem = list.filter((li:any)=>li.dragEnter)

  const [dragEnter, setDragEnter] = useState(false);
  const handleDrag = (e: any) => {
    setList((prev) =>
      prev.map((li: any) =>
        li.title == e.target.innerHTML ? { ...li, dragEnter: true } : li,
      ),
    );
  };
  const handleDragEnter = (e: any) => {
    // console.log(dragEnter);
    // // console.log(e)
    // const draggedId = e.dataTransfer.getData("text");
    // console.log(draggedId)
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
    const item = list.map((li: any) => {
      if (li.dragEnter) {
        return li;
      }
    });
    item.filter((l: any) => l != undefined);
    console.log(item);
    setNewItem(item[0]);
    // setList((prev) =>
    //   prev.filter((li: any) => (!li.dragEnter)),
    // );
    // setNewItem({ ...newItem , id:list.length+1 });
  };

  const handleDrop = (e: any) => {
    console.log(newItem);
    console.log(newItem.id);
    setDragEnter(false);
    console.log(newItem.id);
    // newItem && setList((old:any)=>{
    //   let clone=[...old]
    //   clone.splice(1)
    //   return clone
    // });
  };

  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-rose-400 h-screen px-15 pt-5">
      <Header item={item} />
      <TodoInput />
      <TodoList todo={notCompletedTodo} setTodo={setTodo} />
      {completedTodo.length > 0 && <CompletedList todo={completedTodo} />}

      {/* <div className="flex gap-10">
        <div>
          {!dropped && (
            <div
              id="white"
              onDragStart={handleDrag}
              draggable={true}
              className="text-center w-50 h-50 bg-white transition-all ease-in-out"
            >
              Box1
            </div>
          )}
          {!dropped1 && (
            <div
              id="yellow"
              onDragStart={handleDrag}
              draggable={true}
              className="text-center w-50 h-50 bg-yellow-300"
            >
              Box2
            </div>
          )}
        </div>
        <div
          id="gray"
          onDrop={handleDrop}
          onDragOver={handleOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={` ${dragEnter ? "border border-black" : ""} flex flex-col items-center bg-gray-200 w-55 h-100`}
        >
          {dropped && (
            <div
              id="white"
              onDragStart={handleDrag}
              draggable={true}
              className="text-center w-50 h-50 bg-white"
            >
              Box1
            </div>
          )}
          {dropped1 && (
            <div
              id="yellow"
              onDragStart={handleDrag}
              draggable={true}
              className="text-center w-50 h-50 bg-yellow-300"
            >
              Box2
            </div>
          )}
        </div>
      </div> */}

      {/* <div className="my-10">
        <ul
          onDrop={handleDrop}
          onDragOver={handleOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={` ${dragEnter ? "border border-black" : ""} flex flex-col bg-gray-200 w-50 gap-2 h-70`}
        >
          {list.map((l) => {
            return (
              <li
                key={l.id}
                id={`${l.id}`}
                onDragStart={handleDrag}
                draggable={true}
                className="w-50 bg-white"
              >
                {l.title}
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default Today;
