import { ListItemProps } from "../Todo";

const Header = ({ item }: { item: ListItemProps }) => {
  const Icon = item.icon;
  return (
    <div className="flex gap-5 text-rose-50">
      <Icon size={40} />
      <h2 className="font-semibold text-3xl">{item.title}</h2>
    </div>
  );
};

export default Header;
