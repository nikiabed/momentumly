import { SearchNormal1 } from "iconsax-reactjs";
import { sidebar } from "../../Todo/Todo.const";

const Search = () => {
  return (
    <div className="relative w-full flex justify-center">
      <input
        className="block shadow-sm border-b-gray-500 bg-white border w-[97%] border-gray-200 rounded-lg h-9.5 px-3 text-sm focus:outline-none relative"
        placeholder={sidebar.placeholder}
      />
      <SearchNormal1
        size={15}
        className="absolute left-6 bottom-3 text-gray-400"
      />
    </div>
  );
};

export default Search;
