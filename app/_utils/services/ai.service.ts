export const aiService = {
  async breakTask(task: string) {
    const res = await fetch("/api/ai/break-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task,
      }),
    });

    if (!res.ok) {
      throw new Error("AI request failed");
    }

    return res.json();
  },
};
