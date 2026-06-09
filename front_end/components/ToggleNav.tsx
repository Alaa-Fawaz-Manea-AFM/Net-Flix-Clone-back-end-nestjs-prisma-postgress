"use client";
import { useState } from "react";
import { close, menu } from "@/public/assets";
import BtnLogIn_Out from "./BtnLogIn_Out";
import NavLink from "./NavLink";
import Image from "next/image";

const ToggleNav = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div
      onClick={() => setToggle(!toggle)}
      className="flex mr-2 text-lg gap-7 md:hidden relative"
    >
      <Image
        src={toggle ? close : menu}
        alt="menu_close"
        width={30}
        height={30}
        unoptimized
      />
      <div
        onClick={() => setToggle(!toggle)}
        className={`${
          toggle ? "" : "hidden"
        } p-6 black-gradient sidebar absolute top-10 right-0 w-52 z-10 rounded-xl md:hidden space-y-5`}
      >
        <NavLink />
        <BtnLogIn_Out />
      </div>
    </div>
  );
};

export default ToggleNav;
