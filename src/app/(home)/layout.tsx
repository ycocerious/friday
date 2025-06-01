import { type PropsWithChildren } from "react";
import { Logo } from "./components/logo";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Logo />
      {children}
    </div>
  );
}
