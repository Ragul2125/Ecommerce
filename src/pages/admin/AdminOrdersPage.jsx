import { useState } from "react";
import { Search, ShoppingCart, Eye, Edit2, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
const initialOrders = [
  { id: "ORD-501", customer: "Alice Johnson", date: "2026-06-18", total: 120.5, status: "Delivered", items: 2 },
  { id: "ORD-502", customer: "Bob Smith", date: "2026-06-19", total: 45, status: "Processing", items: 1 },
  { id: "ORD-503", customer: "Charlie Davis", date: "2026-06-20", total: 299.99, status: "Pending", items: 1 },
  { id: "ORD-504", customer: "Diana Prince", date: "2026-06-20", total: 89.95, status: "Shipped", items: 3 }
];
function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("Pending");
  const statuses = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const handleUpdateStatus = () => {
    if (!editOrder) return;
    setOrders(orders.map((o) => o.id === editOrder.id ? { ...o, status: newStatus } : o));
    toast.success(`Order status updated to ${newStatus}`);
    setEditOrder(null);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/10 text-green-600";
      case "Shipped":
        return "bg-blue-500/10 text-blue-600";
      case "Processing":
        return "bg-orange-500/10 text-orange-600";
      case "Cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  return <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-heading">Manage Orders</h1>
          <p className="text-sm text-muted-foreground">Monitor and update customer orders.</p>
        </div>
      </div>

      {
    /* Filters Toolbar */
  }
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
    placeholder="Search orders by ID or customer..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 h-12 rounded-2xl bg-muted/30 border-border/50 focus-visible:bg-background"
  />
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => <button
    key={status}
    onClick={() => setStatusFilter(status)}
    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${statusFilter === status ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border/50 text-muted-foreground hover:text-foreground"}`}
  >
                {status}
              </button>)}
          </div>
        </div>
      </div>

      {
    /* Orders List */
  }
      <div className="glass rounded-[2rem] overflow-hidden shadow-premium border border-border/40 bg-card">
        {filteredOrders.length === 0 ? <div className="p-16 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground mx-auto">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg">No Orders Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          </div> : <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <th className="p-6">Order ID</th>
                  <th className="p-6">Customer</th>
                  <th className="p-6">Date</th>
                  <th className="p-6">Items</th>
                  <th className="p-6">Total</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredOrders.map((order) => <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-6">
                      <span className="font-mono font-bold text-sm">{order.id}</span>
                    </td>
                    <td className="p-6 text-sm font-medium">{order.customer}</td>
                    <td className="p-6 text-sm text-muted-foreground">{order.date}</td>
                    <td className="p-6 text-sm text-muted-foreground">{order.items}</td>
                    <td className="p-6 text-sm font-bold">₹{order.total.toLocaleString()}</td>
                    <td className="p-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
    onClick={() => setViewOrder(order)}
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
    title="View Details"
  >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
    onClick={() => {
      setEditOrder(order);
      setNewStatus(order.status);
    }}
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
    title="Update Status"
  >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>

      {
    /* View Order Modal */
  }
      <Dialog open={!!viewOrder} onOpenChange={(open) => !open && setViewOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Overview of order {viewOrder?.id}</DialogDescription>
          </DialogHeader>
          {viewOrder && <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium">{viewOrder.customer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{viewOrder.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <span className={`inline-flex mt-1 items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${getStatusColor(viewOrder.status)}`}>
                    {viewOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-bold">₹{viewOrder.total.toLocaleString()}</p>
                </div>
              </div>
            </div>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOrder(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {
    /* Edit Status Modal */
  }
      <Dialog open={!!editOrder} onOpenChange={(open) => !open && setEditOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>Change the status for {editOrder?.id}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <select
    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    value={newStatus}
    onChange={(e) => setNewStatus(e.target.value)}
  >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOrder(null)}>Cancel</Button>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}
export {
  AdminOrdersPage
};
