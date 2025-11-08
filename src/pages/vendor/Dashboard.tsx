import { useState } from "react";
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
} from "recharts";

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
  { month: "Jan", revenue: 95000, orders: 42, customers: 65 },
  { month: "Feb", revenue: 102000, orders: 48, customers: 72 },
  { month: "Mar", revenue: 108000, orders: 52, customers: 78 },
  { month: "Apr", revenue: 118000, orders: 58, customers: 85 },
  { month: "May", revenue: 125000, orders: 62, customers: 89 },
];

const categoryData = [
  { name: "Fertilizers", value: 45, sales: 425 },
  { name: "Pesticides", value: 25, sales: 95 },
  { name: "Organic", value: 20, sales: 120 },
  { name: "Seeds", value: 10, sales: 85 },
];

const orderStatusData = [
  { status: "Delivered", count: 106, percentage: 68 },
  { status: "Processing", count: 34, percentage: 22 },
  { status: "Pending", count: 16, percentage: 10 },
];

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6", "#8b5cf6"];

const VendorDashboard = () => {
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
        <section className="bg-gradient-to-br from-[#f1efe8] via-[#f4faf2] to-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-vendor/10 p-3">
                    <Store className="h-6 w-6 text-vendor" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Vendor Dashboard</h1>
                    <p className="text-muted-foreground">GreenGrowth Fertilizers</p>
                  </div>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Verified Vendor
              </Badge>
            </div>
          </div>
        </section>

        {/* Analytics Cards */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-white/90 p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{monthlyGrowth}% this month</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-vendor/10 p-3">
                    <DollarSign className="h-6 w-6 text-vendor" />
                  </div>
                </div>
              </Card>

              <Card className="border-border bg-white/90 p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">{totalOrders}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-blue-600">
                      <ShoppingCart className="h-4 w-4" />
                      <span>3 pending</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="border-border bg-white/90 p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Customers</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">{activeCustomers}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-purple-600">
                      <Users className="h-4 w-4" />
                      <span>12 new this week</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-purple-100 p-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="border-border bg-white/90 p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Low Stock Items</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">2</p>
                    <div className="mt-2 flex items-center gap-1 text-sm text-amber-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Needs restocking</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-amber-100 p-3">
                    <Box className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="inventory" className="space-y-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="inventory" className="data-[state=active]:bg-vendor data-[state=active]:text-white">
                  <Box className="mr-2 h-4 w-4" />
                  Inventory
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-vendor data-[state=active]:text-white">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-vendor data-[state=active]:text-white">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

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
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Sales Analytics</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Last 30 Days</Button>
                    <Button variant="outline" size="sm">Export Report</Button>
                  </div>
                </div>

                {/* Revenue Trend - Area Chart */}
                <Card className="border-border bg-white/90 p-6 shadow-soft">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Revenue Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        formatter={(value: number) => `₹${value.toLocaleString()}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#8b5cf6" 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Orders & Customers - Line Chart */}
                  <Card className="border-border bg-white/90 p-6 shadow-soft">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Orders & Customer Growth</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="orders" 
                          stroke="#22c55e" 
                          strokeWidth={2}
                          dot={{ fill: '#22c55e', r: 4 }}
                          name="Orders"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="customers" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', r: 4 }}
                          name="Customers"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Order Status - Pie Chart */}
                  <Card className="border-border bg-white/90 p-6 shadow-soft">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Order Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={orderStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ status, percentage }) => `${status}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {orderStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                      {orderStatusData.map((item, index) => (
                        <div key={item.status} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index] }}
                            />
                            <span className="text-foreground">{item.status}</span>
                          </div>
                          <span className="font-semibold text-foreground">{item.count} orders</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Product Category Sales - Bar Chart */}
                  <Card className="border-border bg-white/90 p-6 shadow-soft lg:col-span-2">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Sales by Product Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                          formatter={(value: number) => `${value} units`}
                        />
                        <Legend />
                        <Bar dataKey="sales" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Units Sold" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VendorDashboard;

