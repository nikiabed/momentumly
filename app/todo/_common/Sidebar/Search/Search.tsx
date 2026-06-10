import { SearchNormal } from "iconsax-reactjs";
import { sidebar } from "../Sidebar.const";
import { useTodoContext } from "@/app/_utils";

export const Search = () => {
  const { setSearchText, searchText, setActiveBoard } = useTodoContext();
  return (
    <div className="relative w-full flex justify-center">
      <input
        className="shadow-sm border-b-gray-500 focus:bg-white focus:border-b-blue-800 bg-gray-50 border w-[97%] border-gray-200 rounded-lg h-9.5 px-3 text-sm focus:outline-none"
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
        className="absolute left-4 top-[30%] text-gray-400 transform -scale-x-100"
      />
    </div>
  );
};
