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
  completionSource: "realtime" | "manual" | null;
  trackedTimeSeconds: number;
  parentTodoId?: string | null;
  isAIStep?: boolean;
};

export type CreateTodoInput = {
  title: string;
  item: string;
  status?: boolean;
  isImportant?: boolean;
  boardKey?: string;
  parentTodoId?: string | null;
  isAIStep?: boolean;
  isEdit?: boolean;
  myDayDate?: string | null;
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
    | "completionSource"
    | "trackedTimeSeconds"
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
  parentTodoId?: string | null;
  isAIStep?: boolean;
};
