import { useState } from "react"
import { Search, ShieldBan, ShieldCheck, UserCheck } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type MockSeller = {
  id: string
  name: string
  email: string
  company: string
  status: "Active" | "Suspended"
  productsCount: number
}

const initialSellers: MockSeller[] = [
  { id: "SEL-001", name: "David Wilson", email: "david@techhaven.com", company: "Tech Haven", status: "Active", productsCount: 142 },
  { id: "SEL-002", name: "Emma Brown", email: "emma@apparelco.com", company: "Apparel Co", status: "Active", productsCount: 89 },
  { id: "SEL-003", name: "Frank Miller", email: "frank@gadgetplus.com", company: "Gadget Plus", status: "Suspended", productsCount: 12 },
]

export function AdminSellersPage() {
  const [sellers, setSellers] = useState<MockSeller[]>(initialSellers)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSellers = sellers.filter(seller => 
    seller.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    seller.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleStatus = (id: string) => {
    setSellers(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === "Active" ? "Suspended" : "Active"
        toast.success(`Seller ${newStatus.toLowerCase()} successfully`)
        return { ...s, status: newStatus }
      }
      return s
    }))
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-heading">Manage Sellers</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage merchant accounts.</p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sellers by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-2xl bg-muted/30 border-border/50 focus-visible:bg-background"
          />
        </div>
      </div>

      {/* Sellers List */}
      <div className="glass rounded-[2rem] overflow-hidden shadow-premium border border-border/40 bg-card">
        {filteredSellers.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground mx-auto">
              <UserCheck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg">No Sellers Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                Try searching for something else.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <th className="p-6">Seller</th>
                  <th className="p-6">Company</th>
                  <th className="p-6">Products</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="font-bold">{seller.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{seller.name}</h4>
                          <span className="text-[10px] font-mono text-muted-foreground">{seller.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-sm font-medium">{seller.company}</td>
                    <td className="p-6 text-sm text-muted-foreground">{seller.productsCount} items</td>
                    <td className="p-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                        seller.status === "Active" 
                          ? "bg-green-500/10 text-green-600" 
                          : "bg-orange-500/10 text-orange-600"
                      }`}>
                        {seller.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <Button 
                        onClick={() => toggleStatus(seller.id)} 
                        variant="ghost" 
                        size="sm"
                        className={`rounded-full text-xs font-bold ${
                          seller.status === "Active" 
                            ? "text-orange-600 hover:text-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30" 
                            : "text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/30"
                        }`}
                      >
                        {seller.status === "Active" ? (
                          <><ShieldBan className="mr-2 h-3 w-3" /> Suspend</>
                        ) : (
                          <><ShieldCheck className="mr-2 h-3 w-3" /> Activate</>
                        )}
                      </Button>
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
