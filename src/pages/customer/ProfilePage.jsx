import { useState, useEffect } from "react";
import { User, MapPin, CreditCard, LogOut, Loader2, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import { userService } from "@/services/userService";
function ProfilePage() {
  const navigate = useNavigate();
  const { user, token, setAuth, logout } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  useEffect(() => {
    if (user) {
      setFirstName(user.name.split(" ")[0] || "");
      setLastName(user.name.split(" ").slice(1).join(" ") || "");
      setEmail(user.email || "");
      fetchAddresses();
    }
  }, [user]);
  const fetchAddresses = async () => {
    try {
      setIsLoadingAddresses(true);
      const data = await userService.getAddresses();
      if (Array.isArray(data)) {
        setAddresses(data);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
    } finally {
      setIsLoadingAddresses(false);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsSaving(true);
    try {
      await userService.updateProfile({ 
        name: `${firstName.trim()} ${lastName.trim()}`, 
        email: email.trim() 
      });
      if (user && token) {
        setAuth({
          ...user,
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim()
        }, token);
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };
  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
    navigate("/");
  };
  if (!user) return null;
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  return <div className="flex flex-col gap-10 pb-40">
      <section className="px-6 pt-6">
         <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/10"
  >
            <div className="flex items-center gap-5">
                <div className="relative group">
                   <div className="absolute inset-0 bg-primary blur-3xl opacity-0 group-hover:opacity-10 transition-opacity" />
                   <Avatar className="h-20 w-20 md:h-28 md:w-28 border-4 border-white dark:border-zinc-800 shadow-premium shrink-0">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xl font-black bg-muted">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                   </Avatar>
                </div>
                <div className="space-y-0.5">
                   <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tighter leading-none">{user.name.split(" ")[0]}.</h1>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                      <p className="text-xs font-semibold text-muted-foreground lowercase tracking-wide">{user.email}</p>
                   </div>
                </div>
            </div>
            <div className="flex flex-row items-center gap-3 w-full md:w-auto">
              <Link to="/" className="flex-1 md:flex-none">
                <Button
    variant="outline"
    className="rounded-full h-12 px-6 border-border/10 hover:bg-primary/5 text-[10px] font-black uppercase tracking-wider transition-all w-full cursor-pointer"
  >
                  <Home className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
              <Button
    variant="outline"
    className="flex-1 md:flex-none rounded-full h-12 px-6 border-border/10 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
    onClick={handleLogout}
  >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
         </motion.div>
      </section>
      <section className="px-6 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full">
          <Tabs defaultValue="profile" className="w-full">
            <div className="flex flex-col md:flex-row gap-8">
               <aside className="w-full md:w-72 shrink-0">
                  <TabsList className="flex md:flex-col overflow-x-auto no-scrollbar items-center md:items-stretch h-auto bg-transparent gap-2 p-1 w-full pb-3 md:pb-0 border-b md:border-b-0 border-border/10 justify-start">
                    <TabsTrigger value="profile" className="flex-1 md:flex-none shrink-0 whitespace-nowrap justify-center md:justify-start px-6 h-12 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-[10px] font-black uppercase tracking-wider border border-border/10 cursor-pointer">
                       <User className="mr-2 h-4 w-4" /> Personal Profile
                    </TabsTrigger>
                    <TabsTrigger value="addresses" className="flex-1 md:flex-none shrink-0 whitespace-nowrap justify-center md:justify-start px-6 h-12 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-[10px] font-black uppercase tracking-wider border border-border/10 cursor-pointer">
                       <MapPin className="mr-2 h-4 w-4" /> Shipping Addresses
                    </TabsTrigger>
                    <TabsTrigger value="payments" className="flex-1 md:flex-none shrink-0 whitespace-nowrap justify-center md:justify-start px-6 h-12 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-[10px] font-black uppercase tracking-wider border border-border/10 cursor-pointer">
                       <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                    </TabsTrigger>
                  </TabsList>
               </aside>
               <div className="flex-1 w-full">
                  <AnimatePresence mode="wait">
                    <TabsContent value="profile" className="mt-0 outline-none w-full">
                       <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="space-y-8 w-full"
  >
                          <div className="space-y-1">
                             <h3 className="text-xl font-black font-heading tracking-tight">Personal Profile</h3>
                             <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Manage your account settings and contact info</p>
                          </div>
                          <form onSubmit={handleSave} className="space-y-6 max-w-2xl w-full">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <div className="space-y-2">
                                 <Label className="text-[9px] font-black uppercase tracking-widest ml-2 opacity-55">First Name</Label>
                                 <Input
    className="h-14 rounded-2xl bg-muted/40 border border-border/60 px-6 text-sm font-bold text-foreground focus-visible:bg-background"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />
                               </div>
                               <div className="space-y-2">
                                 <Label className="text-[9px] font-black uppercase tracking-widest ml-2 opacity-55">Last Name</Label>
                                 <Input
    className="h-14 rounded-2xl bg-muted/40 border border-border/60 px-6 text-sm font-bold text-foreground focus-visible:bg-background"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
  />
                               </div>
                             </div>
                             <div className="space-y-2">
                               <Label className="text-[9px] font-black uppercase tracking-widest ml-2 opacity-55">Email Address</Label>
                               <Input
    className="h-14 rounded-2xl bg-muted/40 border border-border/60 px-6 text-sm font-bold text-foreground focus-visible:bg-background"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
                             </div>
                             <div className="pt-4">
                                 <Button
    type="submit"
    disabled={isSaving}
    className="w-full sm:w-auto px-10 h-14 rounded-full bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
  >
                                   {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                   {isSaving ? "Saving..." : "Save Changes"}
                                 </Button>
                              </div>
                          </form>
                       </motion.div>
                    </TabsContent>
                    <TabsContent value="addresses" className="mt-0 outline-none w-full">
                       {isLoadingAddresses ? (
                         <div className="h-[400px] flex items-center justify-center">
                           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                         </div>
                       ) : addresses.length === 0 ? (
                         <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="h-[400px] flex flex-col items-center justify-center text-center p-8 bg-muted/10 rounded-[2.5rem] border border-border/10"
                         >
                           <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center mb-6 border border-border/5">
                              <MapPin className="h-7 w-7 text-muted-foreground/30" />
                           </div>
                           <h3 className="text-xl font-black font-heading tracking-tight mb-2">No Saved Addresses</h3>
                           <p className="text-xs text-muted-foreground font-medium max-w-[280px] leading-relaxed mx-auto mb-8">
                              You haven't saved any shipping addresses yet. Add one to speed up checkout.
                           </p>
                           <Button variant="outline" className="rounded-full h-14 px-8 border-border/10 text-[10px] font-black uppercase tracking-widest cursor-pointer">
                              Add New Address
                           </Button>
                         </motion.div>
                       ) : (
                         <motion.div
                           variants={containerVariants}
                           initial="hidden"
                           animate="show"
                           className="grid grid-cols-1 md:grid-cols-2 gap-4"
                         >
                           {addresses.map((address) => (
                             <motion.div 
                               key={address.id}
                               variants={containerVariants.show.transition}
                               className="p-6 rounded-[2rem] border border-border/20 bg-muted/5 flex flex-col gap-2 hover:bg-muted/10 transition-colors"
                             >
                               <div className="flex items-center gap-3 mb-2">
                                 <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                   <MapPin className="h-4 w-4 text-primary" />
                                 </div>
                                 <h4 className="font-bold text-sm">{address.street}</h4>
                               </div>
                               <div className="pl-13 space-y-1 text-sm text-muted-foreground">
                                 <p>{address.city}, {address.state}</p>
                                 <p>{address.country} • {address.zipCode}</p>
                               </div>
                             </motion.div>
                           ))}
                         </motion.div>
                       )}
                    </TabsContent>
                    <TabsContent value="payments" className="mt-0 outline-none w-full">
                       <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="h-[400px] flex flex-col items-center justify-center text-center p-8 bg-muted/10 rounded-[2.5rem] border border-border/10"
  >
                          <div className="h-20 w-20 rounded-full bg-muted/20 flex items-center justify-center mb-6 border border-border/5">
                             <CreditCard className="h-7 w-7 text-muted-foreground/30" />
                          </div>
                          <h3 className="text-xl font-black font-heading tracking-tight mb-2">No Saved Payment Methods</h3>
                          <p className="text-xs text-muted-foreground font-medium max-w-[280px] leading-relaxed mx-auto mb-8">
                             Securely store your cards and payment details for faster checkouts.
                          </p>
                          <Button variant="outline" className="rounded-full h-14 px-8 border-border/10 text-[10px] font-black uppercase tracking-widest cursor-pointer">
                             Add Payment Method
                          </Button>
                       </motion.div>
                    </TabsContent>
                  </AnimatePresence>
               </div>
            </div>
          </Tabs>
      </section>
    </div>;
}
export {
  ProfilePage
};
