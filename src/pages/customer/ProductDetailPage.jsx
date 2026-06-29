import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/features/products/services/productService";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/shared/ProductCard";
import { motion } from "framer-motion";
const VARIANTS = [
  { name: "Obsidian Black", value: "#1A1A1A" },
  { name: "Tuscan Sand", value: "#C4A484" },
  { name: "Pure Alabaster", value: "#E8E8E8" }
];
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: "r1",
      name: "Alexander V.",
      rating: 5,
      comment: "Absolutely unmatched structural silhouette. The material has a weighted architectural drape that holds its shape perfectly throughout the day. Worth every bit of the investment.",
      date: "2 days ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander"
    },
    {
      id: "r2",
      name: "Marcus K.",
      rating: 4,
      comment: "Very clean lines. The organic cotton is heavy but highly breathable. Fit is slightly relaxed, so follow the guide if you want a closer silhouette. Beautiful piece.",
      date: "1 week ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    }
  ]);
  const [showRightIndicator, setShowRightIndicator] = useState(true);
  const scrollContainerRef = useRef(null);
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowRightIndicator(scrollLeft + clientWidth < scrollWidth - 25);
    }
  };
  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowRightIndicator(scrollLeft + clientWidth < scrollWidth - 25);
    }
  }, [reviews]);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  const isFavorite = product ? isInWishlist(product.id) : false;
  const handleWishlistClick = () => {
    if (product) {
      toggleWishlistItem(product);
      if (isFavorite) {
        toast.success("Removed from wishlist");
      } else {
        toast.success("Added to wishlist", {
          description: "Access from your Profile."
        });
      }
    }
  };
  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        if (!id) return;
        const data = await productService.getProductById(id);
        if (data) {
          setProduct(data);
          const related = await productService.getRelatedProducts(data.id);
          setRelatedProducts(related.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
    setActiveImage(0);
    window.scrollTo(0, 0);
  }, [id]);
  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      toast.success(`${product.name} added to cart`, {
        description: `Size: ${selectedSize} | Variant: ${VARIANTS[selectedColor].name} curated successfully.`
      });
    }
  };
  if (isLoading) {
    return <div className="flex flex-col gap-10 p-4">
        <Skeleton className="aspect-[4/5] w-full rounded-[3rem]" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>;
  }
  if (!product) {
    return <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-black font-heading mb-6 tracking-tighter">Selection Missing</h1>
        <Button asChild className="rounded-full h-14 px-10">
          <Link to="/products">Return to Collection</Link>
        </Button>
      </div>;
  }
  return <div className="flex flex-col gap-0 pb-40">
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
    className="rounded-full bg-white/10 dark:bg-zinc-800/40 border border-border/10 h-12 w-12 hover:scale-105 active:scale-95 transition-all cursor-pointer"
    onClick={handleWishlistClick}
  >
              <Heart className={cn("h-5 w-5 transition-colors", isFavorite && "fill-primary text-primary")} />
           </Button>
        </div>
      </div>
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
            {product.images.map((_, i) => <button
    key={i}
    className={cn(
      "h-1.5 transition-all duration-500 rounded-full shadow-glow",
      activeImage === i ? "w-10 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
    )}
    onClick={() => setActiveImage(i)}
  />)}
         </div>
      </section>
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
               {product.salePrice && <span className="text-xl font-bold text-muted-foreground/40 line-through leading-none">₹{product.price.toLocaleString()}</span>}
             </div>
             <div className="text-[10px] font-black uppercase tracking-widest text-primary/40 mt-2">Inclusive of all taxes</div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Select Variant</h3>
               <div className="flex gap-4">
                  {VARIANTS.map((color, i) => <button
    key={i}
    onClick={() => setSelectedColor(i)}
    className={cn(
      "h-10 w-10 rounded-full border-2 p-1 transition-all hover:scale-110 cursor-pointer",
      selectedColor === i ? "border-primary" : "border-transparent"
    )}
    title={color.name}
  >
                      <div className="h-full w-full rounded-full shadow-inner" style={{ backgroundColor: color.value }} />
                    </button>)}
               </div>
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-between ">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Select Size</h3>
                 <Dialog>
                   <DialogTrigger asChild>
                     <button className="text-[10px] font-black uppercase tracking-widest text-primary/60 border-b border-primary/20 cursor-pointer hover:text-primary transition-colors">Size Guide</button>
                   </DialogTrigger>
                   <DialogContent className="rounded-[2.5rem] max-w-md p-8 border border-border/30 bg-background/95 backdrop-blur-3xl shadow-premium">
                     <DialogHeader>
                       <DialogTitle className="font-heading text-2xl font-black uppercase tracking-tight italic">Size Guide</DialogTitle>
                     </DialogHeader>
                     <div className="mt-4 space-y-6">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Architectural Fit Dimensions</p>
                       <div className="border border-border/40 rounded-[1.5rem] overflow-hidden text-xs">
                         <div className="grid grid-cols-3 bg-muted/40 p-3.5 font-black uppercase tracking-widest border-b border-border/40">
                           <span>Size</span>
                           <span>Chest (in)</span>
                           <span>Sleeve (in)</span>
                         </div>
                         <div className="divide-y divide-border/40 font-bold">
                           <div className="grid grid-cols-3 p-3.5">
                             <span>S</span>
                             <span>36 - 38</span>
                             <span>32.5 - 33</span>
                           </div>
                           <div className="grid grid-cols-3 p-3.5">
                             <span>M</span>
                             <span>39 - 41</span>
                             <span>33.5 - 34</span>
                           </div>
                           <div className="grid grid-cols-3 p-3.5">
                             <span>L</span>
                             <span>42 - 44</span>
                             <span>34.5 - 35</span>
                           </div>
                           <div className="grid grid-cols-3 p-3.5">
                             <span>XL</span>
                             <span>45 - 47</span>
                             <span>35.5 - 36</span>
                           </div>
                         </div>
                       </div>
                       <p className="text-[10px] text-muted-foreground/60 leading-relaxed font-bold uppercase tracking-wider">
                         * All measurements are in inches. Standard luxury relaxed fit. If you prefer a closer architectural line, consider sizing down.
                       </p>
                     </div>
                   </DialogContent>
                 </Dialog>
               </div>
               <div className="flex gap-3">
                  {["S", "M", "L", "XL"].map((size) => <Button
    key={size}
    variant={selectedSize === size ? "default" : "outline"}
    onClick={() => setSelectedSize(size)}
    className={cn(
      "h-14 w-14 rounded-2xl p-0 font-black text-xs transition-all cursor-pointer",
      selectedSize === size ? "shadow-xl shadow-primary/20 scale-105" : "opacity-60 hover:opacity-100"
    )}
  >
                      {size}
                    </Button>)}
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
        <div className="py-12 border-y border-border/50">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-2">
                 <h3 className="text-xl font-black tracking-tight leading-none">Community Reviews</h3>
                 <div className="flex items-center justify-center md:justify-start gap-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}
                    <span className="text-[10px] font-black ml-2">4.9 / 5.0 Rating</span>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-4">
                     {[1, 2, 3, 4].map((i) => <div key={i} className="h-12 w-12 rounded-full border-4 border-background bg-muted overflow-hidden transition-transform hover:translate-y-[-4px]">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
                       </div>)}
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest opacity-60 max-w-[120px]">
                    Trusted by 14k+ architectural styling experts
                 </div>
               </div>
               <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                 <DialogTrigger asChild>
                   <Button variant="outline" className="rounded-full border-2 font-black uppercase tracking-widest text-[10px] px-8 py-6 cursor-pointer">
                      Post Review
                   </Button>
                 </DialogTrigger>
                 <DialogContent className="rounded-[2.5rem] max-w-md p-8 border border-border/30 bg-background/95 backdrop-blur-3xl shadow-premium">
                   <DialogHeader>
                     <DialogTitle className="font-heading text-2xl font-black uppercase tracking-tight italic">Share Your Verdict</DialogTitle>
                   </DialogHeader>
                   <form onSubmit={(e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    const newReview = {
      id: `r-${Date.now()}`,
      name: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: "Just now",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(reviewName)}`
    };
    setReviews((prev) => [newReview, ...prev]);
    toast.success("Review Submitted Successfully!", {
      description: "Your styling review has been curated."
    });
    setIsReviewOpen(false);
    setReviewName("");
    setReviewRating(5);
    setReviewComment("");
  }} className="mt-4 space-y-6">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Your Rating</label>
                       <div className="flex gap-2">
                         {[1, 2, 3, 4, 5].map((star) => <button
    type="button"
    key={star}
    onClick={() => setReviewRating(star)}
    className="text-primary hover:scale-110 active:scale-95 transition-all cursor-pointer"
  >
                             <Star className={cn("h-6 w-6", star <= reviewRating ? "fill-primary text-primary" : "text-muted-foreground/30")} />
                           </button>)}
                       </div>
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Stylist Name</label>
                       <input
    type="text"
    value={reviewName}
    onChange={(e) => setReviewName(e.target.value)}
    placeholder="Enter your name"
    className="w-full h-14 rounded-2xl bg-muted/30 border border-border/50 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
  />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Verbal Review</label>
                       <textarea
    value={reviewComment}
    onChange={(e) => setReviewComment(e.target.value)}
    placeholder="Describe fit, silhouette, and material structure..."
    rows={4}
    className="w-full rounded-2xl bg-muted/30 border border-border/50 p-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-foreground"
  />
                     </div>
                     <Button type="submit" className="w-full h-14 rounded-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl cursor-pointer">
                       Submit Verdict
                     </Button>
                    </form>
                 </DialogContent>
               </Dialog>
            </div>
              <div className="relative">
                <div
    ref={scrollContainerRef}
    onScroll={handleScroll}
    className="flex gap-6 overflow-x-auto pb-6 mt-8 no-scrollbar scroll-smooth snap-x snap-mandatory scroll-pl-4 md:scroll-pl-8 px-4 md:px-8"
  >
                   {reviews.map((rev) => <div
    key={rev.id}
    className="min-w-[290px] sm:min-w-[350px] max-w-sm snap-start p-6 rounded-[2rem] bg-muted/20 border border-border/10 flex flex-col gap-4 shadow-sm hover:shadow-premium hover:border-border/30 transition-all duration-500 text-left"
  >
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-full border border-border/20 overflow-hidden bg-background">
                             <img src={rev.avatar} alt={rev.name} className="h-full w-full object-cover" />
                           </div>
                           <div>
                             <h4 className="font-black text-xs uppercase tracking-wider">{rev.name}</h4>
                             <span className="text-[9px] font-bold text-muted-foreground">{rev.date}</span>
                           </div>
                         </div>
                         <div className="flex gap-0.5">
                           {[1, 2, 3, 4, 5].map((s) => <Star key={s} className={cn("h-3 w-3", s <= rev.rating ? "fill-primary text-primary" : "text-muted-foreground/20")} />)}
                         </div>
                       </div>
                       <p className="text-xs text-muted-foreground/80 leading-relaxed font-semibold">
                         {rev.comment}
                       </p>
                     </div>)}
                   <div className="w-8 shrink-0" />
                </div>
                {showRightIndicator && <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-background via-background/80 to-transparent flex items-center justify-end pointer-events-none pr-1">
                     <ChevronRight className="h-5 w-5 text-muted-foreground animate-pulse" />
                  </div>}
              </div>
         </div>
        {relatedProducts.length > 0 && <div className="pt-20 pb-20">
            <h2 className="text-3xl font-black font-heading mb-12 tracking-tighter leading-none">Related Collections.</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
              {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>}
      </section>
      <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    className="fixed bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 z-[102] w-[calc(100%-3rem)] max-w-lg"
  >
        <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-4 pr-4 pl-8 shadow-2xl flex items-center justify-between border border-primary-foreground/10 backdrop-blur-3xl">
           <div className="hidden sm:flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Curated Total</span>
              <span className="text-lg font-black leading-none text-primary-foreground">₹{(product.salePrice || product.price).toLocaleString()}</span>
           </div>
           <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
    onClick={handleWishlistClick}
    className="h-12 w-12 shrink-0 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 active:scale-90 transition-all border border-primary-foreground/10 cursor-pointer flex items-center justify-center"
  >
                 <Heart className={cn("h-5 w-5 text-primary-foreground transition-colors", isFavorite && "fill-primary-foreground")} />
              </button>
              <div className="flex-1 flex gap-2">
                 <button
    onClick={handleAddToCart}
    disabled={!product.inStock}
    className="flex-1 h-14 rounded-full border border-primary-foreground/20 font-black text-[10px] uppercase tracking-widest bg-primary-foreground/5 hover:bg-primary-foreground/10 text-primary-foreground cursor-pointer inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 transition-all active:scale-95"
  >
                    Add
                 </button>
                 <button
    onClick={() => navigate("/checkout")}
    disabled={!product.inStock}
    className="flex-1 h-14 px-8 rounded-full bg-primary-foreground text-primary font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary-foreground/90 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50"
  >
                    Reserve Now
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </div>;
}
export {
  ProductDetailPage
};
