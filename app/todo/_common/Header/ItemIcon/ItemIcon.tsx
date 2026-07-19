import { IconProps, SearchNormal1 } from "iconsax-reactjs";
import { FC } from "react";
import {
  Card,
  Chart,
  HamburgerMenu,
  Star1,
  Sun1,
  TickCircle,
} from "iconsax-reactjs";
import { Board } from "@/app/types/board";

interface ItemIcon extends IconProps {
  item: Board;
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
    case "SearchNormal1":
      return <SearchNormal1 {...props} />;
    default:
      break;
  }
};
