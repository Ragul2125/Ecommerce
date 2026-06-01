import { Link } from "react-router-dom"
import {  } from "lucide-react" // Empty for now to debug

export function Footer() {
  return (
    <footer className="border-t bg-muted/20 pb-8 pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold font-heading">E</span>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                Ecommerce
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Experience the pinnacle of online shopping. We offer premium handcrafted goods with uncompromising quality and attention to detail.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              {/* <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Github className="h-5 w-5" /></a> */}
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/categories/new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/categories/bestsellers" className="hover:text-primary transition-colors">Bestsellers</Link></li>
              <li><Link to="/categories/sale" className="hover:text-primary transition-colors">On Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Information</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-foreground">USD ($)</span>
            <span className="cursor-pointer hover:text-foreground">English</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
