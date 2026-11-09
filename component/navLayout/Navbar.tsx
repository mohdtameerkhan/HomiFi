
"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation } from "./navigation";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="relative z-50 flex items-center justify-between border-b border-white/10 bg-[#0B1F3A] px-8 py-4 text-white shadow-md">

      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight transition-colors hover:text-blue-300"
      >
        Homi<span className="text-blue-400">Fi</span>
      </Link>

      {/* Navigation */}
      <ul className="flex items-center gap-2">
        {navigation.map((item) => (
          <li key={item.label} className="group relative">

            {/* Dropdown Button */}
            <button
              type="button"
              aria-expanded={openMenu === item.label}
              aria-haspopup="true"
              onClick={() =>
                setOpenMenu(
                  openMenu === item.label ? null : item.label
                )
              }
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              {item.label}

              <svg
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 ${
                  openMenu === item.label
                    ? "rotate-180"
                    : "md:group-hover:rotate-180"
                }`}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="m5 7.5 5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown */}
            <ul
              className={`absolute left-0 top-full z-50 w-72 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 text-[#0B1F3A] opacity-0 shadow-xl transition-all duration-200 ${
                openMenu === item.label
                  ? "visible translate-y-0 opacity-100"
                  : "invisible"
              } md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:visible md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100`}
            >
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={() => setOpenMenu(null)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:bg-blue-50 focus-visible:outline-none"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {/* Sell */}
        <li>
          <Link
            href="/sell"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10 hover:text-blue-300"
          >
            Sell
          </Link>
        </li>

        {/* Login */}
        <li>
          <Link
            href="/login"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:text-blue-300"
          >
            Log in
          </Link>
        </li>

        {/* Sign up */}
        <li>
          <Link
            href="/signup"
            className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
          >
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
}
