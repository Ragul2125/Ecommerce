import { useNavigate } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { useCartStore } from "@/store/cartStore"
import { motion, AnimatePresence } from "framer-motion"

export function CartPage() {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity } = useCartStore()
  
  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price
    return acc + (price * item.quantity)
  }, 0)
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const shipping = subtotal > 8000 || subtotal === 0 ? 0 : 500.00
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 flex items-center justify-center">
        <EmptyState 
          icon={ShoppingCart}
          title="Archive Empty" 
          description="Your selection library is currently vacant. Elevate your wardrobe by exploring our curated signatures."
          actionLabel="Explore Signatures"
          actionLink="/products"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12 pb-20">
       <section className="px-6 pt-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
             <h1 className="text-4xl font-black font-heading tracking-tighter">Your Bag.</h1>
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                   {totalItems} Curated Pieces
                </p>
             </div>
          </motion.div>
       </section>

       <div className="flex flex-col gap-16 px-6 lg:flex-row lg:items-start lg:gap-20">
          {/* List of Items */}
          <div className="flex-1">
             <div className="space-y-8">
               <AnimatePresence mode="popLayout">
                 {items.map((item) => {
                   const price = item.product.salePrice || item.product.price
                   return (
                     <motion.div 
                       key={item.product.id} 
                       layout
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       className="group relative flex gap-6 p-6 rounded-[2.5rem] bg-muted/20 border border-border/10 hover:bg-muted/30 hover:border-border/30 transition-all duration-500 shadow-premium"
                     >
                        <div className="h-32 w-32 shrink-0 rounded-[2rem] overflow-hidden bg-muted shadow-lg">
                           <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-700" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <h3 className="font-black text-base leading-tight tracking-tight group-hover:text-primary transition-colors">{item.product.name}</h3>
                                 <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-[0.1em]">{item.product.category}</span>
                                    {item.product.isNew && <span className="text-[9px] font-black uppercase text-secondary">New</span>}
                                 </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeItem(item.product.id)} 
                                className="h-10 w-10 rounded-full transition-all active:scale-90 hover:bg-destructive/10 hover:text-destructive"
                              >
                                 <Trash2 className="h-4 w-4" />
                              </Button>
                           </div>

                           <div className="flex justify-between items-end">
                              <div className="flex items-center gap-5 bg-white/40 dark:bg-zinc-800/40 rounded-full p-1 border border-border/20 shadow-inner">
                                 <Button 
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    className="h-8 w-8 rounded-full bg-white dark:bg-zinc-900 shadow-premium active:scale-90"
                                    disabled={item.quantity <= 1}
                                 >
                                    <Minus className="h-3 w-3" />
                                 </Button>
                                 <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                                 <Button 
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    className="h-8 w-8 rounded-full bg-white dark:bg-zinc-900 shadow-premium active:scale-90"
                                 >
                                    <Plus className="h-3 w-3" />
                                 </Button>
                              </div>
                               <div className="flex flex-col items-end">
                                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Subtotal</span>
                                  <span className="font-black text-xl tracking-tighter">₹{(price * item.quantity).toLocaleString()}</span>
                               </div>
                           </div>
                        </div>
                     </motion.div>
                   )
                 })}
               </AnimatePresence>
             </div>
          </div>

          {/* Summary Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[450px] sticky top-32"
          >
             <div className="rounded-[3rem] bg-primary text-primary-foreground p-10 space-y-10 shadow-glow relative overflow-hidden">
                {/* Decorative backgrounds */}
                <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 h-40 w-40 bg-white/5 blur-3xl -ml-20 -mb-20" />

                <div className="space-y-1 relative z-10 text-center md:text-left">
                   <h2 className="text-2xl font-black font-heading tracking-tight">Investment Summary</h2>
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Secure Checkout Process</p>
                </div>
                
                <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center text-sm">
                       <span className="opacity-60 font-medium">Core Value</span>
                       <span className="font-black text-base">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="opacity-60 font-medium">Logistics</span>
                       <span className="font-black">{shipping === 0 ? "Complimentary" : `₹${shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="opacity-60 font-medium">Protocol Tax (GST)</span>
                       <span className="font-black">₹{Math.round(tax).toLocaleString()}</span>
                    </div>
                 </div>
  
                 <div className="pt-8 border-t border-white/10 flex flex-col items-center md:items-stretch gap-6 relative z-10">
                    <div className="flex justify-between items-baseline w-full px-2">
                       <span className="text-lg font-bold opacity-70">Total Acquisition</span>
                       <span className="text-4xl font-black tracking-tighter">₹{Math.round(total).toLocaleString()}</span>
                    </div>

                    <div className="space-y-4 w-full">
                       <Button 
                          onClick={() => navigate("/checkout")}
                          className="w-full h-18 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-zinc-100 transition-all active:scale-[0.98]"
                       >
                          Complete Acquisition
                       </Button>
                       
                       <Button 
                         variant="ghost"
                         onClick={() => navigate("/")}
                         className="w-full h-12 text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-white/5"
                       >
                          Continue Curating
                       </Button>
                    </div>
                 </div>

                 <div className="flex justify-center gap-6 opacity-30 relative z-10">
                    <div className="text-[8px] font-black uppercase tracking-widest border border-white/40 px-3 py-1 rounded-full">Secure 256-Bit</div>
                    <div className="text-[8px] font-black uppercase tracking-widest border border-white/40 px-3 py-1 rounded-full">Global Express</div>
                 </div>
             </div>
          </motion.div>
       </div>
    </div>
  )
}
