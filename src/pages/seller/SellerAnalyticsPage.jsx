import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Award, DollarSign, ShoppingBag, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sellerService } from "@/features/seller/services/sellerService";
function SellerAnalyticsPage() {
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadAnalytics() {
      try {
        const chartData = await sellerService.getSalesData();
        setSalesData(chartData);
        setTopProducts([
          { id: "a1", name: "Italian Leather Watch", sales: 312, revenue: 5153280, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80" },
          { id: "w1", name: "Silk Minimalist Dress", sales: 156, revenue: 4920240, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" },
          { id: "m1", name: "Slim-Fit Minimalist Suit", sales: 92, revenue: 4963400, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80" },
          { id: "w2", name: "Cashmere Oversized Sweater", sales: 89, revenue: 2363840, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80" }
        ]);
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAnalytics();
  }, []);
  const categoryDistribution = [
    { name: "Apparel", value: 58e3, color: "#1A1A1A" },
    { name: "Accessories", value: 31e3, color: "#666666" },
    { name: "Footwear", value: 18e3, color: "#999999" },
    { name: "Bespoke", value: 12e3, color: "#CCCCCC" }
  ];
  if (isLoading) {
    return <div className="space-y-6">
        <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="h-[400px] rounded-xl lg:col-span-4" />
          <Skeleton className="h-[400px] rounded-xl lg:col-span-3" />
        </div>
      </div>;
  }
  return <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight font-heading">Analytics Reports</h1>
        <p className="text-sm text-muted-foreground">Monitor sales trajectories, revenue trends, and category shares.</p>
      </div>

      {
    /* Metrics Summaries */
  }
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-[2rem] border border-border/40 bg-background/50 shadow-premium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">Average Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">₹36,920</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              <span className="text-green-500 font-bold">↑ +3.2%</span> from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="rounded-[2rem] border border-border/40 bg-background/50 shadow-premium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">2.84%</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              <span className="text-green-500 font-bold">↑ +0.4%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border border-border/40 bg-background/50 shadow-premium">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">Store Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">14,280</div>
            <p className="text-[10px] text-muted-foreground mt-1">
              <span className="text-green-500 font-bold">↑ +18.9%</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {
    /* Revenue Area Chart */
  }
        <Card className="col-span-4 rounded-[2.5rem] border border-border/40 bg-background/50 shadow-premium">
          <CardHeader>
            <CardTitle className="font-heading font-black">Revenue Timeline</CardTitle>
            <CardDescription>Visual performance trends over the current fiscal year.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
    dataKey="name"
    stroke="#888888"
    fontSize={11}
    tickLine={false}
    axisLine={false}
  />
                  <YAxis
    stroke="#888888"
    fontSize={11}
    tickLine={false}
    axisLine={false}
    tickFormatter={(value) => `\u20B9${value / 1e3}k`}
  />
                  <Tooltip
    contentStyle={{ borderRadius: "16px", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
    formatter={(value) => [`\u20B9${value.toLocaleString()}`, "Revenue"]}
  />
                  <Area type="monotone" dataKey="total" stroke="#1a1a1a" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {
    /* Category Share Pie Chart */
  }
        <Card className="col-span-3 rounded-[2.5rem] border border-border/40 bg-background/50 shadow-premium">
          <CardHeader>
            <CardTitle className="font-heading font-black">Category Share</CardTitle>
            <CardDescription>Sales distribution by product classification.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[230px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
    data={categoryDistribution}
    cx="50%"
    cy="50%"
    innerRadius={60}
    outerRadius={80}
    paddingAngle={4}
    dataKey="value"
  >
                    {categoryDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value) => `\u20B9${value.toLocaleString()}`} />
                  <Legend iconSize={10} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {
    /* Top Performing products */
  }
      <Card className="rounded-[2.5rem] border border-border/40 bg-background/50 shadow-premium">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-heading font-black">Best Sellers</CardTitle>
            <CardDescription>Top curated luxury items ranked by sales count.</CardDescription>
          </div>
          <Award className="h-5 w-5 text-muted-foreground/60" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  <th className="pb-4">Product Details</th>
                  <th className="pb-4">Pieces Sold</th>
                  <th className="pb-4">Net Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {topProducts.map((p, index) => <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-muted-foreground w-4">#{index + 1}</span>
                        <div className="h-12 w-12 rounded-xl overflow-hidden border shrink-0">
                          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-sm">{p.name}</h4>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">{p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-xs">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                        {p.sales} Units
                      </div>
                    </td>
                    <td className="py-4 font-black text-sm">₹{p.revenue.toLocaleString()}</td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
}
const Skeleton = ({ className }) => <div className={`bg-muted animate-pulse rounded-xl ${className}`} />;
export {
  SellerAnalyticsPage
};
