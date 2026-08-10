import { CreateTodoData, TodoUpdate } from "@/app/types";

const headers = {
  "Content-Type": "application/json",
};
export const todoService = {
  async getTodos() {
    console.time("FETCH TODOS");

    const res = await fetch("/api/todos");

    console.timeEnd("FETCH TODOS");
    if (!res.ok) {
      throw new Error("Failed to load todos");
    }
    return res.json();
  },
  async create(data: CreateTodoData) {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Create failed");
    }
    return res.json();
  },
  async update(id: string, data: TodoUpdate) {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Update failed");
    }
    return res.json();
  },
  async remove(id: string) {
    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }
    return res.json();
  },
};
