import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-AntarcticDeep p-5 text-white sticky top-0 left-0 z-10 flex justify-end items-center space-x-10 ">
      <nav>
        <ul className="flex justify-end space-x-10">
          <li className="px-2 py-1 text-md lg:text-xl relative group">
            <Link to="/" className="relative">
              მთავარი
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:right-0"></span>
            </Link>
          </li>
          <li className="px-2 py-1 text-md lg:text-xl relative group">
            <Link to="/users" className="relative">
              მომხმარებლები
              <span className="absolute bottom-[-4px] left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-out group-hover:w-full group-hover:right-0"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
