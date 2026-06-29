import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, ChevronRight, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { productService } from "@/features/products/services/productService";
import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [tempSort, setTempSort] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setPage(1);
      try {
        const query = { page: 1, limit: 12 };
        if (categorySlug) query.category = categorySlug;
        if (minPrice) query.minPrice = minPrice;
        if (maxPrice) query.maxPrice = maxPrice;
        if (sort) query.sort = sort;
        const [prodsData, cats] = await Promise.all([
          productService.getProducts(query),
          productService.getCategories()
        ]);
        const prods = prodsData.products ? prodsData.products : prodsData;
        setProducts(prods);
        setCategories(cats);
        if (prodsData.pagination) {
          setHasMore(prodsData.pagination.page < prodsData.pagination.totalPages);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [categorySlug, minPrice, maxPrice, sort]);
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    try {
      const query = { page: nextPage, limit: 12 };
      if (categorySlug) query.category = categorySlug;
      if (minPrice) query.minPrice = minPrice;
      if (maxPrice) query.maxPrice = maxPrice;
      if (sort) query.sort = sort;
      const prodsData = await productService.getProducts(query);
      const prods = prodsData.products ? prodsData.products : prodsData;
      setProducts((prev) => [...prev, ...prods]);
      setPage(nextPage);
      if (prodsData.pagination) {
        setHasMore(prodsData.pagination.page < prodsData.pagination.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more products", error);
    } finally {
      setIsLoadingMore(false);
    }
  };
  const handleCategorySelect = (slug) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };
  const applyFilters = () => {
    setMinPrice(tempMin);
    setMaxPrice(tempMax);
    setSort(tempSort);
    setIsFilterOpen(false);
  };
  const clearFilters = () => {
    setTempMin("");
    setTempMax("");
    setTempSort("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setIsFilterOpen(false);
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
  return <div className="flex flex-col gap-10 pb-32">
      <section className="px-6 pt-10 space-y-10">
        <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
  >
           <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl font-black font-heading leading-[0.9] tracking-tighter">
                {categorySlug ? categories.find((c) => c.slug === categorySlug)?.name || "Collection" : "All Signatures."}
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
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12 border-border/10 bg-white dark:bg-zinc-800 shadow-premium hover:scale-105 active:scale-95 transition-all relative"
                    onClick={() => {
                      setTempMin(minPrice);
                      setTempMax(maxPrice);
                      setTempSort(sort);
                    }}
                  >
                     <Filter className="h-4 w-4" />
                     {(minPrice || maxPrice || sort) && (
                        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
                     )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2.5rem] max-w-md p-8 border border-border/30 bg-background/95 backdrop-blur-3xl shadow-premium">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl font-black uppercase tracking-tight italic">Refine Curations</DialogTitle>
                  </DialogHeader>
                  <div className="mt-6 space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Price Valuation (₹)</h4>
                      <div className="flex items-center gap-4">
                        <input 
                          type="number" 
                          placeholder="Min" 
                          value={tempMin} 
                          onChange={e => setTempMin(e.target.value)}
                          className="w-full h-12 rounded-2xl bg-muted/40 border border-border/60 px-4 text-sm font-bold text-foreground focus:outline-none focus:border-primary/50"
                        />
                        <span className="text-muted-foreground font-black">—</span>
                        <input 
                          type="number" 
                          placeholder="Max" 
                          value={tempMax} 
                          onChange={e => setTempMax(e.target.value)}
                          className="w-full h-12 rounded-2xl bg-muted/40 border border-border/60 px-4 text-sm font-bold text-foreground focus:outline-none focus:border-primary/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                        <ArrowUpDown className="h-3 w-3" /> Sorting Architecture
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant={tempSort === "price_asc" ? "default" : "outline"} onClick={() => setTempSort("price_asc")} className={cn("h-12 rounded-xl text-[10px] font-black uppercase tracking-wider", tempSort === "price_asc" ? "" : "opacity-60")}>Price: Low to High</Button>
                        <Button variant={tempSort === "price_desc" ? "default" : "outline"} onClick={() => setTempSort("price_desc")} className={cn("h-12 rounded-xl text-[10px] font-black uppercase tracking-wider", tempSort === "price_desc" ? "" : "opacity-60")}>Price: High to Low</Button>
                        <Button variant={tempSort === "newest" ? "default" : "outline"} onClick={() => setTempSort("newest")} className={cn("h-12 rounded-xl text-[10px] font-black uppercase tracking-wider col-span-2", tempSort === "newest" ? "" : "opacity-60")}>Newest Arrivals</Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 flex gap-3">
                    <Button variant="ghost" onClick={clearFilters} className="flex-1 h-14 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-muted">Reset</Button>
                    <Button onClick={applyFilters} className="flex-1 h-14 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-[0.98]">Apply Filters</Button>
                  </div>
                </DialogContent>
              </Dialog>
           </div>
        </motion.div>
        <div className="relative">
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
            {categories.map((cat) => <Button
    key={cat.id}
    variant={categorySlug === cat.slug ? "default" : "outline"}
    className={cn(
      "rounded-full px-8 h-12 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
      categorySlug === cat.slug ? "shadow-glow" : "border-border/10 opacity-60 hover:opacity-100"
    )}
    onClick={() => handleCategorySelect(cat.slug)}
  >
                {cat.name}
              </Button>)}
          </div>
          <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-background via-background/80 to-transparent flex items-center justify-end pointer-events-none pr-1">
             <ChevronRight className="h-5 w-5 text-muted-foreground animate-pulse" />
          </div>
        </div>
      </section>
      <section className="px-6 min-h-[60vh]">
        <AnimatePresence mode="wait">
          {isLoading ? <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
  >
              {Array(8).fill(0).map((_, i) => <div key={i} className="flex flex-col gap-6">
                  <Skeleton className="aspect-[4/5] w-full rounded-[3rem]" />
                  <div className="space-y-3 px-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>)}
            </motion.div> : products.length === 0 ? <motion.div
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
    className="rounded-full px-10 h-14 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-xl"
  >
                 Reset Selection
              </Button>
            </motion.div> : <motion.div
    key="grid"
    variants={container}
    initial="hidden"
    animate="show"
    className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
  >
              {products.map((product) => <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>)}
            </motion.div>}
        </AnimatePresence>
      </section>
      {!isLoading && hasMore && <div className="flex justify-center pt-20">
            <Button
    variant="outline"
    onClick={handleLoadMore}
    disabled={isLoadingMore}
    className="rounded-full px-12 h-16 border-border/20 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
  >
               {isLoadingMore ? "Loading..." : "Load More Artifacts"}
            </Button>
         </div>}
    </div>;
}
export {
  ProductListingPage
};
