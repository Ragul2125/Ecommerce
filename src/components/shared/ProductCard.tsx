import { Link } from "react-router-dom"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/utils/mockData"
import { useWishlistStore } from "@/store/wishlistStore"
import { useCartStore } from "@/store/cartStore"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore()
  const addItem = useCartStore(state => state.addItem)
  const isFavorite = isInWishlist(product.id)

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    toast.success(`${product.name} added to cart`, {
      description: "You can view your items in the cart.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }

  return (
    <Link 
      to={`/products/${product.id}`} 
      className={cn(
        "group flex flex-col gap-2 p-2.5 rounded-[2.5rem] bg-card text-card-foreground border border-border/40 hover:border-primary/40 shadow-sm hover:shadow-premium transition-all duration-700",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted/20 border border-border/10">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden md:block z-20">
           <button 
             onClick={handleQuickAdd}
             className="w-full h-12 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-full shadow-2xl hover:scale-[1.05] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
           >
              <ShoppingCart className="h-4 w-4" />
              Quick Acquisition
           </button>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4 z-10">
           <button 
             onClick={handleWishlistClick}
             className={cn(
               "h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-xl shadow-premium transition-all duration-500 active:scale-90",
               isFavorite ? "bg-primary text-primary-foreground shadow-glow" : "bg-white/90 text-black hover:bg-white"
             )}
           >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current animate-pulse")} />
           </button>
        </div>

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
           {product.salePrice && (
              <div className="bg-secondary text-white rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] uppercase shadow-premium backdrop-blur-md bg-opacity-90">
                 -{Math.round((1 - product.salePrice / product.price) * 100)}%
              </div>
           )}
           {product.isNew && (
              <div className="bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-[8px] font-black tracking-[0.2em] uppercase shadow-premium">
                 Pioneer
              </div>
           )}
        </div>

        {/* Rating Floating */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-premium group-hover:opacity-0 transition-opacity duration-300">
           <Star className="h-3 w-3 fill-primary text-primary" />
           <span className="text-[10px] font-black text-black tracking-tighter">{product.rating}</span>
        </div>
      </div>
      
      <div className="px-3 pb-2 space-y-2 cursor-pointer">
        <h3 className="font-black text-[11px] uppercase tracking-[0.1em] leading-tight text-foreground/60 line-clamp-2 min-h-[1.5rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            {product.salePrice && (
               <span className="text-[9px] font-black text-muted-foreground/50 line-through tracking-widest leading-none">
                  ₹{product.price.toLocaleString()}
               </span>
            )}
            <span className="font-black text-lg text-primary flex items-baseline leading-none tracking-tighter">
              <span className="text-[0.6em] mr-0.5 opacity-40">₹</span>
              {(product.salePrice || product.price).toLocaleString()}
            </span>
          </div>
          
          <div className="text-[8px] text-muted-foreground/70 font-black uppercase tracking-[0.2em] pr-3">
             {product.soldCount || 0} Circulated
          </div>
        </div>
      </div>
    </Link>

  )
}
