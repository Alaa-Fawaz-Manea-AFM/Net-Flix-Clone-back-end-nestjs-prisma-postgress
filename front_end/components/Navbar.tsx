import BtnLogIn_Out from "./BtnLogIn_Out";
import ToggleNav from "./ToggleNav";
import NavLink from "./NavLink";
import Link from "next/link";
import Bg_Navbar from "./Bg_Navbar";

const Navbar = () => (
  <Bg_Navbar>
    <div className="flex items-center md:gap-7">
      <Link href="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      <div className="max-md:hidden">
        <NavLink />
      </div>
    </div>

    <div className="max-md:hidden">
      <BtnLogIn_Out />
    </div>
    <ToggleNav />
  </Bg_Navbar>
);

export default Navbar;
