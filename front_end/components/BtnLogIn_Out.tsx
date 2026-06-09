"use client";
import { useUserContext } from "@/context/MyState";
import AxiosClient from "@/lib/axios-client";
import { off_on } from "@/public/assets";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const BtnLogIn_Out = () => {
  const { user, setUser, setHeart } = useUserContext();

  const handleSignOut = async () => {
    setUser(null);
    setHeart(new Set());
    try {
      await AxiosClient.post("auth/logout");
    } catch {
      toast.error("Sign Out Failed");
    }
    return;
  };

  return (
    <div className="flex items-start md:items-center gap-2 xs:flex-col">
      {user ? (
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            onClick={handleSignOut}
            src={off_on}
            width={30}
            height={30}
            alt="menu_close"
            unoptimized
          />
        </div>
      ) : (
        <div className="flex items-center flex-col md:flex-row gap-2">
          <Link href="/log-in" className="cursor-pointer">
            Log in
          </Link>
          <Link href="/sign-up">
            <button className="bg-red-600 px-6 py-2 rounded-md cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BtnLogIn_Out;
