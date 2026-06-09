import { Form_login_signUp } from "@/components";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "log-in",
};

const SignUpPage = () => (
  <>
    <Link href="/">
      <h1 className="text-red-600 w-fit text-4xl font-bold cursor-pointer mx-auto">
        NETFLIX
      </h1>
    </Link>
    <h2 className="text-3xl text-center">Sign Up</h2>

    <Form_login_signUp title="Sign Up" link="sign-up" toggleLink="log-in" />
  </>
);
export default SignUpPage;
