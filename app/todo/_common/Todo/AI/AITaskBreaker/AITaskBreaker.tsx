"use client";

import { useState } from "react";
import { MagicStar } from "iconsax-reactjs";
import { useTodoContext } from "@/app/_utils";

export const AITaskBreaker = () => {
  const [task, setTask] = useState("");
  const [context, setContext] = useState("");
  const { createAITodos } = useTodoContext();

  return (
    <div
      className="
      rounded-3xl
      border border-border-gray
      bg-background
      shadow-sm
      p-6
      flex flex-col gap-6
    "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="
          w-12 h-12
          rounded-2xl
          bg-violet-100
          dark:bg-violet-900/40
          flex items-center justify-center
        "
        >
          <MagicStar
            size={24}
            className="text-violet-600 dark:text-violet-300"
          />
        </div>

        <div>
          <h2 className="text-xl font-black text-foreground">
            AI Task Breaker
          </h2>

          <p className="text-sm text-text-muted">
            کارهای بزرگ را به قدم‌های کوچک و قابل انجام تبدیل کن.
          </p>
        </div>
      </div>

      {/* Task */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-foreground">عنوان کار</label>

        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="مثلاً پایان‌نامه را تمام کنم..."
          className="
            rounded-2xl
            border border-border
            bg-background
            px-4
            py-3
            outline-none
            focus:border-border-focus
          "
        />
      </div>

      {/* Context */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-foreground">
          توضیحات (اختیاری)
        </label>

        <textarea
          rows={5}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="مثلاً فقط دو ساعت وقت دارم و از نوشتن مقدمه می‌ترسم..."
          className="
            rounded-2xl
            border border-border
            bg-background
            px-4
            py-3
            resize-none
            outline-none
            focus:border-border-focus
          "
        />
      </div>

      {/* Button */}
      <button
        className="
          self-start
          rounded-2xl
          bg-violet-600
          hover:bg-violet-700
          transition
          px-5
          py-3
          text-white
          font-bold
          cursor-pointer
        "
      >
        ⚡ شکستن کار
      </button>

      {/* Result Placeholder */}
      <div
        className="
        rounded-2xl
        border border-dashed border-border-gray
        p-8
        text-center
        text-text-muted
      "
      >
        نتیجه AI اینجا نمایش داده می‌شود.
      </div>
      <button onClick={() => createAITodos(parentTodo, steps)}>
        اضافه کردن مراحل به کارها
      </button>
    </div>
  );
};
