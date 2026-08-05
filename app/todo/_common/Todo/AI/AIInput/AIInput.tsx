"use client";

import { aiService } from "@/app/_utils/services/ai.service";
import { useState } from "react";

export const AIInput = () => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!task.trim()) return;

    try {
      setLoading(true);

      const result = await aiService.breakTask(task);

      console.log(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
bg-background
border
border-border-gray
rounded-3xl
p-4
"
    >
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="
مثلا: پایان نامه ام را شروع کنم
"
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "در حال فکر کردن..." : "شکستن تسک"}
      </button>
    </div>
  );
};
