import { useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/shared/Navbar";
import { BottomNav } from "@/components/shared/BottomNav";
import { InstallPrompt } from "@/components/InstallPrompt";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
function RootLayout() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const initCart = useCartStore(state => state.initCart);
  const initWishlist = useWishlistStore(state => state.initWishlist);
  useEffect(() => {
    if (isAuthenticated) {
      initCart();
      initWishlist();
    }
  }, [isAuthenticated, initCart, initWishlist]);
  const isCheckoutPath = location.pathname === "/checkout" || location.pathname === "/order-confirmation";
  return <div className={`flex min-h-dvh flex-col relative pt-16 md:pt-20 ${isCheckoutPath ? "" : "pb-20 md:pb-0"}`}>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
    key={location.pathname}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="flex-1"
  >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      {!isCheckoutPath && <>
          <BottomNav />
          <InstallPrompt />
        </>}
    </div>;
}
export {
  RootLayout
};
