import {
  Card,
  Chart,
  HamburgerMenu,
  IconProps,
  Star1,
  Sun1,
  TickCircle,
} from "iconsax-reactjs";
import { ListItemProps, sidebar } from "../Todo/Todo.const";
import { getDateFormater } from "./Header.const";
import { FC } from "react";
interface ItemIcon extends IconProps {
  item: ListItemProps;
}
export const ItemIcon: FC<ItemIcon> = ({ item, ...props }) => {
  switch (item.icon) {
    case "Sun1":
      return <Sun1 {...props} />;
    case "Star1":
      return <Star1 {...props} />;
    case "Card":
      return <Card {...props} />;
    case "TickCircle":
      return <TickCircle {...props} />;
    case "Chart":
      return <Chart {...props} />;
    case "HamburgerMenu":
      return <HamburgerMenu {...props} />;
    default:
      break;
  }
};

export default function Header({ item }: { item: ListItemProps }) {
  const newDate = getDateFormater();
  return (
    <header className="flex gap-1 flex-col text-rose-50">
      <div className="flex gap-5 text-rose-50">
        <ItemIcon item={item} size={30} />
        <h2 className="font-semibold text-3xl">{item.title}</h2>
      </div>
      {item.title === sidebar.myDay && (
        <span className="text-lg">
          {newDate.day}، {newDate.daynum} {newDate.month}
        </span>
      )}
    </header>
  );
}
