import { SearchNormal, SearchNormal1 } from "iconsax-reactjs";
import { sidebar } from "../../Todo/Todo.const";

const Search = () => {
  return (
    <div className="relative w-full flex justify-center">
      <input
        className="shadow-sm border-b-gray-500 focus:bg-white focus:border-b-blue-800 bg-gray-50 border w-[97%] border-gray-200 rounded-lg h-9.5 px-3 text-sm focus:outline-none"
        placeholder={sidebar.placeholder}
      />
      <SearchNormal
        size={15}
        className="absolute left-4 top-[30%] text-gray-400 transform -scale-x-100"
      />
    </div>
  );
};

export default Search;
