import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Search, Plus, Edit2, Trash2, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sellerService } from "@/features/seller/services/sellerService";
function SellerProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await sellerService.getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);
  useEffect(() => {
    let result = products;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    setFilteredProducts(result);
  }, [searchQuery, categoryFilter, products]);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const success = await sellerService.deleteProduct(id);
        if (success) {
          setProducts((prev) => prev.filter((p) => p.id !== id));
          toast.success("Product deleted successfully");
        }
      } catch (error) {
        console.error("Failed to delete product", error);
        toast.error("Failed to delete product");
      }
    }
  };
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  if (isLoading) {
    return <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
          <div className="h-12 w-32 bg-muted animate-pulse rounded-full" />
        </div>
        <div className="h-[400px] w-full bg-muted animate-pulse rounded-2xl" />
      </div>;
  }
  return <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-heading">Manage Products</h1>
          <p className="text-sm text-muted-foreground">Curate and configure your shop catalog.</p>
        </div>
        <Button asChild className="rounded-full h-12 px-6 bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider cursor-pointer">
          <Link to="/seller/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
    placeholder="Search products by name or description..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 h-12 rounded-2xl bg-muted/30 border-border/50 focus-visible:bg-background"
  />
        </div>
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => <button
    key={cat}
    onClick={() => setCategoryFilter(cat)}
    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${categoryFilter === cat ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border/50 text-muted-foreground hover:text-foreground"}`}
  >
                {cat}
              </button>)}
          </div>
        </div>
      </div>
      <div className="glass rounded-[2rem] overflow-hidden shadow-premium border border-border/40">
        {filteredProducts.length === 0 ? <div className="p-16 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg">No Products Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                Try searching for something else or add a new luxury item to your collection.
              </p>
            </div>
          </div> : <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <th className="p-6">Product</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Price</th>
                  <th className="p-6">Stock</th>
                  <th className="p-6">Rating</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredProducts.map((p) => <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl overflow-hidden border border-border/20 bg-muted shrink-0 shadow-sm">
                          <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-sm">{p.name}</h4>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">{p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-xs font-semibold text-muted-foreground">{p.category}</td>
                    <td className="p-6">
                      {p.salePrice ? <div className="flex flex-col">
                          <span className="font-black text-sm">₹{p.salePrice.toLocaleString()}</span>
                          <span className="text-[10px] text-muted-foreground line-through">₹{p.price.toLocaleString()}</span>
                        </div> : <span className="font-black text-sm">₹{p.price.toLocaleString()}</span>}
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wide ${p.inStock ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-6 text-xs font-bold">{p.rating} ⭐ <span className="text-muted-foreground font-medium">({p.reviewCount})</span></td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                          <Link to={`/seller/products/edit/${p.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
    onClick={() => handleDelete(p.id)}
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
  >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
    </div>;
}
export {
  SellerProductsPage
};
