import { SearchNormal } from "iconsax-reactjs";
import { sidebar } from "../Sidebar.const";
import { useTodoContext } from "@/app/_utils";

export const Search = () => {
  const { setSearchText, searchText, setActiveBoard } = useTodoContext();
  return (
    <div className="relative w-full flex justify-center mt-2">
      <input
        className="shadow-sm border-b-border focus:bg-background focus:border-b-border-focus bg-background border w-[97%] border-border-gray rounded-lg h-9.5 px-3 text-sm focus:outline-none"
        placeholder={sidebar.placeholder}
        value={searchText}
        onChange={(e) => {
          const value = e.target.value;
          setSearchText?.(value);
          setActiveBoard?.("search");
          if (!value.trim()) {
            setActiveBoard?.("myDay");
          }
        }}
      />
      <SearchNormal
        size={15}
        className="absolute left-4 top-[30%] text-muted transform -scale-x-100"
      />
    </div>
  );
};
