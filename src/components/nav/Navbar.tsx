"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Today", icon: "✦" },
  { href: "/calendar", label: "Calendar", icon: "▦" },
  { href: "/stats", label: "Stats", icon: "▲" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="font-semibold text-zinc-100 tracking-tight">
          TaskFlow
        </span>
        <div className="flex gap-1">
          {links.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <span className="text-xs">{icon}</span>
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
