import { header } from "../Todo.const";
import { getDateFormater } from "./Header.const";

export default function Header() {
  

  const newDate = getDateFormater();
  return (
    <header className=" text-pink-50">
      <h1 className="font-extrabold text-3xl">{header.today}</h1>
      <div className="text-lg">
        {newDate.day}، {newDate.daynum} {newDate.month}
      </div>
    </header>
  );
}
