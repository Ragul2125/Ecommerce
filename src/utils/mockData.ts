export interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice?: number
  images: string[]
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  isFeatured: boolean
  isNew: boolean
  soldCount?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  itemCount: number
  superCategoryId: string
}

export interface SuperCategory {
  id: string
  name: string
  iconName: string // HeroIcon name
}

export const mockSuperCategories: SuperCategory[] = [
  { id: "s1", name: "Fashion", iconName: "Shirt" },
  { id: "s2", name: "Beauty", iconName: "Sparkles" },
  { id: "s3", name: "Home", iconName: "Home" },
  { id: "s4", name: "Kids", iconName: "Baby" },
]

export const mockCategories: Category[] = [
  // Fashion SuperCategory
  { id: "c1", name: "Men's Topwear", slug: "men-top", image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&q=80", itemCount: 56, superCategoryId: "s1" },
  { id: "c2", name: "Women's Ethnic", slug: "women-ethnic", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", itemCount: 112, superCategoryId: "s1" },
  { id: "c3", name: "Bags & Belts", slug: "accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", itemCount: 89, superCategoryId: "s1" },
  { id: "c4", name: "Luxury Shoes", slug: "shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80", itemCount: 34, superCategoryId: "s1" },
  { id: "c5", name: "Premium Suits", slug: "suits", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", itemCount: 28, superCategoryId: "s1" },
  { id: "c6", name: "Minimalist Silk", slug: "silk", image: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800&q=80", itemCount: 19, superCategoryId: "s1" },
  
  // Kids (Placeholders)
  { id: "ck1", name: "Baby Wear", slug: "baby", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80", itemCount: 12, superCategoryId: "s4" },
]

export const mockProducts: Product[] = [
  // --- WOMEN ---
  {
    id: "w1",
    name: "Silk Minimalist Dress",
    description: "High-end fashion editorial silk dress. Minimalist luxury aesthetic with premium silk fabric that drapes perfectly. Ideal for cocktail parties and upscale events.",
    price: 37350,
    salePrice: 31540,
    images: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80", "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"],
    category: "Women",
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    isFeatured: true,
    isNew: true,
    soldCount: 156
  },
  {
    id: "w2",
    name: "Cashmere Oversized Sweater",
    description: "Ultra-soft 100% cashmere sweater. Features a relaxed silhouette, dropped shoulders, and ribbed trims for a timeless luxury feel.",
    price: 26560,
    images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80", "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=800&q=80"],
    category: "Women",
    rating: 4.8,
    reviewCount: 28,
    inStock: true,
    isFeatured: false,
    isNew: false,
    soldCount: 89
  },
  {
    id: "w3",
    name: "Classic Trench Coat",
    description: "Double-breasted trench coat tailored from premium cotton twill. Water-resistant finish with a belted waist for a sophisticated look.",
    price: 70550,
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80"],
    category: "Women",
    rating: 5.0,
    reviewCount: 15,
    inStock: true,
    isFeatured: true,
    isNew: true,
    soldCount: 34
  },

  // --- MEN ---
  {
    id: "m1",
    name: "Slim-Fit Minimalist Suit",
    description: "High-end fashion editorial slim-fit suit in a vibrant blue. Professional tailoring with a modern silhouette, perfect for making a statement.",
    price: 65570,
    salePrice: 53950,
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&q=80"],
    category: "Men",
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    isFeatured: true,
    isNew: true,
    soldCount: 92
  },
  {
    id: "m2",
    name: "Merino Wool Roll Neck",
    description: "Lightweight merino wool turtleneck sweater. A versatile layering piece for the modern gentleman's wardrobe.",
    price: 12035,
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"],
    category: "Men",
    rating: 4.6,
    reviewCount: 12,
    inStock: true,
    isFeatured: false,
    isNew: false,
    soldCount: 45
  },
  {
    id: "m3",
    name: "Structured Cotton Blazer",
    description: "Single-breasted blazer in structured cotton blend. Unlined design for a more relaxed, modern aesthetic.",
    price: 34860,
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80"],
    category: "Men",
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    isFeatured: true,
    isNew: false,
    soldCount: 67
  },

  // --- ACCESSORIES ---
  {
    id: "a1",
    name: "Italian Leather Watch",
    description: "A sleek, minimalist timepiece featuring genuine Italian leather and scratch-resistant sapphire crystal. Macro shot reveals the premium detail.",
    price: 20667,
    salePrice: 16517,
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"],
    category: "Accessories",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    isFeatured: true,
    isNew: true,
    soldCount: 312
  },
  {
    id: "a2",
    name: "Polarized Artisan Shades",
    description: "Classic aviator-style sunglasses with polarized lenses. Offers 100% UV protection and a lightweight, durable frame.",
    price: 15355,
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"],
    category: "Accessories",
    rating: 4.5,
    reviewCount: 45,
    inStock: true,
    isFeatured: false,
    isNew: true,
    soldCount: 124
  },
  {
    id: "a3",
    name: "Grained Leather Tote",
    description: "Spacious tote bag crafted from premium grained leather. Features double handles and a secure interior pocket.",
    price: 45650,
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80"],
    category: "Accessories",
    rating: 4.9,
    reviewCount: 61,
    inStock: true,
    isFeatured: true,
    isNew: false,
    soldCount: 81
  },

  // --- NEW ARRIVALS ---
  {
    id: "n1",
    name: "Avant Garde Mesh Top",
    description: "Experimental mesh top with raw edges and asymmetrical stitching. A true fashion-forward piece for the collection.",
    price: 9960,
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"],
    category: "New Arrivals",
    rating: 4.7,
    reviewCount: 9,
    inStock: true,
    isFeatured: true,
    isNew: true,
    soldCount: 15
  }
]
