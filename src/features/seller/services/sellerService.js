import { mockProducts } from "@/utils/mockData";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let storeSettings = {
  name: "ShopFlow Concept Store",
  email: "curator@shopflow.design",
  phone: "+91 98765 43210",
  currency: "INR",
  address: "12, Crescent Road, Bangalore, India",
  shippingRate: 500,
  taxRate: 18,
  accentColor: "#1A1A1A"
};
let mockCustomers = [
  { id: "CST-001", name: "Alice Smith", email: "alice@example.com", totalOrders: 12, totalSpend: 24900, status: "Active", joined: "2025-10-12" },
  { id: "CST-002", name: "Bob Johnson", email: "bob@example.com", totalOrders: 5, totalSpend: 15350, status: "Active", joined: "2025-11-05" },
  { id: "CST-003", name: "Charlie Brown", email: "charlie@example.com", totalOrders: 18, totalSpend: 82400, status: "Active", joined: "2025-08-20" },
  { id: "CST-004", name: "Diana Prince", email: "diana@justice.org", totalOrders: 7, totalSpend: 31200, status: "Active", joined: "2025-12-01" },
  { id: "CST-005", name: "Evan Wright", email: "evan@wright.com", totalOrders: 3, totalSpend: 9960, status: "Inactive", joined: "2026-01-15" }
];
let mockOrders = [
  { id: "ORD-9281", customer: "Alice Smith", date: "2026-04-07", total: 31540, status: "Processing", items: [{ name: "Silk Minimalist Dress", quantity: 1, price: 31540 }] },
  { id: "ORD-9280", customer: "Bob Johnson", date: "2026-04-07", total: 16517, status: "Completed", items: [{ name: "Italian Leather Watch", quantity: 1, price: 16517 }] },
  { id: "ORD-9279", customer: "Charlie Brown", date: "2026-04-06", total: 53950, status: "Shipped", items: [{ name: "Slim-Fit Minimalist Suit", quantity: 1, price: 53950 }] },
  { id: "ORD-9278", customer: "Diana Prince", date: "2026-04-06", total: 70550, status: "Completed", items: [{ name: "Classic Trench Coat", quantity: 1, price: 70550 }] },
  { id: "ORD-9277", customer: "Evan Wright", date: "2026-04-05", total: 12035, status: "Completed", items: [{ name: "Merino Wool Roll Neck", quantity: 1, price: 12035 }] }
];
const sellerService = {
  async getDashboardStats() {
    await delay(300);
    const revenue = mockOrders.reduce((sum, o) => o.status !== "Cancelled" ? sum + o.total : sum, 0);
    return {
      totalRevenue: revenue,
      revenueGrowth: 15.2,
      totalOrders: mockOrders.length,
      ordersGrowth: 4.5,
      totalProducts: mockProducts.length,
      productsGrowth: 0,
      activeCustomers: mockCustomers.length,
      customersGrowth: 12.1
    };
  },
  async getSalesData() {
    await delay(300);
    return [
      { name: "Jan", total: 12e3 },
      { name: "Feb", total: 21e3 },
      { name: "Mar", total: 18e3 },
      { name: "Apr", total: 24e3 },
      { name: "May", total: 29e3 },
      { name: "Jun", total: 35e3 },
      { name: "Jul", total: 32e3 },
      { name: "Aug", total: 41e3 },
      { name: "Sep", total: 48e3 },
      { name: "Oct", total: 51e3 },
      { name: "Nov", total: 62e3 },
      { name: "Dec", total: 75e3 }
    ];
  },
  async getRecentOrders() {
    await delay(300);
    return mockOrders.slice(0, 5);
  },
  async getProducts() {
    await delay(300);
    return [...mockProducts];
  },
  async getProductById(id) {
    await delay(200);
    return mockProducts.find((p) => p.id === id);
  },
  async createProduct(product) {
    await delay(300);
    const newProduct = {
      ...product,
      id: `p-${Date.now()}`,
      rating: 5,
      reviewCount: 0,
      soldCount: 0
    };
    mockProducts.unshift(newProduct);
    return newProduct;
  },
  async updateProduct(id, product) {
    await delay(300);
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...product };
      return mockProducts[index];
    }
    throw new Error("Product not found");
  },
  async deleteProduct(id) {
    await delay(300);
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
      return true;
    }
    return false;
  },
  async getOrders() {
    await delay(300);
    return [...mockOrders];
  },
  async updateOrderStatus(id, status) {
    await delay(300);
    const order = mockOrders.find((o) => o.id === id);
    if (order) {
      order.status = status;
      return order;
    }
    throw new Error("Order not found");
  },
  async getCustomers() {
    await delay(300);
    return [...mockCustomers];
  },
  async getStoreSettings() {
    await delay(200);
    return { ...storeSettings };
  },
  async updateStoreSettings(settings) {
    await delay(300);
    storeSettings = { ...storeSettings, ...settings };
    return { ...storeSettings };
  }
};
export {
  sellerService
};
