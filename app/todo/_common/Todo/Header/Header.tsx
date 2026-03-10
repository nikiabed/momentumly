import { getDateFormater } from "./Header.const";


export default function Header() {
 const date = new Date();
const dateString = date.toDateString().split(" ");
let day: string = dateString[0];
let month: string = dateString[1];
let daynum: string = dateString[2];


  const newDate = getDateFormater(day,month,daynum)
  return (
    <header className=" text-pink-50">
      <h1 className="font-extrabold text-3xl">امروز</h1>
      <div className="text-lg">{newDate.day}، { newDate.daynum} {newDate.month}</div>
    </header>
  );
}
