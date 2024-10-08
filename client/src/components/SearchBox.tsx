import { IoSearch } from "react-icons/io5";
import { SearchBoxProps } from "../types/usersType";

const SearchBox = ({ setSearchTerm }: SearchBoxProps) => {
  // Handle input changes based on the current pathname
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="py-[3px] px-3 border-solid border-[1px] border-shadowColor rounded-md flex justify-start gap-4 items-center w-[350px] md:w-[300px]">
      <IoSearch className="text-xl" />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="ძიება.."
        className="w-full p-1 rounded-md focus:outline-none text-base"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
