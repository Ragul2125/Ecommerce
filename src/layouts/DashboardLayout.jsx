import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function DashboardLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Overview", href: "/seller/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/seller/products", icon: Package },
    { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
    { name: "Customers", href: "/seller/customers", icon: Users },
    { name: "Analytics", href: "/seller/analytics", icon: BarChart3 },
    { name: "Settings", href: "/seller/settings", icon: Settings }
  ];
  return <div className="flex min-h-screen bg-muted/20">
      {
    /* Sidebar */
  }
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-bold font-heading">E</span>
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Seller Hub
            </span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-4 text-sm font-medium">
            {navItems.map((item) => {
    const isActive = location.pathname === item.href;
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
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Seller" />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col truncate">
              <span className="text-sm font-medium">Seller Name</span>
              <span className="truncate text-xs text-muted-foreground">seller@premium.com</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
      
      {
    /* Main Content */
  }
      <div className="flex flex-1 flex-col">
        {
    /* Top Header */
  }
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="cursor-pointer">
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-heading font-bold">Seller Hub</span>
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
        
        {
    /* Page Content */
  }
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {
    /* Mobile Drawer Navigation Overlay */
  }
      {isMobileMenuOpen && <div className="fixed inset-0 z-[200] flex md:hidden">
          {
    /* Backdrop */
  }
          <div
    className="fixed inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
    onClick={() => setIsMobileMenuOpen(false)}
  />
          {
    /* Drawer Panel */
  }
          <aside className="relative flex w-64 flex-col bg-background border-r p-4 animate-in slide-in-from-left duration-300">
            <div className="flex h-16 items-center justify-between px-2 mb-4 border-b">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="font-bold font-heading">E</span>
                </div>
                <span className="font-heading text-xl font-bold tracking-tight">
                  Seller Hub
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
    const isActive = location.pathname === item.href;
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
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Seller" />
                  <AvatarFallback>SL</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col truncate">
                  <span className="text-sm font-medium">Seller Name</span>
                  <span className="truncate text-xs text-muted-foreground">seller@premium.com</span>
                </div>
              </div>
            </div>
          </aside>
        </div>}

      {
    /* Mobile-Only Viewport Blocking Screen */
  }
      <div className="fixed inset-0 z-[300] bg-background flex flex-col items-center justify-center p-8 text-center md:hidden animate-in fade-in duration-300">
        <div className="max-w-xs space-y-6">
          <div className="h-16 w-16 mx-auto rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
            <Monitor className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading font-black text-xl uppercase tracking-tight">Desktop Viewport Required</h2>
            <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
              The Seller Hub and boutique curation tools are optimized for desktop displays. Please use a computer or laptop.
            </p>
          </div>
          <Button asChild className="rounded-full h-12 px-6 bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider w-full cursor-pointer mt-4">
            <Link to="/">Return to Customer Store</Link>
          </Button>
        </div>
      </div>
    </div>;
}
export {
  DashboardLayout
};
