"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/articulos", label: "Artículos" },
  { href: "/proveedores", label: "Proveedores" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex items-center gap-6 bg-ink px-5 py-3 text-white md:fixed md:inset-y-0 md:left-0 md:w-60 md:flex-col md:items-stretch md:gap-0 md:py-8">
      <p className="font-display text-xl font-semibold md:mb-10">Inventario</p>
      <nav className="flex gap-1 md:flex-col">
        {items.map(({ href, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-white ${
                active ? "bg-white/15 text-white" : "text-white/65 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}/admin/`}
        target="_blank"
        rel="noreferrer"
        className="ml-auto text-sm text-white/65 hover:text-white focus-visible:outline-2 focus-visible:outline-white md:ml-0 md:mt-auto"
      >
        Admin de Django
      </a>
    </aside>
  );
}
