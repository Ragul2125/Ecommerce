import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/features/products/services/productService";
import { FlashSale } from "@/features/products/components/FlashSale";
import { ProductCard } from "@/components/shared/ProductCard";
import { motion } from "framer-motion";
const HERO_PRODUCTS = [
  {
    title: "The Monolith Parka.",
    badge: "Masterpiece Series",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80",
    link: "/products"
  },
  {
    title: "Obsidian Tech Wear.",
    badge: "Limited Edition",
    image: "https://images.unsplash.com/photo-1550614000-4b95d4ed8310?w=1600&q=80",
    link: "/products"
  },
  {
    title: "Lunar Chronograph.",
    badge: "Timepiece Collection",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80",
    link: "/products"
  },
  {
    title: "Nomad Leather Duffel.",
    badge: "Travel Essentials",
    image: "https://images.unsplash.com/photo-1547949003-9791a02ad8ce?w=1600&q=80",
    link: "/products"
  }
];

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroProduct, setHeroProduct] = useState(HERO_PRODUCTS[0]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * HERO_PRODUCTS.length);
    setHeroProduct(HERO_PRODUCTS[randomIndex]);
    
    async function loadData() {
      setIsLoading(true);
      try {
        const [productsData] = await Promise.all([
          productService.getProducts({ featured: true })
        ]);
        setFeaturedProducts(productsData.slice(0, 8));
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  return <div className="flex flex-col gap-24 pb-40">
      {
    /* 1. New Minimalist Editorial Entrance */
  }
      <section className="px-6 pt-6 md:pt-10">
         <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col gap-10"
  >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Edition 2026 / Architecture</span>
              </div>
              <h1 className="text-5xl md:text-[10rem] font-black font-heading leading-[0.85] tracking-tighter uppercase italic">
                Purity of <br />
                <span className="text-primary italic">Form.</span>
              </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
               <p className="max-w-[320px] md:max-w-md text-sm md:text-lg font-medium leading-relaxed text-muted-foreground/80">
                 Removing the noise of traditional retail. Focusing on the architectural silhouette and uncompromising material quality. Built for the permanent wardrobe.
               </p>
               <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                      {["photo-1507003211169-0a1dd7228f2d", "photo-1494790108377-be9c29b29330", "photo-1539571696357-5a69c17a67c6"].map((id) => <div key={id} className="h-14 w-14 rounded-full border-4 border-background bg-muted overflow-hidden">
                          <img src={`https://images.unsplash.com/${id}?w=100&q=80`} alt="Curator" className="h-full w-full object-cover" />
                       </div>)}
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-black uppercase tracking-widest leading-none">Global Curation</p>
                     <p className="text-[12px] font-bold text-muted-foreground opacity-50">12.5k Members</p>
                  </div>
               </div>
            </div>
         </motion.div>
      </section>

      {
    /* 2. Highlighted Product - The Theme Focus */
  }
      <section className="px-4">
         <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative group h-[450px] md:h-[600px] w-full rounded-[3.5rem] overflow-hidden bg-zinc-900 shadow-premium"
  >
            <img
    src={heroProduct.image}
    alt="Featured Artifact"
    className="h-full w-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-1000"
  />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div className="space-y-4">
                  <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-full px-6 py-2 text-[9px] uppercase font-black tracking-widest">{heroProduct.badge}</Badge>
                  <h3 className="text-3xl md:text-5xl font-black text-white font-heading tracking-tighter">{heroProduct.title}</h3>
               </div>
               <Button asChild className="h-16 px-10 rounded-full bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-white/90 shadow-glow">
                  <Link to={heroProduct.link}>Acquire Artifact</Link>
               </Button>
            </div>
         </motion.div>
      </section>


      {
    /* 3. Refined Flash Sale */
  }
      <section className="bg-primary/5 py-20 border-y border-border/50">
         <FlashSale />
      </section>

      {
    /* 4. Curated Selection (Grid) */
  }
      <section className="px-6">
        <div className="flex items-center justify-between mb-12">
           <div className="space-y-2">
              <h2 className="text-4xl font-black font-heading tracking-tighter leading-none">Signature Essentials</h2>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Handpicked for permanent style</p>
           </div>
           <Link to="/products">
              <Button variant="outline" className="rounded-full h-10 w-40 font-black uppercase tracking-widest text-[10px] border-2 cursor-pointer">Explore All</Button>
           </Link>
        </div>

        <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4"
  >
          {isLoading ? Array(4).fill(0).map((_, i) => <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-[4/5] w-full rounded-[2.5rem]" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>) : featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </motion.div>
      </section>

      {
    /* 5. Minimalist CTA Section */
  }
      <section className="px-4">
         <div className="bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-24 flex flex-col items-center text-center space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-white/5 blur-[120px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 h-48 w-48 bg-white/5 blur-[100px] rounded-full -ml-24 -mb-24" />
            
            <h2 className="text-4xl md:text-7xl font-black font-heading tracking-tighter leading-none relative z-10">
               BECOME A<br />LUXE INSIDER.
            </h2>
            <p className="max-w-md text-primary-foreground/70 text-sm font-medium relative z-10">
               Sign up for early access to drops, exclusive reductions, and architectural style guides.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-md relative z-10">
               <input
    type="email"
    placeholder="Enter your email"
    className="flex-1 h-14 rounded-full bg-white/10 border border-white/20 py-4 px-8 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
  />
               <Button size="lg" className="rounded-full h-14 px-10 bg-white text-black font-black uppercase tracking-widest text-xs cursor-pointer">
                  Join Now
               </Button>
            </div>
         </div>
      </section>
    </div>;
}
export {
  HomePage
};
