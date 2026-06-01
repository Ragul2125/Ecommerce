import { Link, useLocation } from "react-router-dom"
import { Home, LayoutGrid, ShoppingBag, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const location = useLocation()
  
  const navItems = [
    { icon: Home, path: "/" },
    { icon: Heart, path: "/wishlist" },
    { icon: LayoutGrid, path: "/categories" },
    { icon: ShoppingBag, path: "/cart" },
    { icon: User, path: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[101] flex h-20 items-center justify-around border-t border-white/5 bg-background/60 backdrop-blur-2xl px-4 pb-4 md:hidden">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "relative flex flex-col items-center justify-center p-2 transition-all duration-300",
              isActive ? "text-primary active:scale-90" : "text-muted-foreground/60 hover:text-primary/60"
            )}
          >
            <item.icon className={cn("h-7 w-7 transition-all", isActive && "stroke-[2.5px]")} />
            
            {/* Active Dash Indicator */}
            {isActive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-primary animate-in fade-in zoom-in duration-300" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
