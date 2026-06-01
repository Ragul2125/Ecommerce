const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const sellerService = {
  async getDashboardStats() {
    await delay(600)
    return {
      totalRevenue: 24500.50,
      revenueGrowth: 15.2,
      totalOrders: 320,
      ordersGrowth: 4.5,
      totalProducts: 45,
      productsGrowth: 0,
      activeCustomers: 1200,
      customersGrowth: 12.1
    }
  },

  async getSalesData() {
    await delay(700)
    // Mock data for LineChart
    return [
      { name: "Jan", total: 1200 },
      { name: "Feb", total: 2100 },
      { name: "Mar", total: 1800 },
      { name: "Apr", total: 2400 },
      { name: "May", total: 2900 },
      { name: "Jun", total: 3500 },
      { name: "Jul", total: 3200 },
      { name: "Aug", total: 4100 },
      { name: "Sep", total: 4800 },
      { name: "Oct", total: 5100 },
      { name: "Nov", total: 6200 },
      { name: "Dec", total: 7500 },
    ]
  },

  async getRecentOrders() {
    await delay(500)
    return [
      { id: "ORD-9281", customer: "Alice Smith", date: "2026-04-07", total: 129.99, status: "Processing" },
      { id: "ORD-9280", customer: "Bob Johnson", date: "2026-04-07", total: 49.50, status: "Completed" },
      { id: "ORD-9279", customer: "Charlie Brown", date: "2026-04-06", total: 349.00, status: "Shipped" },
      { id: "ORD-9278", customer: "Diana Prince", date: "2026-04-06", total: 89.99, status: "Completed" },
      { id: "ORD-9277", customer: "Evan Wright", date: "2026-04-05", total: 210.00, status: "Completed" },
    ]
  }
}
