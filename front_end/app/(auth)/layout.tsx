import { HeroImgSignInUp } from "@/components";
import { getUserId } from "@/lib/token";
import { redirect } from "next/navigation";

const LayoutAuth = async ({ children }: { children: React.ReactNode }) => {
  const userId = await getUserId();
  if (!userId) redirect("/");
  return (
    <main className="flex items-center flex-col h-screen w-full select-none">
      <div className="z-[-1020] absolute">
        <HeroImgSignInUp />
      </div>
      <div className="mt-32 absolute max-xsm:px-5 px-16 pt-12 pb-5 bg-black flex flex-col gap-5 w-4/5 md:w-lg rounded-2xl">
        {children}
      </div>
    </main>
  );
};

export default LayoutAuth;
