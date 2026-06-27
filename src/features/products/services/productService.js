import api from '../../../lib/api';
import { mockSuperCategories, mockCategories } from "@/utils/mockData";

const productService = {
  async getProducts(params) {
    try {
      const response = await api.get('/products/all');
      let result = response.data.products || response.data;
      
      // Map backend model to frontend model
      result = result.map(p => ({
        ...p,
        salePrice: p.sale_price || p.salePrice || null,
        images: Array.isArray(p.images) ? p.images.map(img => img?.url || img) : [],
        category: p.category?.name || p.category || "Uncategorized",
        categoryId: p.category?.id || p.category_id,
        categorySlug: p.category?.slug,
        rating: p.rating || 4.5,
        inStock: p.is_active !== false,
        isFeatured: p.isFeatured !== undefined ? p.isFeatured : true,
        isNew: p.isNew !== undefined ? p.isNew : true
      }));
      
      // We apply frontend filtering if the backend doesn't support query params yet
      if (params?.category) {
        result = result.filter(
          (p) =>
            (p.categorySlug && p.categorySlug.toLowerCase() === params.category.toLowerCase()) ||
            (p.category && p.category.toLowerCase() === params.category.toLowerCase()) ||
            (p.id && p.id.toLowerCase().includes(params.category.toLowerCase()))
        );
      }
      if (params?.featured) {
        // Assume isFeatured flag exists or filter appropriately
        result = result.filter((p) => p.isFeatured);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        result = result.filter(
          (p) =>
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q))
        );
      }
      return result;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  },
  
  async getProductById(id) {
    try {
      const response = await api.get('/products/all');
      let products = response.data.products || response.data;
      
      products = products.map(p => ({
        ...p,
        salePrice: p.sale_price || p.salePrice || null,
        images: Array.isArray(p.images) ? p.images.map(img => img?.url || img) : [],
        category: p.category?.name || p.category || "Uncategorized",
        categoryId: p.category?.id || p.category_id,
        categorySlug: p.category?.slug,
        rating: p.rating || 4.5,
        inStock: p.is_active !== false,
        isFeatured: p.isFeatured !== undefined ? p.isFeatured : true,
        isNew: p.isNew !== undefined ? p.isNew : true
      }));
      
      return products.find((p) => p.id === id);
    } catch (error) {
      console.error("Failed to fetch product by id:", error);
      return undefined;
    }
  },
  
  async getCategories(superCategoryId) {
    try {
      const response = await api.get('/categories');
      let categories = response.data;
      
      if (superCategoryId) {
        // If backend category has superCategoryId, filter it. Else we just return mock categories for this
        // to not break the UI if backend schema is different.
        if (categories.some(c => c.superCategoryId !== undefined)) {
            return categories.filter((c) => c.superCategoryId === superCategoryId);
        } else {
            return mockCategories.filter((c) => c.superCategoryId === superCategoryId);
        }
      }
      return categories;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return mockCategories; // fallback to mock if api fails
    }
  },
  
  async getSuperCategories() {
    // Backend doesn't seem to have super categories yet, so return mock data
    return mockSuperCategories;
  }
};

export { productService };
