"use client";
import { handle_logIn_And_SignUp } from "@/utils/api";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useUserContext } from "@/context/MyState";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { IForm } from "@/types";
import Loader from "./Loader";
import Link from "next/link";

type IForm_Log_In_Up = {
  title: "Log In" | "Sign Up";
  link: "log-in" | "sign-up";
  toggleLink: "log-in" | "sign-up";
};

const FormLog_in_Up = ({ title, link, toggleLink }: IForm_Log_In_Up) => {
  const { setUser, setHeart } = useUserContext();
  const [form, setForm] = useState<IForm>({
    email: "",
    password: "",
  });
  const checkRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(true);
  const router = useRouter();

  const password = form.password || "";

  const hasThreeDigits = (password.match(/\d/g) || []).length >= 3;
  const hasThreeUpper = (password.match(/[A-Z]/g) || []).length >= 3;
  const hasThreeLower = (password.match(/[a-z]/g) || []).length >= 3;

  const fulfilledCount = [hasThreeDigits, hasThreeUpper, hasThreeLower].filter(
    Boolean,
  ).length;

  let strengthLabel = "";
  let strengthColor = "bg-zinc-700";
  let strengthWidth = "w-0";

  if (password.length > 0) {
    if (fulfilledCount === 1) {
      strengthLabel = "Low";
      strengthColor = "bg-red-500";
      strengthWidth = "w-1/3";
    } else if (fulfilledCount === 2) {
      strengthLabel = "Medium";
      strengthColor = "bg-orange-500";
      strengthWidth = "w-2/3";
    } else if (fulfilledCount === 3) {
      strengthLabel = "Strong";
      strengthColor = "bg-green-500";
      strengthWidth = "w-full";
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email == "" || form.password == "")
      return toast.error("Please fill all the fields");

    if (title.toLowerCase() === "sign up" && fulfilledCount < 3) {
      return toast.error("Password must meet all security requirements!");
    }

    setLoading(false);
    await handle_logIn_And_SignUp(
      link,
      router,
      form,
      setForm,
      setUser,
      setHeart,
    );
    setLoading(false);
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          name="email"
          autoFocus={true}
          value={form?.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 text-lg rounded-md outline-none bg-[#3B3B3B]"
        />

        <div className="space-y-3">
          <div className="relative bg-[#3B3B3B] rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form?.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 text-lg rounded-md outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((pre) => !pre)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
            >
              {showPassword ? (
                <EyeOff className="text-red-500 w-5 h-5" />
              ) : (
                <Eye className="text-red-500 w-5 h-5" />
              )}
            </button>
          </div>

          {password.length > 0 && title.toLowerCase() === "sign up" && (
            <div className="space-y-2 p-2 bg-zinc-900/40 rounded-lg border border-zinc-800/50">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-zinc-400">Password Strength:</span>
                <span
                  className={
                    fulfilledCount === 1
                      ? "text-red-500"
                      : fulfilledCount === 2
                        ? "text-orange-500"
                        : "text-green-500"
                  }
                >
                  {strengthLabel}
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strengthColor} ${strengthWidth} duration-300 transition-all`}
                />
              </div>

              <div className="pt-1 space-y-1 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5">
                  {hasThreeDigits ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span
                    className={
                      hasThreeDigits ? "text-zinc-400" : "text-zinc-200"
                    }
                  >
                    At least 3 digits (0-9)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasThreeUpper ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span
                    className={
                      hasThreeUpper ? "text-zinc-400" : "text-zinc-200"
                    }
                  >
                    At least 3 uppercase letters (A-Z)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasThreeLower ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span
                    className={
                      hasThreeLower ? "text-zinc-400" : "text-zinc-200"
                    }
                  >
                    At least 3 lowercase letters (a-z)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !check}
          className={`${
            loading || !check
              ? "cursor-not-allowed opacity-50"
              : "hover:opacity-90 cursor-pointer"
          } bg-red-700 py-1 rounded-md text-2xl font-semibold leading-normal text-white`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader /> {title}...
            </span>
          ) : (
            <span>{title}</span>
          )}
        </button>
      </form>

      <div className="flex flex-col gap-10 text-gray-400">
        <div className="flex items-center justify-between">
          <div
            onClick={() => setCheck((pre) => !pre)}
            className={`${
              !check ? "border rounded-md border-red-500" : "border-0"
            } flex items-center p-1 gap-2 cursor-pointer`}
          >
            <input
              aria-label="checkbox"
              ref={checkRef}
              checked={check}
              type="checkbox"
              name="checkbox"
              readOnly
            />
            Remember My
          </div>
          Need Help?
        </div>
        <span>
          New to Netflix?{" "}
          <Link href={`/${toggleLink}`} className="text-white capitalize">
            {toggleLink?.replace("-", " ")}
          </Link>
        </span>
      </div>
    </>
  );
};

export default FormLog_in_Up;
