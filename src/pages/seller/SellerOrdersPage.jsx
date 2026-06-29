import { useEffect, useState } from "react";
import { ShoppingCart, Eye, CheckCircle2, Truck, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { sellerService } from "@/features/seller/services/sellerService";
function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await sellerService.getOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("Failed to load orders", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, []);
  useEffect(() => {
    if (activeTab === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status === activeTab));
    }
  }, [activeTab, orders]);
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await sellerService.updateOrderStatus(id, newStatus);
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o));
      if (selectedOrder?.id === id) {
        setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null);
      }
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status");
    }
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Shipped":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Processing":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border/50";
    }
  };
  const tabs = ["All", "Processing", "Shipped", "Completed", "Cancelled"];
  if (isLoading) {
    return <div className="space-y-6">
        <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
        <div className="h-12 w-96 bg-muted animate-pulse rounded-full" />
        <div className="h-[400px] w-full bg-muted animate-pulse rounded-2xl" />
      </div>;
  }
  return <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight font-heading">Manage Orders</h1>
        <p className="text-sm text-muted-foreground">Fulfill, ship, and coordinate client deliveries.</p>
      </div>
      <div className="flex border-b border-border/50 overflow-x-auto no-scrollbar gap-8">
        {tabs.map((tab) => {
    const count = tab === "All" ? orders.length : orders.filter((o) => o.status === tab).length;
    return <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`pb-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 shrink-0 cursor-pointer ${activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
    >
              {tab} <span className="ml-1 text-[10px] opacity-60">({count})</span>
            </button>;
  })}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-[2rem] overflow-hidden border border-border/40 shadow-premium">
            {filteredOrders.length === 0 ? <div className="p-16 text-center space-y-4 bg-background/50">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-lg">No Orders Curated</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                    Orders will appear here once customers checkout from your boutique.
                  </p>
                </div>
              </div> : <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-background/50">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                      <th className="p-6">Order ID</th>
                      <th className="p-6">Client</th>
                      <th className="p-6">Date</th>
                      <th className="p-6">Total</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {filteredOrders.map((order) => <tr
    key={order.id}
    onClick={() => setSelectedOrder(order)}
    className={`hover:bg-muted/10 transition-colors cursor-pointer ${selectedOrder?.id === order.id ? "bg-muted/20" : ""}`}
  >
                        <td className="p-6 font-black text-sm">{order.id}</td>
                        <td className="p-6 text-xs font-semibold text-foreground">{order.customer}</td>
                        <td className="p-6 text-xs text-muted-foreground font-medium">{order.date}</td>
                        <td className="p-6 font-black text-sm">₹{order.total.toLocaleString()}</td>
                        <td className="p-6">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${getStatusStyle(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <Button
    variant="ghost"
    size="icon"
    onClick={() => setSelectedOrder(order)}
    className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
  >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>}
          </div>
        </div>
        <div className="space-y-4">
          {selectedOrder ? <div className="glass rounded-[2rem] border border-border/40 p-6 shadow-premium space-y-6 bg-background/50 animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="font-heading font-black text-lg uppercase tracking-tight">{selectedOrder.id}</h3>
                  <span className="text-[10px] text-muted-foreground font-medium">{selectedOrder.date}</span>
                </div>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${getStatusStyle(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Curated Pieces</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, i) => <div key={i} className="flex justify-between items-start text-xs">
                      <div>
                        <p className="font-bold text-foreground leading-tight">{item.name}</p>
                        <span className="text-[10px] text-muted-foreground font-medium">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>)}
                </div>
                <div className="border-t pt-4 flex justify-between items-center font-black text-sm">
                  <span>Grand Total</span>
                  <span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-2 border-t pt-4">
                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Customer Profile</h4>
                <p className="text-xs font-bold text-foreground">{selectedOrder.customer}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  12, Crescent Road, Bangalore, Karnataka - 560001, India
                </p>
              </div>
              {selectedOrder.status !== "Cancelled" && <div className="space-y-2 border-t pt-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">Dispatch Logistics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedOrder.status === "Processing" && <Button
    onClick={() => handleStatusUpdate(selectedOrder.id, "Shipped")}
    className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-wider flex items-center justify-center cursor-pointer"
  >
                        <Truck className="mr-2 h-3.5 w-3.5" /> Ship Order
                      </Button>}
                    {selectedOrder.status === "Shipped" && <Button
    onClick={() => handleStatusUpdate(selectedOrder.id, "Completed")}
    className="w-full h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-[10px] uppercase tracking-wider flex items-center justify-center cursor-pointer"
  >
                        <CheckCircle2 className="mr-2 h-3.5 w-3.5" /> Complete
                      </Button>}
                    {selectedOrder.status !== "Completed" && <Button
    onClick={() => handleStatusUpdate(selectedOrder.id, "Cancelled")}
    variant="outline"
    className="w-full h-11 rounded-xl border-2 text-destructive hover:bg-destructive/10 hover:text-destructive font-black text-[10px] uppercase tracking-wider flex items-center justify-center cursor-pointer"
  >
                        <XCircle className="mr-2 h-3.5 w-3.5" /> Cancel Order
                      </Button>}
                  </div>
                </div>}
            </div> : <div className="p-8 border border-dashed rounded-[2rem] text-center text-muted-foreground bg-muted/10 h-full flex flex-col items-center justify-center gap-2 border-border/50">
              <Eye className="h-8 w-8 opacity-40 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Select an order to inspect details.</span>
            </div>}
        </div>
      </div>
    </div>;
}
export {
  SellerOrdersPage
};
