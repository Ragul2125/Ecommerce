import api from '../../../lib/api';
import { mockSuperCategories, mockCategories } from "@/utils/mockData";
const mapProduct = (p) => ({
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
});
const productService = {
  async getProducts(params) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('q', params.search);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.minPrice) queryParams.append('min_price', params.minPrice);
      if (params?.maxPrice) queryParams.append('max_price', params.maxPrice);
      if (params?.sort) queryParams.append('sort', params.sort);
      if (params?.page) queryParams.append('page', params.page);
      if (params?.limit) queryParams.append('limit', params.limit);
      const response = await api.get(`/products?${queryParams.toString()}`);
      if (response.data && response.data.products) {
        return {
          products: response.data.products.map(mapProduct),
          pagination: response.data.pagination
        };
      }
      let result = response.data || [];
      return result.map(mapProduct);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  },
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      const productData = response.data.product || response.data;
      return mapProduct(productData);
    } catch (error) {
      console.error("Failed to fetch product by id:", error);
      return undefined;
    }
  },
  async getRelatedProducts(id) {
    try {
      const response = await api.get(`/products/${id}/related`);
      const productsData = response.data.products || response.data;
      if (Array.isArray(productsData)) {
         return productsData.map(mapProduct);
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch related products:", error);
      return [];
    }
  },
  async getCategories(superCategoryId) {
    try {
      const response = await api.get('/categories');
      let categories = response.data;
      if (superCategoryId) {
        if (categories.some(c => c.super_category_id !== undefined)) {
            return categories.filter((c) => c.super_category_id === superCategoryId);
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
    try {
      const response = await api.get('/super-categories');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch super categories:", error);
      return mockSuperCategories;
    }
  }
};
export { productService };
