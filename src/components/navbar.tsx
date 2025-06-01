"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

export function Navbar() {
  const pathname = usePathname();

  const getAuthLink = () => {
    if (pathname === "/sign-in") {
      return { href: "/sign-up", label: "Sign Up" };
    }
    return { href: "/sign-in", label: "Sign In" };
  };

  return (
    <nav className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Friday
        </Link>
        <Button variant="ghost" asChild>
          <Link href={getAuthLink().href}>{getAuthLink().label}</Link>
        </Button>
      </div>
    </nav>
  );
}
