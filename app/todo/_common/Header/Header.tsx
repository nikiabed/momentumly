import { t } from "@/app/i18n/t";
import { titleToKey } from "../Sidebar";
import { ItemIcon } from "./ItemIcon";
import { Palette } from "./Palette";
import { Board, TodoList } from "@/app/types";
import { BOARD_KEYS } from "@/app/_utils";
import { Coins } from "./Coins";
import { ThemeToggle } from "./ThemeToggle";

export const themeTextColor: Record<string, string> = {
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

export const Header = ({ item, todo }: { item: Board; todo: TodoList }) => {
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
    <header
      className={`flex md:justify-between items-start flex-col md:flex-row gap-2 ${
        themeTextColor[item.theme]
      }`}
    >
      <div className="flex flex-col gap-1">
        <div
          className={`flex gap-5 items-center ${themeTextColor[item.theme]}`}
        >
          <ItemIcon item={item} size={30} className={`${themeTextColor[item.theme]}`}/>
          <h2 className="font-semibold text-3xl">
            {t(titleToKey[item.title] ?? item.title)}
          </h2>
        </div>
        {item.boardKey === BOARD_KEYS.MY_DAY && (
          <span className="text-lg">{formatPersianDate(new Date())}</span>
        )}
      </div>

      <div className="flex gap-3 items-center w-full md:w-auto justify-between">
        <Coins item={item} filterTodo={todo} />
        <ThemeToggle />
        <Palette item={item} />
      </div>
    </header>
  );
};
