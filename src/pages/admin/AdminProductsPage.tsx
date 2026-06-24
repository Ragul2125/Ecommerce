import { useState } from "react"
import { Search, Package, Trash2, ShieldBan, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type MockProduct = {
  id: string
  name: string
  seller: string
  price: number
  category: string
  status: "Active" | "Disabled"
}

const initialProducts: MockProduct[] = [
  { id: "PRD-101", name: "Premium Wireless Headphones", seller: "Tech Haven", price: 299.99, category: "Electronics", status: "Active" },
  { id: "PRD-102", name: "Minimalist Cotton T-Shirt", seller: "Apparel Co", price: 29.99, category: "Clothing", status: "Active" },
  { id: "PRD-103", name: "Smart Home Hub", seller: "Tech Haven", price: 149.50, category: "Electronics", status: "Disabled" },
]

export function AdminProductsPage() {
  const [products, setProducts] = useState<MockProduct[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.seller.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newStatus = p.status === "Active" ? "Disabled" : "Active"
        toast.success(`Product ${newStatus.toLowerCase()} successfully`)
        return { ...p, status: newStatus }
      }
      return p
    }))
  }

  const handleDelete = () => {
    if (!deleteId) return
    setProducts(prev => prev.filter(p => p.id !== deleteId))
    toast.success("Product deleted successfully")
    setDeleteId(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-heading">Moderate Products</h1>
          <p className="text-sm text-muted-foreground">Review and manage all products across the site.</p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products by name or seller..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-2xl bg-muted/30 border-border/50 focus-visible:bg-background"
          />
        </div>
      </div>

      {/* Products List */}
      <div className="glass rounded-[2rem] overflow-hidden shadow-premium border border-border/40 bg-card">
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground mx-auto">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg">No Products Found</h3>
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
                  <th className="p-6">Product</th>
                  <th className="p-6">Seller</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Price</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{product.name}</h4>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">{product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-sm font-medium">{product.seller}</td>
                    <td className="p-6 text-sm text-muted-foreground">{product.category}</td>
                    <td className="p-6 text-sm font-bold">₹{product.price.toLocaleString()}</td>
                    <td className="p-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${
                        product.status === "Active" 
                          ? "bg-green-500/10 text-green-600" 
                          : "bg-orange-500/10 text-orange-600"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          onClick={() => toggleStatus(product.id)} 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
                          title={product.status === "Active" ? "Disable Product" : "Enable Product"}
                        >
                          {product.status === "Active" ? <ShieldBan className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                        </Button>
                        <Button 
                          onClick={() => setDeleteId(product.id)} 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? It will be removed from the seller's catalog and the storefront.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
