import { useEffect, useState } from "react";
import { Save, ShieldAlert, Store, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sellerService } from "@/features/seller/services/sellerService";
function SellerSettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [address, setAddress] = useState("");
  const [shippingRate, setShippingRate] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      try {
        const settings = await sellerService.getStoreSettings();
        setStoreName(settings.name);
        setEmail(settings.email);
        setPhone(settings.phone);
        setCurrency(settings.currency);
        setAddress(settings.address);
        setShippingRate(settings.shippingRate.toString());
        setTaxRate(settings.taxRate.toString());
      } catch (error) {
        console.error("Failed to load settings", error);
        toast.error("Failed to load store settings");
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeName.trim()) return toast.error("Store Name is required");
    if (!email.trim()) return toast.error("Support Email is required");
    if (!phone.trim()) return toast.error("Support Phone is required");
    if (!shippingRate || isNaN(Number(shippingRate))) return toast.error("Valid shipping rate is required");
    if (!taxRate || isNaN(Number(taxRate))) return toast.error("Valid tax rate is required");
    setIsSaving(true);
    try {
      await sellerService.updateStoreSettings({
        name: storeName,
        email,
        phone,
        currency,
        address,
        shippingRate: Number(shippingRate),
        taxRate: Number(taxRate)
      });
      toast.success("Store configurations updated successfully", {
        description: "All endpoints have been synchronized with your updates."
      });
    } catch (error) {
      console.error("Failed to save settings", error);
      toast.error("Failed to update configurations");
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return <div className="space-y-6 max-w-3xl">
        <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
        <div className="h-[400px] w-full bg-muted animate-pulse rounded-[2.5rem]" />
      </div>;
  }
  return <div className="space-y-6 max-w-3xl animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight font-heading">Store Settings</h1>
        <p className="text-sm text-muted-foreground">Configure profile parameters, contacts, currency, and shipping metrics.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {
    /* Core Store Info */
  }
        <div className="glass rounded-[2.5rem] p-8 border border-border/40 shadow-premium space-y-6 bg-background/50">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2 flex items-center gap-2">
              <Store className="h-4 w-4" /> Identity & Profile
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Boutique Name</label>
                <Input
    value={storeName}
    onChange={(e) => setStoreName(e.target.value)}
    placeholder="e.g. ShopFlow Concept Store"
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold focus-visible:bg-background"
    required
  />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Support Email</label>
                <Input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="curator@shopflow.design"
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold focus-visible:bg-background"
    required
  />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Support Hot-line</label>
                <Input
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="+91 98765 43210"
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold focus-visible:bg-background"
    required
  />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Store Currency</label>
                <select
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
    className="w-full h-14 rounded-2xl bg-muted/30 border border-border/50 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
  >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Physical Dispatch Address</label>
              <textarea
    placeholder="HQ warehouse location..."
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    rows={3}
    className="w-full rounded-2xl bg-muted/30 border border-border/50 p-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
    required
  />
            </div>
          </div>

          {
    /* Logistics Settings */
  }
          <div className="space-y-4 pt-4 border-t border-border/40">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2 flex items-center gap-2">
              <Truck className="h-4 w-4" /> Logistics & Customization
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Flat Shipping Rate (₹)</label>
                <Input
    type="number"
    value={shippingRate}
    onChange={(e) => setShippingRate(e.target.value)}
    placeholder="e.g. 500"
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold focus-visible:bg-background"
    required
  />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Standard Store GST/Tax (%)</label>
                <Input
    type="number"
    value={taxRate}
    onChange={(e) => setTaxRate(e.target.value)}
    placeholder="e.g. 18"
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold focus-visible:bg-background"
    required
  />
              </div>
            </div>
          </div>

          {
    /* Warnings and alerts */
  }
          <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex gap-4 text-amber-700 dark:text-amber-500 items-start">
            <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-black uppercase tracking-wider leading-none">Security Override</h4>
              <p className="text-[10px] font-medium leading-relaxed">
                Updating contact settings affects dispatch headers and receipts. Ensure tax values correspond to local statutory regulations.
              </p>
            </div>
          </div>
        </div>

        {
    /* Save button */
  }
        <div className="flex items-center justify-end">
          <Button
    type="submit"
    disabled={isSaving}
    className="rounded-full h-14 px-10 bg-primary text-primary-foreground font-black uppercase text-xs tracking-wider shadow-lg flex items-center justify-center cursor-pointer"
  >
            <Save className="h-4 w-4 mr-2" /> {isSaving ? "Saving..." : "Save Configurations"}
          </Button>
        </div>
      </form>
    </div>;
}
export {
  SellerSettingsPage
};
