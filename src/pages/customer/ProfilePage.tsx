import { useState } from "react"
import { User, MapPin, CreditCard, LogOut, Loader2, Home } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/store/authStore"
import { toast } from "sonner"

import { motion, AnimatePresence } from "framer-motion"

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success("Profile updated successfully", {
        description: "Your technical records have been synchronized.",
      })
    }, 1500)
  }

  const handleLogout = () => {
    logout()
    toast.success("Successfully logged out")
    navigate("/")
  }

  if (!user) return null

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col gap-16 pb-40">
      {/* 1. Profile Core Header */}
      <section className="px-6 pt-10">
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-border/10"
         >
            <div className="flex items-center gap-6">
                <div className="relative group">
                   <div className="absolute inset-0 bg-primary blur-3xl opacity-0 group-hover:opacity-10 transition-opacity" />
                   <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white dark:border-zinc-800 shadow-premium group-hover:scale-105 transition-all duration-500">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl font-black bg-muted">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                   </Avatar>
                </div>
                <div className="space-y-1">
                   <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tighter leading-none">{user.name.split(' ')[0]}.</h1>
                   <div className="flex items-center gap-3">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{user.email}</p>
                   </div>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/">
                <Button 
                  variant="outline" 
                  className="rounded-full h-14 px-8 border-border/10 hover:bg-primary/5 text-[10px] font-black uppercase tracking-widest transition-all w-full sm:w-auto" 
                >
                  <Home className="mr-3 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="rounded-full h-14 px-8 border-border/10 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 text-[10px] font-black uppercase tracking-widest transition-all" 
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Terminate Session
              </Button>
            </div>
         </motion.div>
      </section>

      {/* 2. Control Architecture (Tabs) */}
      <section className="px-6 flex flex-col md:flex-row gap-12 max-w-7xl mx-auto w-full">
          <Tabs defaultValue="profile" className="w-full">
            <div className="flex flex-col md:flex-row gap-12">
               <aside className="w-full md:w-72 shrink-0">
                  <TabsList className="flex md:flex-col items-stretch h-auto bg-transparent gap-2 p-0">
                    <TabsTrigger value="profile" className="flex-1 md:flex-none justify-start px-8 h-18 rounded-[2rem] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-500 text-[10px] font-black uppercase tracking-widest border border-border/10">
                       <User className="mr-3 h-4 w-4" /> Identity
                    </TabsTrigger>
                    <TabsTrigger value="addresses" className="flex-1 md:flex-none justify-start px-8 h-18 rounded-[2rem] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-500 text-[10px] font-black uppercase tracking-widest border border-border/10">
                       <MapPin className="mr-3 h-4 w-4" /> Logistics
                    </TabsTrigger>
                    <TabsTrigger value="payments" className="flex-1 md:flex-none justify-start px-8 h-18 rounded-[2rem] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-all duration-500 text-[10px] font-black uppercase tracking-widest border border-border/10">
                       <CreditCard className="mr-3 h-4 w-4" /> Vault
                    </TabsTrigger>
                  </TabsList>
               </aside>
               
               <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <TabsContent value="profile" className="mt-0 outline-none">
                       <motion.div 
                         variants={containerVariants}
                         initial="hidden"
                         animate="show"
                         className="space-y-12"
                       >
                          <motion.div variants={itemVariants} className="space-y-1">
                             <h3 className="text-2xl font-black font-heading tracking-tight">Identity Matrix.</h3>
                             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Synchronization of personal records</p>
                          </motion.div>

                          <form onSubmit={handleSave} className="space-y-10 max-w-2xl">
                             <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                               <div className="space-y-3">
                                 <Label className="text-[9px] font-black uppercase tracking-widest ml-4 opacity-40">Surname Allocation</Label>
                                 <Input className="h-16 px-8 rounded-full bg-muted/20 border-border/10" defaultValue={user.name.split(' ')[0]} />
                               </div>
                               <div className="space-y-3">
                                 <Label className="text-[9px] font-black uppercase tracking-widest ml-4 opacity-40">Family Identifier</Label>
                                 <Input className="h-16 px-8 rounded-full bg-muted/20 border-border/10" defaultValue={user.name.split(' ').slice(1).join(' ')} />
                               </div>
                             </motion.div>

                             <motion.div variants={itemVariants} className="space-y-3">
                               <Label className="text-[9px] font-black uppercase tracking-widest ml-4 opacity-40">Digital Coordinate</Label>
                               <Input className="h-16 px-8 rounded-full bg-muted/20 border-border/10" type="email" defaultValue={user.email} />
                             </motion.div>

                             <motion.div variants={itemVariants} className="pt-6">
                                <Button 
                                  type="submit" 
                                  disabled={isSaving}
                                  className="w-full sm:w-auto px-12 h-18 rounded-full bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                  {isSaving && <Loader2 className="mr-3 h-4 w-4 animate-spin" />}
                                  {isSaving ? "Synchronizing..." : "Update Architecture"}
                                </Button>
                             </motion.div>
                          </form>
                       </motion.div>
                    </TabsContent>

                    <TabsContent value="addresses" className="mt-0 outline-none">
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="h-[500px] flex flex-col items-center justify-center text-center p-12 bg-muted/10 rounded-[4rem] border border-border/10"
                       >
                          <div className="h-24 w-24 rounded-full bg-muted/20 flex items-center justify-center mb-8 border border-border/5">
                             <MapPin className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                          <h3 className="text-2xl font-black font-heading tracking-tight mb-2">No Active Nodes.</h3>
                          <p className="text-xs text-muted-foreground font-medium max-w-[280px] leading-relaxed mx-auto mb-10">
                             Logistics coordinates have not been established within your current matrix.
                          </p>
                          <Button variant="outline" className="rounded-full h-16 px-10 border-border/10 text-[10px] font-black uppercase tracking-widest">
                             Establish Node
                          </Button>
                       </motion.div>
                    </TabsContent>

                    <TabsContent value="payments" className="mt-0 outline-none">
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="h-[500px] flex flex-col items-center justify-center text-center p-12 bg-muted/10 rounded-[4rem] border border-border/10"
                       >
                          <div className="h-24 w-24 rounded-full bg-muted/20 flex items-center justify-center mb-8 border border-border/5">
                             <CreditCard className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                          <h3 className="text-2xl font-black font-heading tracking-tight mb-2">Vault Uninitialized.</h3>
                          <p className="text-xs text-muted-foreground font-medium max-w-[280px] leading-relaxed mx-auto mb-10">
                             Secure payment protocols have not been integrated into your identity vault.
                          </p>
                          <Button variant="outline" className="rounded-full h-16 px-10 border-border/10 text-[10px] font-black uppercase tracking-widest">
                             Authorize Vault
                          </Button>
                       </motion.div>
                    </TabsContent>
                  </AnimatePresence>
               </div>
            </div>
          </Tabs>
      </section>
    </div>
  )
}

