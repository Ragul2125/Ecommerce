import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ShieldCheck, ArrowLeft, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("new");
  const [confirmedAddress, setConfirmedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: ""
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await api.get("/users/addresses");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAddresses(res.data);
          setSelectedAddressId(res.data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
    };
    fetchAddresses();
  }, []);

  const handleNextStep1 = async () => {
    let addrToConfirm;
    if (selectedAddressId === "new") {
      if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.country || !newAddress.zipCode) {
        return toast.error("Please fill in all address fields.");
      }
      try {
        const res = await api.post("/users/addresses", newAddress);
        setAddresses([...addresses, res.data.address]);
        setSelectedAddressId(res.data.address.id);
        addrToConfirm = res.data.address;
      } catch (err) {
        return toast.error("Failed to add address");
      }
    } else {
      addrToConfirm = addresses.find(a => a.id.toString() === selectedAddressId.toString());
    }
    setConfirmedAddress(addrToConfirm);
    setStep(2);
  };
  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);
  const shipping = subtotal > 8e3 || subtotal === 0 ? 0 : 500;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  if (items.length === 0) {
    return null;
  }
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate("/order-confirmation", { state: { address: confirmedAddress, total: Math.round(total) } });
      clearCart();
      toast.success("Order placed successfully!", {
        description: "Your acquisition is being prepared."
      });
    }, 2e3);
  };
  return <div className="flex flex-col gap-12 pb-40">
       <section className="px-6 pt-10">
          <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center justify-between"
  >
             <div className="space-y-1">
                <h1 className="text-4xl font-black font-heading tracking-tighter leading-none">Checkout.</h1>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Step {step} of 3 — Secure Payment</p>
             </div>
             <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => <div
    key={s}
    className={cn(
      "h-1.5 transition-all duration-500 rounded-full",
      s <= step ? "w-8 bg-primary" : "w-2 bg-muted"
    )}
  />)}
             </div>
          </motion.div>
       </section>

       <div className="flex flex-col gap-10 px-6 max-w-2xl mx-auto w-full">
          <AnimatePresence mode="wait">
             {step === 1 && <motion.div
    key="step1"
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98, y: -10 }}
    className="space-y-10"
  >
                  <div className="space-y-6">
                     <h2 className="text-2xl font-black font-heading tracking-tight leading-none">Logistics Detail.</h2>
                     <div className="grid gap-4">
                        <Input placeholder="Full Name" className="h-16 px-8 rounded-full" />
                        <Input placeholder="Email Address" type="email" className="h-16 px-8 rounded-full" />
                        
                        {addresses.length > 0 && (
                           <div className="relative w-full">
                              <select 
                                value={selectedAddressId} 
                                onChange={(e) => setSelectedAddressId(e.target.value)}
                                className="flex w-full border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-16 px-8 pr-16 rounded-full appearance-none cursor-pointer"
                              >
                                {addresses.map(addr => (
                                  <option key={addr.id} value={addr.id} className="bg-background text-foreground">
                                    {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}
                                  </option>
                                ))}
                                <option value="new" className="bg-background text-foreground font-bold text-primary">Add New Address</option>
                              </select>
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                 <ChevronDown className="h-5 w-5" />
                              </div>
                           </div>
                        )}

                        {selectedAddressId === "new" && (
                          <div className="space-y-4 pt-2">
                            <Input placeholder="Street Address" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="h-16 px-8 rounded-full" />
                            <div className="grid grid-cols-2 gap-4">
                               <Input placeholder="City" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="h-16 px-8 rounded-full" />
                               <Input placeholder="State" value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} className="h-16 px-8 rounded-full" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <Input placeholder="Country" value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} className="h-16 px-8 rounded-full" />
                               <Input placeholder="Zip Code" value={newAddress.zipCode} onChange={e => setNewAddress({...newAddress, zipCode: e.target.value})} className="h-16 px-8 rounded-full" />
                            </div>
                          </div>
                        )}
                     </div>
                  </div>
                  <Button
    onClick={handleNextStep1}
    className="w-full h-18 rounded-full bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-[1.01] active:scale-[0.98] transition-all"
  >
                     Review Payment
                  </Button>
               </motion.div>}

             {step === 2 && <motion.div
    key="step2"
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98, y: -10 }}
    className="space-y-10"
  >
                  <div className="space-y-6">
                     <h2 className="text-2xl font-black font-heading tracking-tight leading-none">Payment protocol.</h2>
                     <div className="grid grid-cols-1 gap-4">
                        <button className="p-6 rounded-[2.5rem] bg-primary text-primary-foreground flex items-center justify-between border-2 border-primary shadow-glow transition-all">
                           <div className="flex items-center gap-4">
                              <div className="h-6 w-6 rounded-full bg-primary-foreground flex items-center justify-center">
                                 <Check className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-black text-xs uppercase tracking-widest leading-none mt-0.5">Payment Architecture</span>
                           </div>
                           <ShieldCheck className="h-6 w-6 opacity-40" />
                        </button>
                     </div>

                     <div className="grid gap-4 pt-6">
                        <Input placeholder="Card Architecture Number" className="h-16 px-8 rounded-full" />
                        <div className="grid grid-cols-2 gap-4">
                           <Input placeholder="MM / YY" className="h-16 px-8 rounded-full text-center" />
                           <Input placeholder="CVV Code" className="h-16 px-8 rounded-full text-center" />
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Button
    variant="ghost"
    onClick={() => setStep(1)}
    className="rounded-full h-18 w-18 p-0 border border-border/10 hover:bg-muted"
  >
                        <ArrowLeft className="h-6 w-6" />
                     </Button>
                     <Button
    onClick={() => setStep(3)}
    className="flex-1 h-18 rounded-full bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-[1.01] active:scale-[0.98] transition-all"
  >
                        Final Audit
                     </Button>
                  </div>
               </motion.div>}

             {step === 3 && <motion.div
    key="step3"
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98, y: -10 }}
    className="space-y-10"
  >
                  <div className="space-y-6">
                     <h2 className="text-2xl font-black font-heading tracking-tight leading-none">Audit Summary.</h2>
                     <div className="rounded-[3rem] bg-primary text-primary-foreground p-10 space-y-8 shadow-glow relative overflow-hidden">
                         <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 blur-3xl -mr-20 -mt-20" />
                         
                         <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Core Value</span>
                               <span className="font-black tracking-tight text-lg">₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                               <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Logistics</span>
                               <span className="font-black tracking-tight text-lg">{shipping === 0 ? "FREE" : `\u20B9${shipping.toLocaleString()}`}</span>
                            </div>
                            <div className="pt-6 border-t border-primary-foreground/10 flex justify-between items-center">
                               <span className="text-lg font-bold opacity-60">Acquisition Total</span>
                               <span className="text-4xl font-black text-primary-foreground tracking-tighter">₹{Math.round(total).toLocaleString()}</span>
                            </div>
                         </div>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Button
    variant="ghost"
    onClick={() => setStep(2)}
    className="rounded-full h-18 w-18 p-0 border border-border/10 hover:bg-muted"
  >
                        <ArrowLeft className="h-6 w-6" />
                     </Button>
                     <Button
    onClick={handlePlaceOrder}
    disabled={isProcessing}
    className="flex-1 h-18 rounded-full bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-[1.01] active:scale-[0.98] transition-all"
  >
                        {isProcessing ? "Verifying..." : "Authorize Acquisition"}
                     </Button>
                  </div>
               </motion.div>}
          </AnimatePresence>
       </div>
    </div>;
}
export {
  CheckoutPage
};
