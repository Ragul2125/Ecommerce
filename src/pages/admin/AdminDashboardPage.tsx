import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Package, ShoppingCart } from "lucide-react"

export function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "Total Sellers", value: "45", icon: UserCheck, change: "+2%" },
    { title: "Total Products", value: "8,531", icon: Package, change: "+15%" },
    { title: "Total Orders", value: "432", icon: ShoppingCart, change: "+5%" },
  ]

  const recentOrders = [
    { id: "ORD-123", customer: "John Doe", total: "$120.00", status: "Delivered" },
    { id: "ORD-124", customer: "Jane Smith", total: "$45.50", status: "Processing" },
    { id: "ORD-125", customer: "Bob Johnson", total: "$89.99", status: "Shipped" },
  ]

  const recentProducts = [
    { id: "PRD-001", name: "Wireless Headphones", seller: "Tech Haven", price: "$199.99" },
    { id: "PRD-002", name: "Cotton T-Shirt", seller: "Apparel Co", price: "$24.99" },
    { id: "PRD-003", name: "Smart Watch", seller: "Gadget Plus", price: "$299.99" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 text-green-600">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Added Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.seller}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
