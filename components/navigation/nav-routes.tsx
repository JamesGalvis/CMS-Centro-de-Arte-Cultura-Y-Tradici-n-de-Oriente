"use client"

import { navRoutes } from "@/constants"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

export function NavRoutes() {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <ul className="flex items-center gap-5">
      {navRoutes.map(({ label, href }) => {
        const isActive =
          (pathname === "/" && href === "/") ||
          pathname === href
          // || pathname.startsWith(href)

        return (
          <li
            key={href}
            onClick={() => handleClick(href)}
            className={cn(
              "font-medium text-muted-foreground cursor-pointer hover:text-primary transition",
              isActive && "text-primary"
            )}
          >
            {label}
          </li>
        )
      })}
    </ul>
  )
}
