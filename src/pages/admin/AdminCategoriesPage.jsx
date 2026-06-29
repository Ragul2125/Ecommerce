import { useState } from "react";
import { Search, Plus, Trash2, Edit2, FolderTree, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
const initialCategories = [
  { id: "CAT-1", name: "Electronics", description: "Gadgets, devices, and accessories", productCount: 450, imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80" },
  { id: "CAT-2", name: "Clothing", description: "Apparel for men and women", productCount: 1200, imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80" },
  { id: "CAT-3", name: "Home & Garden", description: "Furniture, decor, and gardening tools", productCount: 320, imageUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80" }
];
function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", imageUrl: "" });
  const filteredCategories = categories.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAdd = () => {
    if (!formData.name.trim()) return toast.error("Category name is required");
    const newCat = {
      id: `CAT-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      productCount: 0,
      imageUrl: formData.imageUrl
    };
    setCategories([...categories, newCat]);
    toast.success("Category added successfully");
    setIsAddOpen(false);
    setFormData({ name: "", description: "", imageUrl: "" });
  };
  const handleEdit = () => {
    if (!editCategory) return;
    if (!formData.name.trim()) return toast.error("Category name is required");
    setCategories(categories.map(
      (c) => c.id === editCategory.id ? { ...c, name: formData.name, description: formData.description, imageUrl: formData.imageUrl } : c
    ));
    toast.success("Category updated successfully");
    setEditCategory(null);
  };
  const handleDelete = () => {
    if (!deleteId) return;
    setCategories(categories.filter((c) => c.id !== deleteId));
    toast.success("Category deleted successfully");
    setDeleteId(null);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl: url });
    }
  };
  const removeImage = () => {
    setFormData({ ...formData, imageUrl: "" });
  };
  const openEdit = (cat) => {
    setFormData({ name: cat.name, description: cat.description, imageUrl: cat.imageUrl || "" });
    setEditCategory(cat);
  };
  return <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight font-heading">Manage Categories</h1>
          <p className="text-sm text-muted-foreground">Organize your store's product catalog.</p>
        </div>
        <Button onClick={() => {
    setFormData({ name: "", description: "", imageUrl: "" });
    setIsAddOpen(true);
  }} className="rounded-full h-12 px-6 bg-primary text-primary-foreground font-black text-xs uppercase tracking-wider cursor-pointer">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
    placeholder="Search categories..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 h-12 rounded-2xl bg-muted/30 border-border/50 focus-visible:bg-background"
  />
        </div>
      </div>
      <div className="glass rounded-[2rem] overflow-hidden shadow-premium border border-border/40 bg-card">
        {filteredCategories.length === 0 ? <div className="p-16 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 text-muted-foreground mx-auto">
              <FolderTree className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg">No Categories Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                Try searching for something else or add a new category.
              </p>
            </div>
          </div> : <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <th className="p-6">Category Name</th>
                  <th className="p-6">Description</th>
                  <th className="p-6">Products</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredCategories.map((cat) => <tr key={cat.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 overflow-hidden flex items-center justify-center text-primary shrink-0 border border-primary/20">
                          {cat.imageUrl ? <img src={cat.imageUrl} alt={cat.name} className="h-full w-full object-cover" /> : <FolderTree className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{cat.name}</h4>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">{cat.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-sm text-muted-foreground max-w-xs truncate">{cat.description}</td>
                    <td className="p-6 text-sm font-medium">{cat.productCount}</td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
    onClick={() => openEdit(cat)}
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
  >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
    onClick={() => setDeleteId(cat.id)}
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
  >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new category for products.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Electronics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Input id="desc" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Short description..." />
            </div>
            <div className="space-y-2">
              <Label>Category Image</Label>
              {formData.imageUrl ? <div className="relative h-32 w-full rounded-lg overflow-hidden border border-border/50 bg-muted flex items-center justify-center">
                  <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  <Button
    variant="destructive"
    size="icon"
    className="absolute top-2 right-2 h-7 w-7 rounded-full"
    onClick={removeImage}
  >
                    <X className="h-4 w-4" />
                  </Button>
                </div> : <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 border-border transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                      <Upload className="w-8 h-8 mb-2" />
                      <p className="text-sm font-medium">Click to upload image</p>
                      <p className="text-xs">SVG, PNG, JPG or GIF</p>
                    </div>
                    <Input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!editCategory} onOpenChange={(open) => !open && setEditCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-desc">Description</Label>
              <Input id="edit-desc" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Category Image</Label>
              {formData.imageUrl ? <div className="relative h-32 w-full rounded-lg overflow-hidden border border-border/50 bg-muted flex items-center justify-center">
                  <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  <Button
    variant="destructive"
    size="icon"
    className="absolute top-2 right-2 h-7 w-7 rounded-full"
    onClick={removeImage}
  >
                    <X className="h-4 w-4" />
                  </Button>
                </div> : <div className="flex items-center justify-center w-full">
                  <label htmlFor="edit-dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 border-border transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                      <Upload className="w-8 h-8 mb-2" />
                      <p className="text-sm font-medium">Click to upload image</p>
                      <p className="text-xs">SVG, PNG, JPG or GIF</p>
                    </div>
                    <Input id="edit-dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCategory(null)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This will not delete the associated products but will remove them from this category.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}
export {
  AdminCategoriesPage
};
