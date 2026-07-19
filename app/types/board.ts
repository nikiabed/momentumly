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
  filter: (todo: any) => any;
  theme: string;
};

export type BoardList = Board[];