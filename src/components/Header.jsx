"use client";

import { MyContext } from "@/app/context-provider";
import { useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(MyContext);
  return (
    <div className={`${darkMode && "dark"} fixed top-0 w-full`}>
      <div className="flex flex-row justify-center items-center shadow-lg p-4 dark:bg-gray-900 dark:text-white text-2xl">
        <h1 className="font-light uppercase tracking-widest">Firebase test</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="ml-auto ">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </div>
  );
};

export default Header;
