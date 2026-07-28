export type Todo = {
  _id: string;
  userId?: string;
  title: string;
  status: boolean;
  isImportant: boolean;
  item: string;
  boardKey: string | null;
  isEdit: boolean;
  myDayDate: string | null;
  deadline: Date | null;
  attachment: string | null;
  createdAt: string;
  updatedAt?: string;
  completedAt: Date | null;
};

export type TodoList = Todo[];

export type TodoUpdate = Partial<
  Pick<
    Todo,
    | "title"
    | "status"
    | "isImportant"
    | "boardKey"
    | "myDayDate"
    | "deadline"
    | "attachment"
    | "completedAt"
    | "isEdit"
  >
>;

export type CreateTodoData = {
  title: string;
  status: boolean;
  isImportant: boolean;
  item: string;
  boardKey?: string;
  isEdit: boolean;
  myDayDate?: string | null;
};
