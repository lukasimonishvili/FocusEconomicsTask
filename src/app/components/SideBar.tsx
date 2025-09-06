"use client";
import { useState } from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`${
        isOpen ? "max-[901px]:left-0" : "max-[901px]:left-[-150px]"
      } fixed top-[70px] left-0   w-[218px] border-r border-[#E9EBEC] min-h-[calc(100vh-70px)] py-3 px-6 bg-white transition-all duration-300`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-0 max-[901px]:opacity-100 transition-opacity duration-300 ml-auto block relative w-6 h-6"
      >
        <span
          className={`block absolute h-[2px] w-full bg-black transition-all duration-300 ${
            isOpen ? "rotate-45 top-3" : "top-1"
          }`}
        ></span>
        <span
          className={`block absolute h-[2px] w-full bg-black transition-all duration-300 ${
            isOpen ? "opacity-0" : "top-3"
          }`}
        ></span>
        <span
          className={`block absolute h-[2px] w-full bg-black transition-all duration-300 ${
            isOpen ? "-rotate-45 top-3" : "top-5"
          }`}
        ></span>
      </button>
    </aside>
  );
};

export default SideBar;
