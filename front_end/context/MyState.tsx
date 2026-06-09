"use client";
import {
  Dispatch,
  useState,
  useEffect,
  createContext,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { getUserData } from "../utils/api";
import { IHeart, IUser } from "@/types";

interface IValue {
  user: IUser | null;
  heart: Set<IHeart>;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setHeart: Dispatch<SetStateAction<Set<IHeart>>>;
}

const MyContext = createContext<IValue | null>(null);

export const useUserContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useUserContext must be used within MyState");
  }

  return context;
};

const MyState = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [heart, setHeart] = useState<Set<IHeart>>(new Set());
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();
        setUser(data?.user || []);
        setHeart(new Set(data?.hearts) || new Set());
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      heart,
      setHeart,
    }),
    [user, heart],
  );
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyState;
