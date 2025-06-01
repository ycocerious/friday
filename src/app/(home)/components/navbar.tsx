"use client";

import { Home, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const navItems = [
  {
    icon: Home,
    href: "/",
    label: "Home",
  },
  {
    icon: Plus,
    href: "/upload",
    label: "Create",
  },
  {
    icon: User,
    href: "/profile",
    label: "Profile",
  },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex justify-center">
      <nav className="bg-background/80 w-full max-w-[26rem] border-2 backdrop-blur-lg">
        <div className="mx-auto flex h-16 items-center justify-around px-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1",
                  "hover:bg-muted rounded-lg p-2 transition-colors",
                  isActive && "text-primary",
                  !isActive && "text-muted-foreground",
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
