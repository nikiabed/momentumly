import Header from "../../../Header/Header";
import { ListItemProps } from "../../Todo.const";
import { getDateFormater } from "./Header.const";

export default function TodayHeader({ item }: {item:ListItemProps}) {
  const newDate = getDateFormater();
  return (
    <header className="flex gap-1 flex-col text-rose-50">
      <Header item={item}/>
      <span className="text-lg">
        {newDate.day}، {newDate.daynum} {newDate.month}
      </span>
    </header>
  );
}
