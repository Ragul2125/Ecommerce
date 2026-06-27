import { useNavigate } from "react-router-dom";
import { Bell, ShoppingBag, Tag, Info, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const mockNotifications = [
  {
    id: "1",
    title: "Order Delivered",
    message: "Your order #SH1234 has been successfully delivered. We hope you love your new style!",
    time: "2h ago",
    type: "order",
    isRead: false
  },
  {
    id: "2",
    title: "Sale Alert: 20% OFF",
    message: "New season styles are now 20% off. Grab your minimalist essentials before they're gone.",
    time: "5h ago",
    type: "promo",
    isRead: false
  },
  {
    id: "3",
    title: "Welcome to Shoppe",
    message: "Thanks for joining us! Start exploring our curated collections of premium minimalist fashion.",
    time: "1d ago",
    type: "system",
    isRead: true
  }
];
function NotificationsPage() {
  const navigate = useNavigate();
  return <div className="flex flex-col gap-6 pb-24">
      {
    /* Header */
  }
      <section className="px-4 pt-6 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Button
    variant="ghost"
    size="icon"
    className="rounded-full bg-muted/50"
    onClick={() => navigate(-1)}
  >
               <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-black font-heading leading-tight">Inbox</h1>
         </div>
         <button className="text-[10px] font-black uppercase tracking-widest text-primary">Mark all as read</button>
      </section>

      {
    /* Categories */
  }
      <section className="px-4 flex gap-4 overflow-x-auto no-scrollbar">
         {["All", "Orders", "Promotions", "System"].map((cat, i) => <Button
    key={i}
    variant={i === 0 ? "default" : "outline"}
    size="sm"
    className="rounded-full px-6 h-10 font-bold whitespace-nowrap"
  >
               {cat}
            </Button>)}
      </section>

      {
    /* List */
  }
      <section className="px-0 flex-1 space-y-1">
        {mockNotifications.map((n) => <div
    key={n.id}
    className={cn(
      "flex items-start gap-4 p-5 transition-colors active:bg-muted/30 border-b border-transparent",
      !n.isRead && "bg-primary/5 border-primary/10"
    )}
  >
             <div className={cn(
    "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
    n.type === "order" && "bg-blue-100 text-blue-600",
    n.type === "promo" && "bg-pink-100 text-pink-600",
    n.type === "system" && "bg-gray-100 text-gray-600"
  )}>
                {n.type === "order" && <ShoppingBag className="h-5 w-5" />}
                {n.type === "promo" && <Tag className="h-5 w-5" />}
                {n.type === "system" && <Info className="h-5 w-5" />}
             </div>
             
             <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                   <h3 className={cn("text-sm tracking-tight", n.isRead ? "font-bold" : "font-black")}>
                     {n.title}
                   </h3>
                   <span className="text-[10px] font-bold text-muted-foreground uppercase">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 pr-4">{n.message}</p>
             </div>
             
             {!n.isRead && <div className="h-2 w-2 rounded-full bg-primary mt-1" />}
          </div>)}
      </section>

      {
    /* Empty State Suggestion if none */
  }
      {mockNotifications.length === 0 && <div className="flex flex-col items-center justify-center pt-24 space-y-4 px-10 text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
               <Bell className="h-10 w-10 text-muted-foreground opacity-20" />
            </div>
            <h2 className="text-lg font-bold">All caught up!</h2>
            <p className="text-xs text-muted-foreground">We'll notify you here about orders, stock updates, and exclusive promos.</p>
         </div>}
    </div>;
}
export {
  NotificationsPage
};
