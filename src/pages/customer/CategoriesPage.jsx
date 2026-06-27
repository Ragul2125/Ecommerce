import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shirt,
  Sparkles,
  Home as HomeIcon,
  Baby,
  ChevronRight,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { productService } from "@/features/products/services/productService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
const iconMap = {
  Shirt,
  Sparkles,
  Home: HomeIcon,
  Baby
};
function CategoriesPage() {
  const navigate = useNavigate();
  const [activeSuperId, setActiveSuperId] = useState("s1");
  const [superCategories, setSuperCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function init() {
      const supers = await productService.getSuperCategories();
      setSuperCategories(supers);
      if (supers.length > 0) {
        setActiveSuperId(supers[0].id);
      }
    }
    init();
  }, []);
  useEffect(() => {
    async function loadSub() {
      setIsLoading(true);
      const subs = await productService.getCategories(activeSuperId);
      setSubCategories(subs);
      setIsLoading(false);
    }
    loadSub();
  }, [activeSuperId]);
  return <div className="flex flex-col h-[calc(100vh-140px)] bg-muted/10 overflow-hidden">
      {
    /* 1. Minimal Header */
  }
      <div className="bg-background px-6 py-8 border-b border-border/10 flex items-center justify-between">
         <div className="space-y-1">
            <h1 className="text-3xl font-black font-heading tracking-tighter leading-none">Catalog.</h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Explore our full architecture</p>
         </div>
         <div className="flex items-center gap-3">
            <Button
    variant="outline"
    onClick={() => navigate("/products")}
    className="rounded-full font-black uppercase tracking-widest text-[9px] px-6 h-12 border-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
  >
               Shop All
            </Button>
            <Button
    variant="ghost"
    size="icon"
    onClick={() => navigate("/search")}
    className="rounded-full bg-muted/20 border border-border/10 h-12 w-12 hover:scale-110 active:scale-95 transition-all cursor-pointer"
  >
               <Search className="h-5 w-5" />
            </Button>
         </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {
    /* 2. Vertically Refined Sidebar */
  }
        <div className="w-28 md:w-36 bg-background border-r border-border/10 overflow-y-auto no-scrollbar py-6">
          <div className="flex flex-col gap-2">
             {superCategories.map((sup) => {
    const Icon = iconMap[sup.iconName] || Shirt;
    const isActive = activeSuperId === sup.id;
    return <button
      key={sup.id}
      onClick={() => setActiveSuperId(sup.id)}
      className={cn(
        "w-full py-8 flex flex-col items-center gap-3 transition-all relative group",
        isActive ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"
      )}
    >
                   {isActive && <motion.div
      layoutId="activeSide"
      className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-l-full shadow-glow"
    />}
                   <div className={cn(
      "p-4 rounded-[2rem] transition-all duration-500",
      isActive ? "bg-primary/10 shadow-premium" : "bg-muted/30 group-hover:bg-muted/50"
    )}>
                     <Icon className={cn("h-7 w-7 transition-transform duration-500", isActive ? "scale-110" : "scale-100")} />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-center px-2 leading-none">
                     {sup.name}
                   </span>
                 </button>;
  })}
          </div>
        </div>

        {
    /* 3. Editorial Explorer Area */
  }
        <div className="flex-1 bg-background p-8 overflow-y-auto no-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            {isLoading ? <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="grid grid-cols-2 gap-6"
  >
                {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="aspect-square rounded-[3rem]" />)}
              </motion.div> : <motion.div
    key={activeSuperId}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-12"
  >
                {
    /* Visual Category Banner - Refined Padding to prevent clipping */
  }
                <div className="relative aspect-[16/7] rounded-[3rem] overflow-hidden bg-zinc-900 group shadow-premium hover:shadow-glow transition-all duration-700">
                   <div className="absolute inset-0 bg-black/40 z-[1] group-hover:bg-black/20 transition-all duration-700" />
                   <img
    src={subCategories[1]?.image || subCategories[0]?.image || "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"}
    alt="banner"
    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
  />
                   <div className="relative z-10 h-full flex flex-col justify-center px-14 space-y-2">
                      <div className="h-1 w-12 bg-primary rounded-full mb-2" />
                      <h2 className="text-white font-black text-2xl md:text-4xl font-heading tracking-tighter uppercase leading-none">Signature Selection</h2>
                      <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em]">Curated {superCategories.find((s) => s.id === activeSuperId)?.name} Pieces</p>
                   </div>
                </div>

                {
    /* Sub-Category Composition */
  }
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 px-2">
                  {subCategories.map((cat, idx) => <motion.button
    key={cat.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.05 }}
    onClick={() => navigate(`/products?category=${cat.slug}`)}
    className="flex flex-col items-center gap-5 group outline-none"
  >
                      <div className="relative w-full aspect-square max-w-[140px]">
                        <div className="h-full w-full rounded-[3rem] overflow-hidden border border-border/10 p-2 shadow-premium group-hover:shadow-glow group-hover:border-primary/20 transition-all duration-500">
                           <div className="h-full w-full overflow-hidden rounded-[2.5rem]">
                              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-[1s]" />
                           </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-background rounded-full flex items-center justify-center p-2.5 shadow-xl border border-border/10 group-hover:scale-110 transition-all duration-500">
                           <ChevronRight className="h-full w-full text-primary" />
                        </div>
                      </div>
                      <div className="space-y-1 text-center">
                         <span className="text-[11px] font-black uppercase tracking-[0.1em] group-hover:text-primary transition-colors">
                           {cat.name}
                         </span>
                         <div className="h-1 w-0 bg-primary/20 mx-auto rounded-full group-hover:w-full transition-all duration-500" />
                      </div>
                    </motion.button>)}
                </div>

                {
    /* Seasonal Curations */
  }
                <div className="pt-10 space-y-6">
                   <div className="flex items-center gap-4">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Premier Partners</h3>
                      <div className="flex-1 h-[1px] bg-border/10" />
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {["Zara Studio", "H&M Move", "Nike Lab", "Gucci Archive"].map((brand, _i) => <button key={brand} className="h-16 border border-border/10 rounded-[2rem] flex items-center justify-center px-4 bg-muted/5 font-black text-[9px] uppercase tracking-widest text-muted-foreground/30 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all duration-500">
                          {brand}
                        </button>)}
                   </div>
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </div>;
}
export {
  CategoriesPage
};
