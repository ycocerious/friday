import { type PropsWithChildren } from "react";
import { Navbar } from "./components/navbar";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
