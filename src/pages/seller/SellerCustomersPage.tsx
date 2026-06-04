import { useEffect, useState } from "react"
import { Users, Search, Mail, Calendar, TrendingUp } from "lucide-react"

import { Input } from "@/components/ui/input"
import { sellerService } from "@/features/seller/services/sellerService"

interface Customer {
  id: string
  name: string
  email: string
  totalOrders: number
  totalSpend: number
  status: string
  joined: string
}

export function SellerCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await sellerService.getCustomers()
        setCustomers(data)
        setFilteredCustomers(data)
      } catch (error) {
        console.error("Failed to load customers", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCustomers()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers)
    } else {
      const q = searchQuery.toLowerCase()
      setFilteredCustomers(customers.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)))
    }
  }, [searchQuery, customers])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
        <div className="h-12 w-64 bg-muted animate-pulse rounded-full" />
        <div className="h-[400px] w-full bg-muted animate-pulse rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight font-heading">Active Customers</h1>
        <p className="text-sm text-muted-foreground">Monitor loyal shoppers and total spending logs.</p>
      </div>

      {/* Toolbar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by customer name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 rounded-2xl bg-muted/30 border-border/50 focus-visible:bg-background"
        />
      </div>

      {/* Customer List Card Grid & Table */}
      <div className="glass rounded-[2rem] overflow-hidden border border-border/40 shadow-premium">
        {filteredCustomers.length === 0 ? (
          <div className="p-16 text-center space-y-4 bg-background/50">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg">No Customers Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                Try refining your search query.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-background/50">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <th className="p-6">Customer Name</th>
                  <th className="p-6">Contact Email</th>
                  <th className="p-6">Joined Date</th>
                  <th className="p-6">Total Orders</th>
                  <th className="p-6">Total Spend</th>
                  <th className="p-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full border border-border/20 overflow-hidden bg-primary/10 text-primary font-black text-xs flex items-center justify-center">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-black text-sm">{c.name}</h4>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">{c.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {c.email}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {c.joined}
                      </div>
                    </td>
                    <td className="p-6 text-xs font-bold text-foreground pl-12">{c.totalOrders}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-1 font-black text-sm text-foreground">
                        <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                        ₹{c.totalSpend.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                        c.status === "Active" 
                          ? "bg-green-500/10 text-green-600" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
