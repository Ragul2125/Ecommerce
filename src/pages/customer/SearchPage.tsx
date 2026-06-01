import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, X, ArrowLeft, TrendingUp, History, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/shared/ProductCard"
import type { Product } from "@/utils/mockData"
import { productService } from "@/features/products/services/productService"

export function SearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches] = useState(["Minimalist Suit", "Leather Watch", "Silk Dress"])
  const [trending] = useState(["Denim Jacket", "Summer Dress", "Oversized Hoodie"])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setIsSearching(true)
        try {
          const data = await productService.getProducts({ search: query })
          setResults(data)
        } catch (error) {
          console.error("Search failed", error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Search Header */}
      <section className="px-4 pt-6 space-y-4">
        <div className="flex items-center gap-3">
           <Button 
             variant="ghost" 
             size="icon" 
             className="rounded-full bg-muted/50"
             onClick={() => navigate(-1)}
           >
              <ArrowLeft className="h-5 w-5" />
           </Button>
           <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                 autoFocus
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder="Search for items..."
                 className="h-14 pl-12 pr-12 rounded-full bg-muted/30 border-none font-bold placeholder:font-medium tracking-tight focus-visible:ring-primary"
              />
              {query && (
                <button 
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted/80 flex items-center justify-center"
                >
                   <X className="h-3 w-3" />
                </button>
              )}
           </div>
        </div>
      </section>

      <section className="px-4 flex-1">
        {!query && (
          <div className="space-y-10">
            {/* Recent Searches */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                     <History className="h-3 w-3" /> Recent Searches
                  </h2>
                  <button className="text-[10px] font-bold text-primary">Clear</button>
               </div>
               <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setQuery(s)}
                      className="rounded-full border-muted text-xs font-bold px-4 h-9"
                    >
                      {s}
                    </Button>
                  ))}
               </div>
            </div>

            {/* Trending Now */}
            <div className="space-y-4">
               <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" /> Trending Now
               </h2>
               <div className="space-y-2">
                  {trending.map((t, i) => (
                    <div 
                      key={i} 
                      onClick={() => setQuery(t)}
                      className="flex items-center justify-between p-4 rounded-[1.5rem] bg-muted/20 active:bg-muted/40 transition-colors"
                    >
                       <span className="text-sm font-bold tracking-tight">{t}</span>
                       <ArrowLeft className="h-4 w-4 rotate-135 opacity-30" />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {query && (
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {isSearching ? "Searching..." : `${results.length} results found`}
                 </p>
                 <Button variant="ghost" size="sm" className="h-8 rounded-full flex items-center gap-2 text-[10px] font-black uppercase border">
                    <Filter className="h-3 w-3" /> Filter
                 </Button>
              </div>

              {results.length > 0 ? (
                 <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
                    {results.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                 </div>
              ) : !isSearching && (
                 <div className="py-20 text-center space-y-2">
                    <p className="text-lg font-bold">No results found for "{query}"</p>
                    <p className="text-sm text-muted-foreground">Try checking your spelling or using more general terms.</p>
                 </div>
              )}
           </div>
        )}
      </section>
    </div>
  )
}
