"use client";

import LogoutButton from "./LogoutButton";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[70px] border-b border-[#E9EBEC] flex items-center justify-between px-6 bg-white z-50">
      <Image
        src="/logo.svg"
        alt=" "
        priority
        height={32}
        width={306}
        className="w-[153px] h-[16px] sm:w-[306px] sm:h-[32px] cursor-pointer"
      />
      <div className="w-[100px]">
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
