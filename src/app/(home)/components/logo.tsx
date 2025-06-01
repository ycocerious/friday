import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

export function Logo() {
  return (
    <nav className="absolute top-0 right-0 left-0 z-50 bg-transparent">
      <div className="container mx-auto flex h-12 items-center justify-end px-4 pt-4">
        <Link href="/" className="flex items-center gap-3">
          <span
            className={`${outfit.className} bg-gradient-to-r from-emerald-300 via-emerald-100 to-teal-200 bg-clip-text text-xl text-transparent`}
          >
            Friday
          </span>
          <div className="relative h-8 w-8">
            <Image
              src="/logo.png"
              alt="Friday Logo"
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
