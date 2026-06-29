import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  FolderTree,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Sellers", href: "/admin/sellers", icon: UserCheck },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart }
  ];
  const handleLogout = () => {
    navigate("/auth/login");
  };
  return <div className="flex min-h-screen bg-muted/20">
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-bold font-heading">E</span>
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Admin Portal
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-4 text-sm font-medium">
            {navItems.map((item) => {
    const isActive = location.pathname.startsWith(item.href);
    return <Link
      key={item.href}
      to={item.href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
    >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>;
  })}
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=admin" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col truncate">
              <span className="text-sm font-medium">Administrator</span>
              <span className="truncate text-xs text-muted-foreground">admin@ecommerce.com</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="cursor-pointer">
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-heading font-bold">Admin Portal</span>
          </div>
          <div className="hidden flex-1 items-center gap-4 md:flex">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
    type="search"
    placeholder="Search..."
    className="w-full rounded-full bg-muted/50 pl-9 border-transparent focus-visible:bg-background focus-visible:border-primary"
  />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-destructive" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      {isMobileMenuOpen && <div className="fixed inset-0 z-[200] flex md:hidden">
          <div
    className="fixed inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
    onClick={() => setIsMobileMenuOpen(false)}
  />
          <aside className="relative flex w-64 flex-col bg-background border-r p-4 animate-in slide-in-from-left duration-300">
            <div className="flex h-16 items-center justify-between px-2 mb-4 border-b">
              <Link to="/admin/dashboard" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="font-bold font-heading">E</span>
                </div>
                <span className="font-heading text-xl font-bold tracking-tight">
                  Admin Portal
                </span>
              </Link>
              <Button
    variant="ghost"
    size="icon"
    onClick={() => setIsMobileMenuOpen(false)}
    className="rounded-full h-8 w-8 cursor-pointer"
  >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2 text-sm font-medium">
                {navItems.map((item) => {
    const isActive = location.pathname.startsWith(item.href);
    return <Link
      key={item.href}
      to={item.href}
      onClick={() => setIsMobileMenuOpen(false)}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>;
  })}
              </nav>
            </div>
            <div className="border-t p-2 mt-auto">
              <div className="flex items-center gap-3 rounded-lg p-2">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=admin" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col truncate">
                  <span className="text-sm font-medium">Administrator</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>
        </div>}
    </div>;
}
export {
  AdminLayout
};
