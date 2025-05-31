"use client";

import { useAtom } from "jotai/react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { userAtom } from "~/lib/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Navbar() {
  const [storedUser, setStoredUser] = useAtom(userAtom);
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    setStoredUser(null);
    router.push("/sign-in");
  };

  const getAuthLink = () => {
    if (pathname === "/sign-in") {
      return { href: "/sign-up", label: "Sign Up" };
    }
    return { href: "/sign-in", label: "Sign In" };
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="text-xl font-bold">
          Friday
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          {storedUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {storedUser.name
                        ? storedUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : storedUser.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{storedUser.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center text-red-600 focus:text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link href={getAuthLink().href}>{getAuthLink().label}</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
