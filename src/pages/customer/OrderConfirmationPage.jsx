import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
function OrderConfirmationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const address = location.state?.address;
  const orderTotal = location.state?.total || 125000;
  const { user } = useAuthStore();
  const orderNumber = "AQ-" + Math.floor(1e5 + Math.random() * 9e5);
  return <div className="flex flex-col items-center justify-center min-h-[90vh] px-6 gap-12 pb-40">
       {
    /* 1. Celebratory Architecture */
  }
       <div className="relative">
          <motion.div
    initial={{ scale: 0, rotate: -20 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", damping: 15, stiffness: 200 }}
    className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-primary/10 flex items-center justify-center p-4 border border-primary/5"
  >
             <div className="h-full w-full rounded-full bg-primary flex items-center justify-center shadow-glow">
                <Check className="h-12 w-12 md:h-16 md:w-16 text-primary-foreground stroke-[4]" />
             </div>
          </motion.div>
          
          <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
    className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-secondary shadow-glow"
  />
          <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.7 }}
    className="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-zinc-400 opacity-40"
  />
       </div>

       <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="text-center space-y-4 max-w-md"
  >
          <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tighter leading-none mb-2">Acquisition Perfected.</h1>
          <p className="text-xs md:text-sm font-black text-muted-foreground uppercase tracking-[0.3em] leading-relaxed">
             Secure confirmation of your curated artifacts. Preparation of logistics is underway.
          </p>
       </motion.div>

       {
    /* 2. Premium Audit Receipt */
  }
       <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-full max-w-sm rounded-[3.5rem] bg-primary text-primary-foreground p-10 space-y-10 shadow-glow relative overflow-hidden"
  >
          <div className="absolute top-0 right-0 h-48 w-48 bg-primary/10 blur-3xl -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 h-48 w-48 bg-white/5 blur-3xl -ml-24 -mb-24" />
          
          <div className="space-y-6 relative z-10">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                <span>Transaction UID</span>
                <span className="text-primary-foreground opacity-100">{orderNumber}</span>
             </div>
             <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Total Valuation</span>
                <span className="text-4xl font-black text-primary-foreground tracking-tighter">₹{orderTotal.toLocaleString()}</span>
             </div>
          </div>

          <div className="pt-8 border-t border-primary-foreground/10 space-y-3 relative z-10">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Logistics Destination</p>
             <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest text-primary-foreground opacity-90">{user?.name || "Resident Associate"}</p>
                <p className="text-xs font-medium text-primary-foreground/60 leading-relaxed">
                   {address ? (
                     <>
                       {address.street}<br />
                       {address.city}, {address.state} {address.zipCode}<br />
                       {address.country}
                     </>
                   ) : (
                     <>
                       123 Premium Way, Architecture District<br />
                       San Francisco, CA 94103
                     </>
                   )}
                </p>
             </div>
          </div>
       </motion.div>

       {
    /* 3. Navigation Controls */
  }
       <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="flex flex-col gap-4 w-full max-w-sm pt-6"
  >
          <Button asChild className="h-18 rounded-full bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-primary/90 active:scale-[0.98] transition-all">
             <Link to="/categories">Continue Curation</Link>
          </Button>
          <Button asChild variant="ghost" className="h-18 rounded-full font-black text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5">
             <Link to="/order-history">Acquisition Records</Link>
          </Button>
       </motion.div>
    </div>;
}
export {
  OrderConfirmationPage
};
