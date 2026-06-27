import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, User, Moon, Sun, Search, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
function Navbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const cartCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };
  return <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-border/30 bg-background/80 backdrop-blur-2xl transition-all duration-500 pt-[env(safe-area-inset-top,0px)]">
      <div className="container mx-auto px-4">
        {
    /* Main Header Row */
  }
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {
    /* Logo */
  }
            <Link to="/" className="flex items-center gap-3 active:scale-95 transition-all">
              <div className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                <span className="font-heading text-lg md:text-xl font-black italic">S</span>
              </div>
              <span className="hidden xs:block font-heading text-xl md:text-2xl font-black tracking-tighter uppercase italic">
                ShopFlow
              </span>
            </Link>
          </div>

          {
    /* Search - Desktop Only */
  }
          <div className="hidden md:block flex-1 max-w-xl mx-12">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
               <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={handleSearch}
    placeholder="Search curated styles..."
    className="h-12 w-full rounded-full bg-muted/30 border-2 border-transparent pl-12 pr-6 text-sm font-bold focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300"
  />
            </div>
          </div>

          {
    /* Desktop Right Actions */
  }
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-8 mr-4">
              <Link to="/categories" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-colors pointer-events-auto">Logistics</Link>
            </nav>

            <div className="h-6 w-px bg-border/30" />

            <Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="h-10 w-10 rounded-full hover:bg-primary/5 transition-all active:scale-90"
  >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/5 transition-all">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-[2rem] p-4 shadow-2xl border-border/30 backdrop-blur-3xl">
                <div className="px-2 py-4 space-y-1">
                   <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Premium Session</p>
                   <h4 className="text-sm font-black font-heading tracking-tight">Identity Vault</h4>
                </div>
                <DropdownMenuSeparator className="opacity-10 my-2" />
                <DropdownMenuItem className="rounded-xl h-11 focus:bg-primary focus:text-white cursor-pointer" asChild>
                  <Link to="/auth/login" className="w-full font-bold">Authenticate</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl h-11 focus:bg-primary focus:text-white cursor-pointer" asChild>
                  <Link to="/auth/signup" className="w-full font-bold">Register Identity</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-full bg-muted/20 hover:bg-primary/10 transition-all">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary border-2 border-background text-[8px] font-black">
                    {wishlistCount}
                  </Badge>}
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-full bg-muted/20 hover:bg-primary/10 transition-all">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary border-2 border-background text-[8px] font-black">
                    {cartCount}
                  </Badge>}
              </Button>
            </Link>
          </div>

          {
    /* Mobile Right Actions - Focused & Simple */
  }
          <div className="flex md:hidden items-center gap-1">
              <Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="h-10 w-10 rounded-full hover:bg-primary/5 transition-all active:scale-90"
  >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
    variant="ghost"
    size="icon"
    onClick={() => navigate("/search")}
    className="h-10 w-10 rounded-full hover:bg-primary/5 transition-all active:scale-90"
  >
                <Search className="h-4 w-4" />
              </Button>
          </div>
        </div>
      </div>
    </header>;
}
export {
  Navbar
};
