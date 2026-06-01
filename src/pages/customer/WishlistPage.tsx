import { useNavigate } from "react-router-dom"
import { ShoppingCart, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { ProductCard } from "@/components/shared/ProductCard"
import { useWishlistStore } from "@/store/wishlistStore"

import { motion, AnimatePresence } from "framer-motion"

export function WishlistPage() {
  const navigate = useNavigate()
  const { items, clearWishlist } = useWishlistStore()

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
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  }

  return (
    <div className="flex flex-col gap-12 pb-20 min-h-screen">
      {/* Editorial Header */}
      <section className="px-6 pt-10">
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-6"
         >
            <div className="space-y-1">
               <div className="flex items-center gap-3">
                  <Button 
                     variant="ghost" 
                     size="icon" 
                     className="rounded-full bg-muted/20 border border-border/10 h-10 w-10 hover:scale-110 active:scale-95 transition-all"
                     onClick={() => navigate(-1)}
                  >
                     <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="h-1 w-1 rounded-full bg-secondary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] ">Secured Library</span>
               </div>
               <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight tracking-tighter mt-2">Personal Archive.</h1>
            </div>
             {items.length > 0 && (
                <Button 
                   variant="ghost" 
                   className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-destructive hover:bg-destructive/5 py-4 px-6 rounded-full transition-all"
                   onClick={clearWishlist}
                >
                   Clear Archive
                </Button>
             )}
         </motion.div>
      </section>

      {/* Primary Content Gallery */}
      <section className="px-6 flex-1">
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10"
            >
              <EmptyState
                icon={ShoppingCart}
                title="Archive Vacant"
                description="Your selection library is currently waiting for inspiration. Identify artifacts you admire to curate your own personal archive."
                actionLabel="Explore Signatures"
                actionLink="/products"
              />
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4"
            >
              {items.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Premium CTA Area */}
      {items.length > 0 && (
         <motion.section 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="px-6 pt-20 border-t border-border/10 mt-10"
         >
            <div className="bg-primary text-primary-foreground rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-glow">
                <div className="absolute top-0 right-0 h-64 w-64 bg-white/5 blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 h-64 w-64 bg-white/5 blur-3xl -ml-32 -mb-32" />
                
                <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tighter leading-none mb-6">Want more inspiration?</h2>
                <p className="text-sm font-medium opacity-50 max-w-[320px] mx-auto mb-10 leading-relaxed">
                   Continue your curation process with our latest seasonal arrivals and limited editorial releases.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <Button 
                     onClick={() => navigate("/products?category=new")}
                     className="w-full sm:w-auto px-12 h-16 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-zinc-100 active:scale-95 transition-all"
                   >
                      New Signatures
                   </Button>
                   <Button 
                      variant="ghost"
                      onClick={() => navigate("/")}
                      className="w-full sm:w-auto px-12 h-16 rounded-full text-white/50 text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-white/5"
                   >
                      Return Home
                   </Button>
                </div>
            </div>
         </motion.section>
      )}
    </div>
  )
}
