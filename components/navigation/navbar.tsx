import { Logo } from "../common/logo"
import { ModeToggle } from "../common/mode-toggle"
import { UserButton } from "../common/user-button"
import { NavRoutes } from "./nav-routes"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-3 border-b">
      <div className="flex items-center gap-9">
        <Logo />
        <NavRoutes />
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  )
}
