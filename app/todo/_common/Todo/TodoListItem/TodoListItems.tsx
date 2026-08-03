"use client";

import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";

import {
  Add,
  ArrowDown2,
  ArrowRight2,
  CloseCircle,
  TickCircle,
} from "iconsax-reactjs";

import { useTodoContext } from "@/app/_utils/hooks";
import { TodoEditInput } from "../TodoEditInput";
import { getDateKey } from "@/app/_utils";
import { Todo } from "@/app/types";

type itemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  list: Todo;
  subTodos?: Todo[];
};

export const getTodoState = (todo: Todo, today = getDateKey(new Date())) => {
  if (todo.status) return "done";

  if (!todo.deadline) return "normal";

  const deadline = getDateKey(todo.deadline);

  if (!deadline) return "normal";

  if (deadline === today) return "today";

  if (today && deadline < today) return "overdue";

  return "normal";
};

export const TodoListItems: FC<itemProps> = ({
  list,
  subTodos = [],
  ...props
}) => {
  const [localTitle, setLocalTitle] = useState(list.title);
  const [expanded, setExpanded] = useState(false);

  const [addingChild, setAddingChild] = useState(false);
  const [childTitle, setChildTitle] = useState("");

  const { handleUpdateTodo, handleIsEdit, createTodo } = useTodoContext();

  const hasChildren = subTodos.length > 0;

  const todayKey = getDateKey(new Date()) || "normal";

  useEffect(() => {
    setLocalTitle(list.title);
  }, [list.title]);

  const state = getTodoState(list, todayKey);

  const handleAddChild = async () => {
    if (!childTitle.trim()) return;

    await createTodo({
      title: childTitle,
      item: childTitle,
      status: false,
      isImportant: false,
      parentTodoId: list._id,
    });

    setChildTitle("");
    setAddingChild(false);

    setExpanded(true);
  };

  return (
    <div {...props} className="flex flex-col gap-1">
      {/* MAIN TODO */}
      <div
        className={`
          flex
          items-center
          gap-2
          bg-background
          rounded-lg
          hover:bg-background/80
          group
          py-2
          px-2

          ${state === "overdue" ? "bg-overdue-soft text-overdue-text" : ""}

          ${state === "today" ? "bg-today-soft text-today-text" : ""}

          ${state === "done" ? "opacity-50" : ""}
        `}
      >
        {list.isEdit ? (
          <form
            name="edited task"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                handleIsEdit?.(list._id, false);
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateTodo?.(list, localTitle);
            }}
            className="flex items-center w-full gap-2"
          >
            <button
              type="button"
              onClick={() => {
                handleIsEdit?.(list._id, false);
              }}
            >
              <CloseCircle size={20} />
            </button>

            <button type="submit">
              <TickCircle size={20} />
            </button>

            <input
              autoFocus
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className="
                h-10
                px-2
                w-full
                bg-background
                rounded-lg
                focus:outline-none
              "
            />
          </form>
        ) : (
          <>
            {/* EXPAND BUTTON */}

            {hasChildren ? (
              <button
                onClick={() => setExpanded(!expanded)}
                className="
                  text-foreground
                "
              >
                {expanded ? (
                  <ArrowDown2 size={16} />
                ) : (
                  <ArrowRight2 size={16} />
                )}
              </button>
            ) : (
              <div className="w-4" />
            )}

            {/* TITLE */}

            <div className="flex-1 min-w-0">
              <TodoEditInput list={list} />
            </div>

            {/* ADD CHILD */}

            <button
              onClick={() => {
                setAddingChild(true);
                setExpanded(true);
              }}
              className="
                opacity-50
                group-hover:opacity-100
                transition
                text-foreground
                hover:text-violet-500
              "
            >
              <Add size={18} />
            </button>
          </>
        )}
      </div>

      {/* CHILD INPUT */}

      {addingChild && (
        <div
          className="
      mr-8
      flex
      items-center
      gap-2
    "
        >
          <input
            autoFocus
            value={childTitle}
            onChange={(e) => setChildTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddChild();
              }

              if (e.key === "Escape") {
                setAddingChild(false);
                setChildTitle("");
              }
            }}
            placeholder="زیرتودو..."
            className="
        flex-1
        rounded-lg
        border
        border-border-gray
        px-3
        py-2
        bg-background
        text-sm
        outline-none
      "
          />

          <button
            onClick={() => {
              setAddingChild(false);
              setChildTitle("");
            }}
            className="
        text-background/50
        hover:text-red-500
      "
          >
            <CloseCircle size={18} />
          </button>
        </div>
      )}

      {/* CHILDREN */}

      {expanded && hasChildren && (
        <div
          className="
    mr-8
    border-r
    border-border-gray
    pr-4
    flex
    flex-col
    gap-1
  "
        >
          {subTodos.map((task) => (
            <TodoListItems key={task._id} list={task} subTodos={[]} />
          ))}
        </div>
      )}
    </div>
  );
};
