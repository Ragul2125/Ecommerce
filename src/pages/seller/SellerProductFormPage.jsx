import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sellerService } from "@/features/seller/services/sellerService";
function SellerProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isEditMode && id) {
      async function loadProduct() {
        setIsLoading(true);
        try {
          if (!id) return;
          const product = await sellerService.getProductById(id);
          if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price.toString());
            setSalePrice(product.salePrice ? product.salePrice.toString() : "");
            setCategory(product.category);
            setInStock(product.inStock);
            setIsFeatured(product.isFeatured);
            setIsNew(product.isNew);
            setImages(product.images);
          } else {
            toast.error("Product not found");
            navigate("/seller/products");
          }
        } catch (error) {
          console.error("Failed to load product details", error);
          toast.error("Failed to load product details");
        } finally {
          setIsLoading(false);
        }
      }
      loadProduct();
    }
  }, [id, isEditMode, navigate]);
  const handleAddImageUrl = () => {
    if (imageUrlInput.trim() !== "") {
      setImages((prev) => [...prev, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };
  const handleRemoveImageUrl = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    if (!description.trim()) return toast.error("Description is required");
    if (!price || isNaN(Number(price)) || Number(price) <= 0) return toast.error("Valid price is required");
    if (salePrice && (isNaN(Number(salePrice)) || Number(salePrice) <= 0)) return toast.error("Valid sale price is required");
    if (images.length === 0) return toast.error("At least one product image is required");
    const productPayload = {
      name,
      description,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : void 0,
      category,
      inStock,
      isFeatured,
      isNew,
      images
    };
    setIsLoading(true);
    try {
      if (isEditMode && id) {
        await sellerService.updateProduct(id, productPayload);
        toast.success("Product updated successfully");
      } else {
        await sellerService.createProduct(productPayload);
        toast.success("Product created successfully");
      }
      navigate("/seller/products");
    } catch (error) {
      console.error("Failed to save product", error);
      toast.error("Failed to save product details");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading && isEditMode) {
    return <div className="space-y-6 max-w-3xl mx-auto">
        <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
        <div className="h-[500px] w-full bg-muted animate-pulse rounded-3xl" />
      </div>;
  }
  return <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-4">
        <Button
    onClick={() => navigate("/seller/products")}
    variant="ghost"
    size="icon"
    className="rounded-full bg-muted/40 hover:bg-muted/80 h-10 w-10 shrink-0"
  >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-black tracking-tight font-heading">
            {isEditMode ? "Edit Product" : "New Luxury Product"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isEditMode ? "Modify design, price, and specs." : "Publish a new piece to the collection."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass rounded-[2.5rem] p-8 border border-border/40 shadow-premium space-y-6 bg-background/50">
          
          {
    /* Main Info */
  }
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Narrative & Identity</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Product Name</label>
              <Input
    placeholder="e.g. Minimalist Cashmere Trench"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold text-foreground focus-visible:bg-background"
    required
  />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Verbal Narrative (Description)</label>
              <textarea
    placeholder="Describe fit, silhouette, craftsmanship, and styling details..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={5}
    className="w-full rounded-2xl bg-muted/30 border border-border/50 p-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
    required
  />
            </div>
          </div>

          {
    /* Pricing & Logistics */
  }
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Logistics & Value</h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Original Price (₹)</label>
                <Input
    placeholder="e.g. 25000"
    type="number"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold text-foreground focus-visible:bg-background"
    required
  />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Sale Price (₹ - Optional)</label>
                <Input
    placeholder="e.g. 21000"
    type="number"
    value={salePrice}
    onChange={(e) => setSalePrice(e.target.value)}
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold text-foreground focus-visible:bg-background"
  />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Classification</h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Category</label>
                <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full h-14 rounded-2xl bg-muted/30 border border-border/50 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
  >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Accessories">Accessories</option>
                  <option value="New Arrivals">New Arrivals</option>
                </select>
              </div>

              {
    /* Status Toggles */
  }
              <div className="pt-2 grid grid-cols-3 gap-2">
                <button
    type="button"
    onClick={() => setInStock((prev) => !prev)}
    className={`h-14 rounded-2xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-center transition-all ${inStock ? "bg-green-500/10 border-green-500/30 text-green-600" : "bg-destructive/10 border-destructive/30 text-destructive"}`}
  >
                  {inStock ? "In Stock" : "No Stock"}
                </button>
                <button
    type="button"
    onClick={() => setIsFeatured((prev) => !prev)}
    className={`h-14 rounded-2xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-center transition-all ${isFeatured ? "bg-primary text-primary-foreground border-primary" : "bg-muted/20 border-border/50 text-muted-foreground"}`}
  >
                  Featured
                </button>
                <button
    type="button"
    onClick={() => setIsNew((prev) => !prev)}
    className={`h-14 rounded-2xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-center transition-all ${isNew ? "bg-primary text-primary-foreground border-primary" : "bg-muted/20 border-border/50 text-muted-foreground"}`}
  >
                  New Style
                </button>
              </div>
            </div>
          </div>

          {
    /* Images Curator */
  }
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">Visual Editorial Assets</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Add Image URL</label>
              <div className="flex gap-3">
                <Input
    placeholder="https://images.unsplash.com/photo-..."
    value={imageUrlInput}
    onChange={(e) => setImageUrlInput(e.target.value)}
    className="h-14 rounded-2xl bg-muted/30 border-border/50 px-6 text-sm font-bold text-foreground focus-visible:bg-background"
  />
                <Button
    type="button"
    onClick={handleAddImageUrl}
    className="h-14 rounded-2xl bg-primary text-primary-foreground font-black text-xs px-6 uppercase tracking-wider cursor-pointer"
  >
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
            </div>

            {
    /* Previews grid */
  }
            {images.length > 0 ? <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {images.map((img, i) => <div key={i} className="group relative aspect-square rounded-2xl border overflow-hidden bg-muted shadow-sm border-border/40">
                    <img src={img} alt={`Preview ${i}`} className="h-full w-full object-cover" />
                    <button
    type="button"
    onClick={() => handleRemoveImageUrl(i)}
    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/80 hover:bg-background text-foreground flex items-center justify-center shadow-md scale-90 group-hover:scale-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
  >
                      <X className="h-4 w-4" />
                    </button>
                  </div>)}
              </div> : <div className="p-8 border border-dashed rounded-3xl flex flex-col items-center justify-center text-muted-foreground text-center gap-2 border-border/50 bg-muted/10">
                <ImageIcon className="h-8 w-8 opacity-40 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">No images uploaded yet.</span>
              </div>}
          </div>
        </div>

        {
    /* Form Actions */
  }
        <div className="flex items-center justify-end gap-4">
          <Button
    type="button"
    variant="outline"
    onClick={() => navigate("/seller/products")}
    className="rounded-full h-14 px-8 border-2 font-black uppercase text-xs tracking-wider cursor-pointer"
  >
            Cancel
          </Button>
          <Button
    type="submit"
    disabled={isLoading}
    className="rounded-full h-14 px-10 bg-primary text-primary-foreground font-black uppercase text-xs tracking-wider shadow-lg cursor-pointer"
  >
            {isLoading ? "Curating..." : isEditMode ? "Save Edits" : "Publish Piece"}
          </Button>
        </div>
      </form>
    </div>;
}
export {
  SellerProductFormPage
};
