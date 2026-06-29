import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";
function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getOrders();
      setOrders(Array.isArray(data) ? data : (data.orders || []));
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelOrder = async (orderId) => {
    try {
      await orderService.cancelOrder(orderId);
      toast.success("Order cancelled successfully");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500/10 text-green-600 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
      case "shipped":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
      case "processing":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]";
      default:
        return "bg-muted/50 text-muted-foreground border-border/10";
    }
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  return <div className="flex flex-col gap-16 pb-40">
      <section className="px-6 pt-10">
         <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex flex-col gap-2"
  >
            <div className="flex items-center gap-3">
               <div className="h-1.5 w-1.5 rounded-full bg-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Logistics History</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tighter leading-none">Acquisition Archive.</h1>
         </motion.div>
      </section>
      <section className="px-6 flex-1">
        {orders.length === 0 ? <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center p-20 rounded-[4rem] bg-muted/10 border border-border/10 text-center"
  >
            <div className="h-24 w-24 rounded-full bg-muted/20 flex items-center justify-center mb-8">
              <Package className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-2xl font-black font-heading tracking-tight mb-2">Archive Vacant.</h3>
            <p className="text-xs text-muted-foreground font-medium max-w-[280px] leading-relaxed mx-auto mb-10">You have no established history of acquisitions within our catalog architecture.</p>
            <Button asChild className="rounded-full h-16 px-12 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-glow">
              <Link to="/products">Explore Catalog</Link>
            </Button>
          </motion.div> : <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="space-y-12"
  >
            {orders.map((order) => <motion.div
    key={order.id}
    variants={item}
    className="group rounded-[3.5rem] bg-white dark:bg-zinc-900 border border-border/10 overflow-hidden shadow-premium hover:shadow-glow transition-all duration-700"
  >
                <div className="bg-muted/10 px-10 py-8 flex flex-wrap items-center justify-between border-b border-border/10 gap-8">
                  <div className="flex gap-12">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Timestamp</p>
                      <p className="text-xs font-black uppercase tracking-widest">{new Date(order.created_at || order.date || new Date()).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Valuation</p>
                      <p className="text-xs font-black uppercase tracking-widest">₹{(order.total_amount || order.total || 0).toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">UID</p>
                      <p className="text-xs font-black uppercase tracking-widest text-primary">{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge variant="outline" className={cn("rounded-full px-6 py-2 text-[9px] font-black uppercase tracking-widest border-2", getStatusColor(order.status))}>
                      {order.status}
                    </Badge>
                    {(order.status === "PENDING" || order.status === "PROCESSING") && (
                       <Button variant="outline" size="sm" onClick={() => handleCancelOrder(order.id)} className="rounded-full px-6 h-10 text-[9px] font-black uppercase tracking-widest text-destructive hover:bg-destructive hover:text-white border-destructive transition-all">Cancel</Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-border/10 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500" asChild>
                      <Link to={`/orders/${order.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="p-10">
                  <ul className="space-y-8">
                    {order.items.map((item2, index) => <li key={index} className="flex items-center gap-8 group/item">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[2.5rem] p-1.5 border border-border/10 group-hover/item:border-primary/20 transition-all duration-500">
                           <div className="h-full w-full overflow-hidden rounded-[2rem]">
                              <img src={item2.product_image || item2.image} alt={item2.product_name || item2.name} className="h-full w-full object-cover group-hover/item:scale-110 transition-transform duration-700" />
                           </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-center space-y-1">
                          <h4 className="font-black text-sm uppercase tracking-tight">{item2.product_name || item2.name}</h4>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Artifact Unit x{item2.quantity}</p>
                        </div>
                        <div className="flex items-center">
                          <Button
    variant="outline"
    size="sm"
    className="rounded-full px-8 h-12 text-[9px] font-black uppercase tracking-widest border-border/10 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500"
    asChild
  >
                            <Link to={item2.product_id ? `/products/${item2.product_id}` : '/products'}>Reacquire</Link>
                          </Button>
                        </div>
                      </li>)}
                  </ul>
                </div>
              </motion.div>)}
          </motion.div>}
      </section>
    </div>;
}
export {
  OrderHistoryPage
};
