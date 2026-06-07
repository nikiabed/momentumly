import { sidebar } from "../Sidebar/Sidebar.const";
import { ListItemProps } from "../Todo/Todo.const";
import { ItemIcon } from "./ItemIcon";
import { Palette } from "./Palette";

export const Header = ({ item }: { item: ListItemProps }) => {
  const formatPersianDate = (date: Date) => {
    return new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
      .format(date)
      .replace(" ", "، ");
  };
  return (
    <header className="flex justify-between items-center text-rose-50">
      <div className="flex flex-col gap-1">
        <div className="flex gap-5 text-rose-50">
          <ItemIcon item={item} size={30} />
          <h2 className="font-semibold text-3xl">{item.title}</h2>
        </div>
        {item.title === sidebar.myDay && (
          <span className="text-lg">{formatPersianDate(new Date())}</span>
        )}
      </div>
      <Palette/>
    </header>
  );
};
