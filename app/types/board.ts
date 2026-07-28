export type Board = {
  title: string;
  state: boolean;
  _id: string;
  icon: string;
  color: string;
  boardKey: string;
  order: number;
  editable: boolean;
  isEdit: boolean;
  theme: string;
};

export type BoardList = Board[];

export type CreateBoardData = {
  title: string;
  boardKey: string;
  state: boolean;
  icon: string;
  color: string;
  editable: boolean;
  isEdit: boolean;
  order: number;
  theme: string;
};
