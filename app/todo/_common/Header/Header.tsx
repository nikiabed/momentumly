import { t } from "@/app/i18n/t";
import { titleToKey } from "../Sidebar";
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

  const themeTextColor: Record<string, string> = {
    fire: "text-white",
    sunset: "text-white",
    lavender: "text-white",
    ocean: "text-white",
    mint: "text-white",
    purple: "text-white",
    "pink-soft": "text-gray-700",
    "blue-soft": "text-gray-700",
    "purple-soft": "text-gray-700",
    "green-soft": "text-gray-700",
    "red-soft": "text-gray-700",
  };
  return (
    <header
      className={`flex justify-between items-center ${
        themeTextColor[item.theme]
      }`}
    >
      <div className="flex flex-col gap-1">
        <div className={`flex gap-5 items-center ${
        themeTextColor[item.theme]
      }`}>
          <ItemIcon item={item} size={30} />
          <h2 className="font-semibold text-3xl">
            {t(titleToKey[item.title] ?? item.title)}
          </h2>
        </div>
        {item.title === sidebar.myDay && (
          <span className="text-lg">{formatPersianDate(new Date())}</span>
        )}
      </div>
      <Palette item={item} />
    </header>
  );
};
