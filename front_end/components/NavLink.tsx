"use client";
import { Links } from "@/utils/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = () => {
  const pathname = usePathname();

  return (
    <ul className="flex text-base md:text-sm lg:text-md font-semibold gap-2 md:gap-6 flex-col md:flex-row w-full md:w-auto">
      {Links.map((link) => {
        const isHome = link.toLowerCase() === "home";
        const href = isHome
          ? "/"
          : `/${link.toLowerCase().replace(/\s+/g, "-")}`;

        const isActive = pathname.toLowerCase() === href.toLowerCase();
        return (
          <li key={link} className="w-full md:w-auto">
            <Link
              href={href}
              className={`block w-fit px-3 py-1.5 md:py-1 rounded-xl transition-all duration-200 relative group text-sm font-medium ${
                isActive
                  ? "text-custom-red dark:text-custom-red bg-custom-red/10 font-bold"
                  : "text-gray-600 dark:text-zinc-400 hover:text-custom-red dark:hover:text-white"
              }`}
            >
              {link}

              {!isActive && (
                <span className="absolute bottom-0 left-3 rounded-full w-0 h-1 bg-custom-red transition-all duration-300 group-hover:w-[calc(100%-24px)]" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLink;
