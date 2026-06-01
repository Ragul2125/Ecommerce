import type { Product, Category, SuperCategory } from "@/utils/mockData"
import { mockProducts, mockCategories, mockSuperCategories } from "@/utils/mockData"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const productService = {
  async getProducts(params?: { category?: string; featured?: boolean; search?: string }): Promise<Product[]> {
    await delay(800)
    
    let result = [...mockProducts]
    
    if (params?.category) {
      result = result.filter(p => p.category.toLowerCase() === params.category!.toLowerCase() || 
                                p.id.toLowerCase().includes(params.category!.toLowerCase()))
    }
    
    if (params?.featured) {
      result = result.filter(p => p.isFeatured)
    }
    
    if (params?.search) {
      const q = params.search.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    
    return result
  },
  
  async getProductById(id: string): Promise<Product | undefined> {
    await delay(500)
    return mockProducts.find(p => p.id === id)
  },
  
  async getCategories(superCategoryId?: string): Promise<Category[]> {
    await delay(400)
    if (superCategoryId) {
       return mockCategories.filter(c => c.superCategoryId === superCategoryId)
    }
    return mockCategories
  },

  async getSuperCategories(): Promise<SuperCategory[]> {
    await delay(300)
    return mockSuperCategories
  }
}
