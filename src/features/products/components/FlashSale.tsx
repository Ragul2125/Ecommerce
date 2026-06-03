import { useEffect, useState } from "react"
import { Flame } from "lucide-react"

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 }
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 }
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const TimeBlock = ({ val }: { val: number }) => {
    const display = val < 10 ? `0${val}` : val
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground text-primary font-black shadow-md border border-primary-foreground/10">
        {display}
      </div>
    )
  }

  const flashItems = [
    { id: 'f1', name: 'Velvet Evening Bag', price: 24070, salePrice: 12035, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80' },
    { id: 'f2', name: 'Silk Pocket Square', price: 7055, salePrice: 3486, image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400&q=80' },
    { id: 'f3', name: 'Suede Loafers', price: 34860, salePrice: 17430, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80' },
  ]

  return (
    <div className="mx-4 overflow-hidden rounded-[2.5rem] bg-primary p-8 text-primary-foreground shadow-premium relative border border-primary/5">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-primary-foreground/10 p-3 rounded-2xl backdrop-blur-md">
            <Flame className="h-6 w-6 fill-current text-primary-foreground animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl font-black font-heading tracking-tight leading-none">Flash Sale</h3>
            <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Architectural Reductions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <TimeBlock val={timeLeft.h} />
          <span className="text-xl font-bold text-primary-foreground/60 animate-pulse">:</span>
          <TimeBlock val={timeLeft.m} />
          <span className="text-xl font-bold text-primary-foreground/60 animate-pulse">:</span>
          <TimeBlock val={timeLeft.s} />
          <span className="ml-2 text-[10px] font-black uppercase tracking-widest bg-primary-foreground/15 text-primary-foreground px-4 py-2 rounded-full border border-primary-foreground/5">LEFT</span>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar relative z-10">
         {flashItems.map(item => (
           <div 
             key={item.id} 
             className="min-w-[220px] md:min-w-[240px] bg-card text-card-foreground rounded-[2rem] p-4 flex flex-col gap-4 group active:scale-[0.98] hover:scale-[1.02] border border-border/40 hover:border-primary/20 shadow-sm hover:shadow-premium transition-all duration-500 cursor-pointer"
           >
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-muted/20 border border-border/10">
                 <img 
                   src={item.image} 
                   alt={item.name} 
                   className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                 />
                 <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[8px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-premium">
                    -50%
                 </div>
              </div>
              
              <div className="px-1 space-y-2">
                 <h4 className="text-xs font-black uppercase tracking-wider text-foreground/80 group-hover:text-primary transition-colors line-clamp-1">
                   {item.name}
                 </h4>
                 <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-[10px] font-bold text-muted-foreground opacity-50">₹</span>
                       <span className="text-lg font-black text-primary tracking-tighter">
                         {item.salePrice.toLocaleString()}
                       </span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/60 line-through decoration-destructive/50">
                      ₹{item.price.toLocaleString()}
                    </span>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  )
}
