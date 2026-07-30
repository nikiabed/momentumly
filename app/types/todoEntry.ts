export type TodoEntry = {
  _id: string;
  todoId: string;
  userId: string;
  date: string; // مثلا "2026-07-30"
  durationSeconds: number;
  createdAt: Date;
  updatedAt: Date;
};
