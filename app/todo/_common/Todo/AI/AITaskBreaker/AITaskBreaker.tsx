"use client";

import { useState } from "react";
import { MagicStar } from "iconsax-reactjs";
import { useTodoContext } from "@/app/_utils";

type AIStep = {
  title: string;
  description: string;
  estimatedTime: string;
  difficulty?: "easy" | "medium" | "hard";
};

export const AITaskBreaker = () => {
  const [task, setTask] = useState("");
  const [context, setContext] = useState("");
  const [steps, setSteps] = useState<AIStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { createTodo, createAITodos } = useTodoContext();

  const handleBreakTask = async () => {
    if (!task.trim()) return;

    setLoading(true);
    setError("");
    setSteps([]);

    try {
      const res = await fetch("/api/ai/break-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          context,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI Error");
      }

      setSteps(data.steps ?? []);
    } catch (err: any) {
      setError(err.message || "خطا در ارتباط با هوش مصنوعی");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodos = async () => {
    if (!steps.length) return;

    const parent = await createTodo({
      title: task,
      item: context,
      status: false,
      isImportant: false,
    });

    if (!parent) return;

    await createAITodos(parent, steps);

    setTask("");
    setContext("");
    setSteps([]);
  };

  return (
    <div className="rounded-3xl border border-border-gray bg-background shadow-sm p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
          <MagicStar
            size={24}
            className="text-violet-600 dark:text-violet-300"
          />
        </div>

        <div>
          <h2 className="text-xl font-black text-foreground">
            شکستن کار با هوش مصنوعی
          </h2>

          <p className="text-sm text-text-muted">
            کارهای بزرگ را به قدم‌های کوچک و قابل انجام تبدیل کن.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">عنوان کار</label>

        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="مثلاً پایان نامه را شروع کنم..."
          className="rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-border-focus"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">توضیحات (اختیاری)</label>

        <textarea
          rows={5}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="مثلاً فقط دو ساعت وقت دارم..."
          className="rounded-2xl border border-border bg-background px-4 py-3 resize-none outline-none focus:border-border-focus"
        />
      </div>

      <button
        onClick={handleBreakTask}
        disabled={loading}
        className="self-start rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 transition px-5 py-3 text-white font-bold"
      >
        {loading ? "در حال پردازش..." : "شکستن کار"}
      </button>

      {error && (
        <div className="rounded-xl bg-red-100 text-red-700 p-3 text-sm">
          {error}
        </div>
      )}

      {steps.length > 0 ? (
        <>
          <div className="flex flex-col gap-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border-gray p-4 bg-background"
              >
                <h3 className="font-bold">{step.title}</h3>

                <p className="text-sm text-text-muted mt-2">
                  {step.description}
                </p>

                <div className="mt-2 text-xs text-violet-500">
                  {step.estimatedTime}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreateTodos}
            className="self-start rounded-xl border border-border px-4 py-2 hover:bg-foreground/5 transition"
          >
            اضافه کردن مراحل به تودو
          </button>
        </>
      ) : (
        !loading &&
        !error && (
          <div className="rounded-2xl border border-dashed border-border-gray p-8 text-center text-text-muted">
            نتیجه AI اینجا نمایش داده می‌شود.
          </div>
        )
      )}
    </div>
  );
};
