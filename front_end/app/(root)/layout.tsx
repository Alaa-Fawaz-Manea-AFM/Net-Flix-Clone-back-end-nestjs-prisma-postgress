import { Navbar } from "@/components";

const LayoutRoot = ({ children }: { children: React.ReactNode }) => (
  <main className="min-h-screen mx-auto max-w-screen-xl">
    <Navbar />
    {children}
  </main>
);
export default LayoutRoot;
