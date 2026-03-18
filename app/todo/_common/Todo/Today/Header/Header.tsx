import { getDateFormater } from "./Header.const";

export default function Header({ item }: any) {
  const newDate = getDateFormater();
  const Icon = item.icon;

  return (
    <header className="flex gap-1 flex-col text-rose-50">
      <div className="flex gap-3">
        <Icon size={30} />
        <h2 className="font-extrabold text-3xl">{item.title}</h2>
      </div>
      <span className="text-lg">
        {newDate.day}، {newDate.daynum} {newDate.month}
      </span>
    </header>
  );
}
