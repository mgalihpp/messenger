import ApplicationLogo from "@/components/ApplicationLogo";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-[1] flex w-full items-center justify-between">
      {/* LOGO */}
      <Link href="/">
        <ApplicationLogo className="h-10" />
      </Link>

      {/* NAVIGATION */}

      <ul className="hidden flex-row items-center gap-8 sm:flex">
        <li className="group flex flex-col">
          <Link href={route("chats.index")} className="text-sm font-semibold">
            Chats
          </Link>
          <span className="mt-1 rounded-full border-b-4 border-transparent group-hover:border-primary"></span>
        </li>
        <li className="group flex flex-col">
          <Link href={route("chats.index")} className="text-sm font-semibold">
            Privacy and Terms
          </Link>
          <span className="mt-1 rounded-full border-b-4 border-transparent group-hover:border-primary"></span>
        </li>
        <li className="group flex flex-col">
          <Link href={route("chats.index")} className="text-sm font-semibold">
            Help Center
          </Link>
          <span className="mt-1 rounded-full border-b-4 border-transparent group-hover:border-primary"></span>
        </li>
      </ul>

      {/* MOBILE NAVIGATION */}
      <button
        aria-label="Open Menu"
        className="btn sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div
          className={cn(
            "fixed left-0 top-0 h-screen w-full bg-background opacity-0 transition-all sm:hidden",
            {
              "opacity-100": isOpen,
            },
          )}
        >
          <div className="flex w-full items-center justify-between p-8">
            {/* LOGO */}
            <Link href="/">
              <ApplicationLogo className="h-10" />
            </Link>

            <button
              aria-label="Open Menu"
              className="btn sm:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
          <ul className="flex flex-col gap-2 divide-y-2 divide-secondary border-secondary px-8">
            <li className="flex flex-col border-t-2 border-secondary py-6">
              <Link
                href={route("chats.index")}
                className="group relative w-fit text-3xl font-semibold"
              >
                Chats
                <span className="absolute -bottom-2 left-0 w-full rounded-full border-b-4 border-transparent group-hover:border-primary"></span>
              </Link>
            </li>
            <li className="flex flex-col py-6">
              <Link
                href={route("chats.index")}
                className="group relative w-fit text-3xl font-semibold"
              >
                Privacy and Terms
                <span className="absolute -bottom-2 left-0 w-full rounded-full border-b-4 border-transparent group-hover:border-primary"></span>
              </Link>
            </li>
            <li className="flex flex-col py-6">
              <Link
                href={route("chats.index")}
                className="group relative w-fit text-3xl font-semibold"
              >
                Help Center
                <span className="absolute -bottom-2 left-0 w-full rounded-full border-b-4 border-transparent group-hover:border-primary"></span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
