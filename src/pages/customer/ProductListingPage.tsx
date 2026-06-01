import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { productService } from "@/features/products/services/productService"
import type { Product, Category } from "@/utils/mockData"
import { ProductCard } from "@/components/shared/ProductCard"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categorySlug = searchParams.get("category")
  
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [prods, cats] = await Promise.all([
          productService.getProducts(categorySlug ? { category: categorySlug } : undefined),
          productService.getCategories()
        ])
        setProducts(prods)
        setCategories(cats)
      } catch (error) {
        console.error("Failed to load products", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [categorySlug])

  const handleCategorySelect = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug })
    } else {
      setSearchParams({})
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col gap-10 pb-32">
      {/* 1. Curated Header & Category Filter */}
      <section className="px-6 pt-10 space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
           <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl font-black font-heading leading-[0.9] tracking-tighter">
                {categorySlug 
                  ? categories.find(c => c.slug === categorySlug)?.name || "Collection"
                  : "All Signatures."
                }
              </h1>
              <div className="flex items-center gap-3">
                 <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                   {categorySlug ? `Exploring ${categorySlug}` : "Discover the collective library"}
                 </p>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/80 border border-border/10 px-4 py-2 rounded-full">
                 {products.length} Artifacts
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-12 w-12 border-border/10 bg-white dark:bg-zinc-800 shadow-premium hover:scale-105 active:scale-95 transition-all"
              >
                 <Filter className="h-4 w-4" />
              </Button>
           </div>
        </motion.div>

        {/* Horizontal Category Navigation */}
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar mask-fade-right">
          <Button 
            variant={!categorySlug ? "default" : "outline"} 
            className={cn(
               "rounded-full px-8 h-12 text-[10px] font-black uppercase tracking-widest transition-all",
               !categorySlug ? "shadow-glow" : "border-border/10 opacity-60 hover:opacity-100"
            )}
            onClick={() => handleCategorySelect(null)}
          >
            All Collective
          </Button>
          {categories.map(cat => (
            <Button 
              key={cat.id}
              variant={categorySlug === cat.slug ? "default" : "outline"} 
              className={cn(
                "rounded-full px-8 h-12 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                categorySlug === cat.slug ? "shadow-glow" : "border-border/10 opacity-60 hover:opacity-100"
              )}
              onClick={() => handleCategorySelect(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </section>

      {/* 2. Intelligent Product Grid */}
      <section className="px-6 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
            >
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col gap-6">
                  <Skeleton className="aspect-[4/5] w-full rounded-[3rem]" />
                  <div className="space-y-3 px-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-[400px] flex-col items-center justify-center rounded-[4rem] bg-muted/20 border border-border/10 p-12 text-center"
            >
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                 <Filter className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <h2 className="text-2xl font-black font-heading tracking-tight mb-2">No Artifacts Found.</h2>
              <p className="text-xs text-muted-foreground font-medium max-w-[240px] leading-relaxed mx-auto mb-8">
                 Your current selection criteria returned no results from our collective.
              </p>
              <Button 
                onClick={() => handleCategorySelect(null)} 
                className="rounded-full px-10 h-14 bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-xl"
              >
                 Reset Selection
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. Subtle Pagination / Load More (Placeholder) */}
      {!isLoading && products.length > 0 && (
         <div className="flex justify-center pt-20">
            <Button 
              variant="outline" 
              className="rounded-full px-12 h-16 border-border/20 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
            >
               Load More Artifacts
            </Button>
         </div>
      )}
    </div>
  )
}
