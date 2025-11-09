import { useState } from "react";
import { useScrollRestoration } from "@/hooks/use-scroll-restoration";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Store,
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  Hash,
  BarChart3,
  Box,
  Truck,
  Activity,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Sparkles,
  Eye,
  Bell,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Separator } from "@/components/ui/separator";
import AIChatbot from "@/components/AIChatbot";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  sold: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  blockchainHash: string;
}

interface Order {
  id: string;
  farmer: string;
  product: string;
  quantity: number;
  total: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  date: string;
  blockchainHash: string;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Urea Fertilizer (50kg)",
    category: "Fertilizers",
    stock: 150,
    price: 850,
    sold: 245,
    status: "in_stock",
    blockchainHash: "0x7F4A23K9BC8D1E2F",
  },
  {
    id: "2",
    name: "DAP Fertilizer (50kg)",
    category: "Fertilizers",
    stock: 25,
    price: 1200,
    sold: 180,
    status: "low_stock",
    blockchainHash: "0x3B9C45D7E1F8A6H2",
  },
  {
    id: "3",
    name: "Pesticide Spray (1L)",
    category: "Pesticides",
    stock: 0,
    price: 450,
    sold: 95,
    status: "out_of_stock",
    blockchainHash: "0x8E2F91A4C7D3B5K6",
  },
  {
    id: "4",
    name: "Organic Compost (25kg)",
    category: "Organic",
    stock: 200,
    price: 350,
    sold: 120,
    status: "in_stock",
    blockchainHash: "0x5C7D92B8E4F1A3J9",
  },
];

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    farmer: "Ramesh Kumar",
    product: "Urea Fertilizer (50kg)",
    quantity: 10,
    total: 8500,
    status: "delivered",
    date: "2 days ago",
    blockchainHash: "0x9A1B2C3D4E5F6G7H",
  },
  {
    id: "ORD-002",
    farmer: "Suresh Patil",
    product: "DAP Fertilizer (50kg)",
    quantity: 5,
    total: 6000,
    status: "processing",
    date: "1 day ago",
    blockchainHash: "0x8H7G6F5E4D3C2B1A",
  },
  {
    id: "ORD-003",
    farmer: "Lakshmi Devi",
    product: "Organic Compost (25kg)",
    quantity: 8,
    total: 2800,
    status: "pending",
    date: "3 hours ago",
    blockchainHash: "0x7K6J5H4G3F2D1C9B",
  },
];

// Chart data
const revenueData = [
  { month: "Jan", revenue: 95000, orders: 42, customers: 65, prevRevenue: 88000 },
  { month: "Feb", revenue: 102000, orders: 48, customers: 72, prevRevenue: 94000 },
  { month: "Mar", revenue: 108000, orders: 52, customers: 78, prevRevenue: 101000 },
  { month: "Apr", revenue: 118000, orders: 58, customers: 85, prevRevenue: 110000 },
  { month: "May", revenue: 125000, orders: 62, customers: 89, prevRevenue: 118000 },
];

const categoryData = [
  { name: "Fertilizers", value: 45, sales: 425, revenue: 56250, growth: 18 },
  { name: "Pesticides", value: 25, sales: 95, revenue: 28500, growth: -5 },
  { name: "Organic", value: 20, sales: 120, revenue: 24000, growth: 24 },
  { name: "Seeds", value: 10, sales: 85, revenue: 16250, growth: 12 },
];

const orderStatusData = [
  { status: "Delivered", count: 106, percentage: 68 },
  { status: "Processing", count: 34, percentage: 22 },
  { status: "Pending", count: 16, percentage: 10 },
];

const performanceData = [
  { metric: "Quality", value: 85, fullMark: 100 },
  { metric: "Delivery", value: 92, fullMark: 100 },
  { metric: "Pricing", value: 78, fullMark: 100 },
  { metric: "Service", value: 88, fullMark: 100 },
  { metric: "Inventory", value: 75, fullMark: 100 },
];

const hourlyActivity = [
  { hour: "00:00", orders: 2 },
  { hour: "04:00", orders: 1 },
  { hour: "08:00", orders: 8 },
  { hour: "12:00", orders: 15 },
  { hour: "16:00", orders: 12 },
  { hour: "20:00", orders: 6 },
  { hour: "23:00", orders: 3 },
];

const recentActivity = [
  { type: "order", message: "New order from Ramesh Kumar", time: "2 mins ago", icon: ShoppingCart, color: "text-blue-600" },
  { type: "stock", message: "Low stock alert: DAP Fertilizer", time: "15 mins ago", icon: AlertCircle, color: "text-amber-600" },
  { type: "delivery", message: "Order ORD-001 delivered successfully", time: "1 hour ago", icon: CheckCircle2, color: "text-emerald-600" },
  { type: "customer", message: "5 new customers registered", time: "2 hours ago", icon: Users, color: "text-purple-600" },
];

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6", "#8b5cf6"];

const VendorDashboard = () => {
  // Enable scroll restoration for this page
  useScrollRestoration();
  
  const [products] = useState<Product[]>(sampleProducts);
  const [orders] = useState<Order[]>(sampleOrders);

  const totalRevenue = 125000;
  const monthlyGrowth = 12.5;
  const totalOrders = 156;
  const activeCustomers = 89;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock":
      case "delivered":
        return "bg-emerald-100 text-emerald-700";
      case "low_stock":
      case "processing":
        return "bg-amber-100 text-amber-700";
      case "out_of_stock":
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f3ed] via-[#f3f7f0] to-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f1efe8] via-[#f4faf2] to-white py-12">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-vendor/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative rounded-full bg-gradient-to-br from-vendor/20 to-vendor/5 p-4 backdrop-blur-sm border border-vendor/20">
                      <Store className="h-7 w-7 text-vendor" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-foreground bg-clip-text">Vendor Dashboard</h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                      <Sparkles className="h-4 w-4 text-vendor" />
                      GreenGrowth Fertilizers
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors px-4 py-2">
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  Verified Vendor
                </Badge>
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">3</Badge>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-gradient-to-r from-muted/50 to-muted/30 p-1 rounded-xl backdrop-blur-sm border border-border/50">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-vendor data-[state=active]:to-vendor/90 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="inventory" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-vendor data-[state=active]:to-vendor/90 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Box className="mr-2 h-4 w-4" />
                  Inventory
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-vendor data-[state=active]:to-vendor/90 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-vendor data-[state=active]:to-vendor/90 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab - Landing Page */}
              <TabsContent value="overview" className="space-y-6">
                {/* KPI Cards with Enhanced Design */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="relative overflow-hidden border-border bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-vendor/5 rounded-full blur-3xl group-hover:bg-vendor/10 transition-colors" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-xl bg-gradient-to-br from-vendor/10 to-vendor/5 p-3 group-hover:scale-110 transition-transform">
                          <DollarSign className="h-6 w-6 text-vendor" />
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +{monthlyGrowth}%
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold text-foreground mb-2">₹{totalRevenue.toLocaleString()}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Target className="h-3 w-3" />
                          <span>Target: ₹150,000</span>
                        </div>
                        <Progress value={83} className="mt-3 h-1.5" />
                        <p className="text-xs text-muted-foreground mt-2">83% of monthly target achieved</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="relative overflow-hidden border-border bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 p-3 group-hover:scale-110 transition-transform">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Activity className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Orders</p>
                        <p className="text-3xl font-bold text-foreground mb-2">{totalOrders}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>3 pending · 34 processing</span>
                        </div>
                        <div className="mt-3 flex gap-1">
                          {[...Array(7)].map((_, i) => (
                            <div key={i} className="flex-1 h-8 bg-blue-100 rounded-sm flex items-end overflow-hidden">
                              <div 
                                className="w-full bg-blue-600 rounded-t-sm" 
                                style={{ height: `${Math.random() * 100}%` }}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Last 7 days order trend</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="relative overflow-hidden border-border bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 p-3 group-hover:scale-110 transition-transform">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                          +12
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Active Customers</p>
                        <p className="text-3xl font-bold text-foreground mb-2">{activeCustomers}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Zap className="h-3 w-3" />
                          <span>12 new this week</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                                {String.fromCharCode(64 + i)}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">+{activeCustomers - 4} more</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Top customers this month</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="relative overflow-hidden border-border bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 p-3 group-hover:scale-110 transition-transform">
                          <Box className="h-6 w-6 text-amber-600" />
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Alert
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Low Stock Items</p>
                        <p className="text-3xl font-bold text-foreground mb-2">2</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>Needs immediate attention</span>
                        </div>
                        <div className="mt-3 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">DAP Fertilizer</span>
                            <span className="font-semibold text-amber-600">25 left</span>
                          </div>
                          <Progress value={25} className="h-1 bg-amber-100" />
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-3 text-xs border-amber-200 hover:bg-amber-50">
                          Restock Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Insights Banner */}
                <Card className="relative overflow-hidden border-border bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
                  <div className="relative flex items-start gap-4">
                    <div className="rounded-xl bg-white/80 backdrop-blur-sm p-3 shadow-sm">
                      <Sparkles className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">🎯 AI-Powered Insights</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your business is performing exceptionally well! Revenue is up by 12.5% this month. Consider increasing inventory for Organic products as they show a 24% growth trend.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-white/80 text-emerald-700 hover:bg-white border-emerald-200">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Strong Revenue Growth
                        </Badge>
                        <Badge className="bg-white/80 text-blue-700 hover:bg-white border-blue-200">
                          <Target className="mr-1 h-3 w-3" />
                          High Customer Satisfaction
                        </Badge>
                        <Badge className="bg-white/80 text-amber-700 hover:bg-white border-amber-200">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Stock Optimization Needed
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Charts Row */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Revenue Comparison Chart */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-vendor" />
                          Revenue Trend Analysis
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Comparing current vs previous month performance
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                        <Info className="mr-1 h-3 w-3" />
                        +7.8%
                      </Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <ComposedChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => `₹${value.toLocaleString()}`}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="prevRevenue" 
                          fill="url(#colorRevenue)" 
                          stroke="#c4b5fd"
                          strokeWidth={2}
                          name="Previous Month"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          dot={{ fill: '#8b5cf6', r: 5 }}
                          name="Current Month"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-900">
                        <strong>📊 Insight:</strong> Revenue shows consistent month-over-month growth. May revenue is ₹7,000 higher than April, indicating strong market demand.
                      </p>
                    </div>
                  </Card>

                  {/* Performance Radar Chart */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Target className="h-5 w-5 text-blue-600" />
                          Performance Metrics
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Multi-dimensional vendor performance analysis
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Activity className="mr-1 h-3 w-3" />
                        83.6%
                      </Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <RadarChart data={performanceData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="metric" stroke="#6b7280" fontSize={12} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" fontSize={10} />
                        <Radar 
                          name="Performance" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.6} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => `${value}%`}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-900">
                        <strong>🎯 Insight:</strong> Delivery (92%) is your strongest metric. Focus on improving Inventory management (75%) and Pricing strategy (78%) for balanced growth.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Activity and Category Performance */}
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Recent Activity Feed */}
                  <Card className="lg:col-span-1 border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Activity className="h-5 w-5 text-emerald-600" />
                        Live Activity
                      </h3>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                        Live
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`rounded-lg p-2 ${activity.color.replace('text-', 'bg-').replace('600', '100')}`}>
                            <activity.icon className={`h-4 w-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{activity.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      View All Activity
                    </Button>
                  </Card>

                  {/* Category Performance */}
                  <Card className="lg:col-span-2 border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-purple-600" />
                          Category Performance
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Revenue and growth analysis by product category
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {categoryData.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: COLORS[index] }}
                              >
                                {category.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">{category.name}</p>
                                <p className="text-xs text-muted-foreground">{category.sales} units sold</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-foreground">₹{category.revenue.toLocaleString()}</p>
                              <div className={`flex items-center gap-1 text-xs ${category.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                {category.growth >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3" />
                                )}
                                <span>{Math.abs(category.growth)}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={category.value * 2} 
                              className="h-2 flex-1"
                            />
                            <span className="text-xs text-muted-foreground w-12 text-right">{category.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-900">
                        <strong>💡 Recommendation:</strong> Organic products show the highest growth (+24%). Consider expanding this category and promoting it to capitalize on the trend.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Order Activity Heatmap */}
                <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Clock className="h-5 w-5 text-indigo-600" />
                        Daily Order Activity Pattern
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Understanding peak ordering hours for optimal inventory and staffing
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                      <Clock className="mr-1 h-3 w-3" />
                      24h
                    </Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={hourlyActivity}>
                      <defs>
                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => `${value} orders`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#6366f1" 
                        fillOpacity={1} 
                        fill="url(#colorActivity)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="text-sm text-indigo-900">
                      <strong>⏰ Insight:</strong> Peak ordering hours are between 12:00-16:00. Ensure adequate inventory and quick response during these hours for maximum customer satisfaction.
                    </p>
                  </div>
                </Card>
              </TabsContent>

              {/* Inventory Tab */}
              <TabsContent value="inventory" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Product Inventory</h2>
                  <Button className="bg-vendor hover:bg-vendor/90">
                    <Package className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </div>

                <div className="grid gap-4">
                  {products.map((product) => (
                    <Card key={product.id} className="border-border bg-white/90 p-6 shadow-soft">
                      <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <Badge className={getStatusColor(product.status)}>
                              {product.status.replace("_", " ")}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Stock</p>
                              <p className="font-semibold text-foreground">{product.stock} units</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Price</p>
                              <p className="font-semibold text-foreground">₹{product.price}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Sold</p>
                              <p className="font-semibold text-foreground">{product.sold} units</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Hash className="h-3 w-3" />
                            <span className="font-mono">{product.blockchainHash}</span>
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                              Verified
                            </Badge>
                          </div>

                          {product.status === "low_stock" && (
                            <div className="rounded-lg bg-amber-50 p-3 text-sm">
                              <div className="flex items-center gap-2 text-amber-700">
                                <AlertCircle className="h-4 w-4" />
                                <span className="font-semibold">Low stock alert - Restock soon</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Restock</Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Filter</Button>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border-border bg-white/90 p-6 shadow-soft">
                      <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-foreground">{order.id}</h3>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <Users className="mr-1 inline h-3 w-3" />
                                {order.farmer}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-foreground">₹{order.total.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{order.date}</p>
                            </div>
                          </div>

                          <div className="rounded-lg bg-muted/30 p-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground">{order.product}</span>
                              <span className="font-semibold text-foreground">Qty: {order.quantity}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Hash className="h-3 w-3" />
                            <span className="font-mono">{order.blockchainHash}</span>
                            <Badge variant="outline" className="text-xs">
                              <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                              Blockchain Verified
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {order.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-vendor hover:bg-vendor/90">
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Accept
                              </Button>
                              <Button variant="outline" size="sm">Decline</Button>
                            </>
                          )}
                          {order.status === "processing" && (
                            <>
                              <Button size="sm" className="bg-vendor hover:bg-vendor/90">
                                <Truck className="mr-2 h-4 w-4" />
                                Mark Delivered
                              </Button>
                              <Button variant="outline" size="sm">Track</Button>
                            </>
                          )}
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm">View Details</Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Advanced Analytics</h2>
                    <p className="text-sm text-muted-foreground mt-1">Deep dive into your business performance metrics</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Clock className="h-4 w-4" />
                      Last 30 Days
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Activity className="h-4 w-4" />
                      Export Report
                    </Button>
                  </div>
                </div>

                {/* Key Metrics Summary */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-border bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">₹2,016</p>
                    <p className="text-xs text-emerald-600 mt-2">↑ 8.2% from last month</p>
                  </Card>
                  <Card className="border-border bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">68.4%</p>
                    <p className="text-xs text-blue-600 mt-2">↑ 3.1% improvement</p>
                  </Card>
                  <Card className="border-border bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">Customer Retention</p>
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">82.3%</p>
                    <p className="text-xs text-purple-600 mt-2">↑ 5.4% increase</p>
                  </Card>
                </div>

                {/* Revenue Trend - Enhanced Area Chart */}
                <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        Revenue Trend Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        5-month revenue progression showing steady growth trajectory
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +31.6% Total Growth
                    </Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenueAnalytics" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={13} fontWeight={500} />
                      <YAxis stroke="#6b7280" fontSize={13} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '12px',
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                          padding: '12px'
                        }}
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorRevenueAnalytics)"
                        dot={{ fill: '#8b5cf6', r: 6, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  <Separator className="my-6" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Best Month</p>
                      <p className="text-lg font-bold text-foreground">May</p>
                      <p className="text-xs text-purple-600">₹125,000</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Avg Growth</p>
                      <p className="text-lg font-bold text-foreground">7.9%</p>
                      <p className="text-xs text-blue-600">per month</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                      <p className="text-lg font-bold text-foreground">₹548K</p>
                      <p className="text-xs text-emerald-600">5 months</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Projected Jun</p>
                      <p className="text-lg font-bold text-foreground">₹135K</p>
                      <p className="text-xs text-amber-600">+8% estimate</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">📈 AI Insight</p>
                        <p className="text-sm text-muted-foreground">
                          Your revenue shows a consistent upward trend with no significant dips. The growth rate is accelerating, with May showing the strongest performance. If this trend continues, you're on track to exceed ₹140K in June.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Orders & Customers - Enhanced Line Chart */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Activity className="h-5 w-5 text-emerald-600" />
                          Growth Correlation
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Orders vs Customer acquisition patterns
                        </p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="orders" 
                          stroke="#22c55e" 
                          strokeWidth={3}
                          dot={{ fill: '#22c55e', r: 5, strokeWidth: 2, stroke: '#fff' }}
                          name="Orders"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="customers" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                          name="Customers"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-100">
                      <p className="text-sm text-foreground">
                        <strong>💡 Insight:</strong> Orders and customer growth are highly correlated (0.94). Average orders per customer increased from 0.65 to 0.70, indicating improving customer engagement.
                      </p>
                    </div>
                  </Card>

                  {/* Order Status - Enhanced Pie Chart */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Package className="h-5 w-5 text-blue-600" />
                          Order Fulfillment Status
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Current distribution of order states
                        </p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={orderStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ status, percentage }) => `${status}: ${percentage}%`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="count"
                          paddingAngle={2}
                        >
                          {orderStatusData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]}
                              stroke="#fff"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-3">
                      {orderStatusData.map((item, index) => (
                        <div key={item.status} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-4 w-4 rounded-full border-2 border-white shadow-sm" 
                              style={{ backgroundColor: COLORS[index] }}
                            />
                            <span className="text-sm font-medium text-foreground">{item.status}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-foreground">{item.count}</span>
                            <span className="text-xs text-muted-foreground ml-1">({item.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-foreground">
                        <strong>✅ Insight:</strong> Excellent fulfillment rate! 68% of orders are successfully delivered. The 22% in processing indicates healthy order flow. Only 10% pending shows efficient processing.
                      </p>
                    </div>
                  </Card>

                  {/* Product Category Sales - Enhanced Bar Chart */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg lg:col-span-2">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-purple-600" />
                          Category-wise Sales Performance
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Comparative analysis of product categories with growth indicators
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        <Box className="mr-1 h-3 w-3" />
                        4 Categories
                      </Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={categoryData}>
                        <defs>
                          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={13} fontWeight={500} />
                        <YAxis stroke="#6b7280" fontSize={13} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                          }}
                          formatter={(value: number) => `${value} units`}
                        />
                        <Bar 
                          dataKey="sales" 
                          fill="url(#colorBar)" 
                          radius={[12, 12, 0, 0]} 
                          name="Units Sold"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    <Separator className="my-6" />
                    <div className="grid grid-cols-4 gap-4">
                      {categoryData.map((category, index) => (
                        <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/20">
                          <div 
                            className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold shadow-lg"
                            style={{ backgroundColor: COLORS[index] }}
                          >
                            {category.name.charAt(0)}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{category.name}</p>
                          <p className="text-lg font-bold text-foreground">{category.sales}</p>
                          <Badge 
                            variant="outline" 
                            className={`mt-2 text-xs ${category.growth >= 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                          >
                            {category.growth >= 0 ? '+' : ''}{category.growth}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-xl border border-purple-100">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg">
                          <Target className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm mb-1">🎯 Strategic Recommendation</p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Top Performer:</strong> Fertilizers lead with 425 units (45% market share). <strong>Fastest Growing:</strong> Organic products (+24%) show explosive demand. 
                            <strong>Action Item:</strong> Increase Organic inventory by 30% and phase down Pesticides (-5%).
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* AI Chatbot */}
      <AIChatbot userRole="vendor" />
    </div>
  );
};

export default VendorDashboard;

