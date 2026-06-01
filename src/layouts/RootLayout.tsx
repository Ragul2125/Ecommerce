import { useLocation, Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/shared/Navbar"
import { BottomNav } from "@/components/shared/BottomNav"
import { InstallPrompt } from "@/components/InstallPrompt"

export function RootLayout() {
  const location = useLocation()
  const isCheckoutPath = location.pathname === "/checkout" || location.pathname === "/order-confirmation"

  return (
    <div className={`flex min-h-screen flex-col relative ${isCheckoutPath ? "" : "pb-20 md:pb-0"} overflow-x-hidden`}>
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
      {!isCheckoutPath && (
        <>
          <BottomNav />
          <InstallPrompt />
        </>
      )}
    </div>
  )
}
