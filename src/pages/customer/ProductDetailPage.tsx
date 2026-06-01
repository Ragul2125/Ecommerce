import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Star, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { productService } from "@/features/products/services/productService"
import type { Product } from "@/utils/mockData"
import { useCartStore } from "@/store/cartStore"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/shared/ProductCard"

import { motion } from "framer-motion"

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  
  const addItem = useCartStore(state => state.addItem)

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true)
      try {
        if (!id) return
        const data = await productService.getProductById(id)
        if (data) {
          setProduct(data)
          const related = await productService.getProducts({ category: data.category })
          setRelatedProducts(related.filter(p => p.id !== data.id).slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to load product", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProduct()
    setActiveImage(0)
    window.scrollTo(0, 0)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1)
      toast.success(`${product.name} added to cart`, {
        description: "Your selection has been curated.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 p-4">
        <Skeleton className="aspect-[4/5] w-full rounded-[3rem]" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-black font-heading mb-6 tracking-tighter">Selection Missing</h1>
        <Button asChild className="rounded-full h-14 px-10">
          <Link to="/products">Return to Collection</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0 pb-40">
      {/* 1. Refined Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-6 bg-background/60 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-white/10 dark:bg-zinc-800/40 border border-border/10 h-12 w-12 hover:scale-105 active:scale-95 transition-all"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
           <Button 
             variant="ghost" 
             size="icon" 
             className="rounded-full bg-white/10 dark:bg-zinc-800/40 border border-border/10 h-12 w-12 hover:scale-105 active:scale-95 transition-all"
           >
              <Heart className="h-5 w-5" />
           </Button>
        </div>
      </div>

      {/* 2. Editorial Gallery Area */}
      <section className="relative aspect-[4/5] w-full bg-muted/20 overflow-hidden px-4 md:px-20 md:py-10">
         <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src={product.images[activeImage]} 
            alt={product.name}
            className="h-full w-full object-cover rounded-[3rem] shadow-2xl"
         />
         
         <div className="absolute bottom-10 inset-x-0 flex justify-center gap-3">
            {product.images.map((_, i) => (
              <button 
                key={i} 
                className={cn(
                  "h-1.5 transition-all duration-500 rounded-full shadow-glow",
                  activeImage === i ? "w-10 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
                )}
                onClick={() => setActiveImage(i)}
              />
            ))}
         </div>
      </section>

      {/* 3. Product Info Reveal */}
      <section className="bg-background relative z-20 px-8 pt-12 space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-6"
        >
          <div className="space-y-3">
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">{product.category}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <div className="flex items-center gap-1">
                   <Star className="h-3 w-3 fill-primary text-primary" />
                   <span className="text-[10px] font-black">{product.rating}</span>
                </div>
             </div>
             <h1 className="text-4xl md:text-6xl font-black font-heading leading-[0.9] tracking-tighter">{product.name}</h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
             <div className="flex items-baseline gap-3">
               <span className="text-4xl font-black text-primary leading-none">
                 <span className="text-[0.6em] mr-1 opacity-50 font-medium">₹</span>
                 {(product.salePrice || product.price).toLocaleString()}
               </span>
               {product.salePrice && (
                 <span className="text-xl font-bold text-muted-foreground/40 line-through leading-none">₹{product.price.toLocaleString()}</span>
               )}
             </div>
             <div className="text-[10px] font-black uppercase tracking-widest text-primary/40 mt-2">Inclusive of all taxes</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Select Variant</h3>
               <div className="flex gap-4">
                  {['#1A1A1A', '#C4A484', '#E8E8E8'].map((color, i) => (
                    <button 
                      key={i} 
                      className={cn(
                        "h-10 w-10 rounded-full border-2 p-1 transition-all hover:scale-110",
                        i === 0 ? "border-primary" : "border-transparent"
                      )}
                    >
                      <div className="h-full w-full rounded-full shadow-inner" style={{ backgroundColor: color }} />
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between max-w-[300px]">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Select Size</h3>
                 <button className="text-[10px] font-black uppercase tracking-widest text-primary/60 border-b border-primary/20">Size Guide</button>
               </div>
               <div className="flex gap-3">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <Button 
                      key={size}
                      variant={size === 'M' ? 'default' : 'outline'}
                      className={cn(
                        "h-14 w-14 rounded-2xl p-0 font-black text-xs transition-all",
                        size === 'M' ? "shadow-xl shadow-primary/20 scale-105" : "opacity-60 hover:opacity-100"
                      )}
                    >
                      {size}
                    </Button>
                  ))}
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">The Narrative</h3>
            <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
               {product.description}
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4">
               <div className="p-4 rounded-3xl bg-muted/30 border border-border/50">
                  <div className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-50">Material</div>
                  <div className="text-xs font-bold tracking-tight">100% Organic Cotton</div>
               </div>
               <div className="p-4 rounded-3xl bg-muted/30 border border-border/50">
                  <div className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-50">Origin</div>
                  <div className="text-xs font-bold tracking-tight">Italian Tailored</div>
               </div>
            </div>
          </div>
        </div>

        {/* 4. Communal Proof */}
        <div className="py-12 border-y border-border/50">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-2">
                 <h3 className="text-xl font-black tracking-tight leading-none">Community Reviews</h3>
                 <div className="flex items-center justify-center md:justify-start gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}
                    <span className="text-[10px] font-black ml-2">4.9 / 5.0 Rating</span>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-4">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="h-12 w-12 rounded-full border-4 border-background bg-muted overflow-hidden transition-transform hover:translate-y-[-4px]">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
                       </div>
                     ))}
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-60 max-w-[120px]">
                    Trusted by 14k+ architectural styling experts
                 </div>
              </div>
              <Button variant="outline" className="rounded-full border-2 font-black uppercase tracking-widest text-[10px] px-8 py-6">
                 Post Review
              </Button>
           </div>
        </div>

        {/* 5. Related Collections */}
        {relatedProducts.length > 0 && (
          <div className="pt-20 pb-20">
            <h2 className="text-3xl font-black font-heading mb-12 tracking-tighter leading-none">Related Collections.</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 6. Sticky High-Performance Action Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 z-[102] w-[calc(100%-3rem)] max-w-lg"
      >
        <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-4 pr-4 pl-8 shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-3xl">
           <div className="hidden sm:flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Curated Total</span>
              <span className="text-lg font-black leading-none">₹{(product.salePrice || product.price).toLocaleString()}</span>
           </div>
           
           <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                 variant="ghost" 
                 size="icon" 
                 className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all border border-white/10"
              >
                 <Heart className="h-5 w-5 text-white" />
              </Button>
              <div className="flex-1 flex gap-2">
                 <Button 
                    variant="ghost"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 h-14 rounded-full border border-white/20 font-black text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white/10"
                 >
                    Add
                 </Button>
                 <Button 
                    onClick={() => navigate('/checkout')}
                    disabled={!product.inStock}
                    className="flex-1 h-14 px-8 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-zinc-100 active:scale-95 transition-all"
                 >
                    Reserve Now
                 </Button>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  )
}
