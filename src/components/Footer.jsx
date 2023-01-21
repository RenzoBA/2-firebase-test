"use client";

import { MyContext } from "@/app/context-provider";
import { useContext } from "react";

const Footer = () => {
  const { darkMode } = useContext(MyContext);

  return (
    <div className={`${darkMode && "dark"} w-full fixed bottom-0 p-1`}>
      <p className="dark:bg-gray-800 dark:text-slate-200 text-center font-light">
        Powered by ❤️
      </p>
    </div>
  );
};

export default Footer;
