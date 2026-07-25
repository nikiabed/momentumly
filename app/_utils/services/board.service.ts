import { Board } from "@/app/types/board";

const headers = {
  "Content-Type": "application/json",
};

export const boardService = {
  async getBoards(): Promise<Board[]> {
    const res = await fetch("/api/boards");
    if (!res.ok) {
      throw new Error("Failed to load boards");
    }
    return res.json();
  },

  async create(data: any) {
    const res = await fetch("/api/boards", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Create board failed");
    }
    return res.json();
  },

  async updateTitle(id: string, title: string) {
    const res = await fetch("/api/boards/title", {
      method: "PUT",
      headers,
      body: JSON.stringify({
        id,
        title,
      }),
    });
    if (!res.ok) {
      throw new Error("Update board title failed");
    }
    return res.json();
  },

  async remove(id: string) {
    const res = await fetch("/api/boards/delete", {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      throw new Error("Delete board failed");
    }
  },

  async updateTheme(boardId: string, theme: string) {
    console.log(boardId)
    const res = await fetch("/api/boards/theme", {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        boardId,
        theme,
      }),
    });

    if (!res.ok) {
      throw new Error("Update board theme failed");
    }

    return res.json();
  },
};
