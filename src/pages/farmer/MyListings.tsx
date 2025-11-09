import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dot,
  Pencil,
  Trash2,
  Users,
  Eye,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Package,
  Clock,
  BarChart3,
  Calendar,
  Sparkles,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MessageSquare,
  Image as ImageIcon,
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
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import FarmerPageShell from "./FarmerPageShell";

const mockListings = [
  {
    id: "LST-1024",
    crop: "Red Onions",
    price: "₹28/kg",
    priceValue: 28,
    quantity: "800 kg",
    quantityValue: 800,
    status: "Active",
    buyers: 6,
    views: 145,
    inquiries: 12,
    lastUpdated: "2 hours ago",
    listedDate: "Jan 25, 2025",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop",
    marketPrice: 26,
  },
  {
    id: "LST-1025",
    crop: "Turmeric (Organic)",
    price: "₹145/kg",
    priceValue: 145,
    quantity: "120 kg",
    quantityValue: 120,
    status: "Pending Dispatch",
    buyers: 3,
    views: 89,
    inquiries: 8,
    lastUpdated: "1 day ago",
    listedDate: "Jan 22, 2025",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop",
    marketPrice: 138,
  },
  {
    id: "LST-1026",
    crop: "Sugarcane",
    price: "₹3100/ton",
    priceValue: 3100,
    quantity: "4 tons",
    quantityValue: 4000,
    status: "Sold",
    buyers: 4,
    views: 67,
    inquiries: 5,
    lastUpdated: "3 days ago",
    listedDate: "Jan 18, 2025",
    imageUrl: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=400&h=300&fit=crop",
    marketPrice: 3000,
  },
  {
    id: "LST-1027",
    crop: "Basmati Rice",
    price: "₹65/kg",
    priceValue: 65,
    quantity: "1500 kg",
    quantityValue: 1500,
    status: "Active",
    buyers: 8,
    views: 234,
    inquiries: 18,
    lastUpdated: "5 hours ago",
    listedDate: "Jan 26, 2025",
    imageUrl: "https://images.unsplash.com/photo-1536304929831-aab2e7c4d4b6?w=400&h=300&fit=crop",
    marketPrice: 62,
  },
  {
    id: "LST-1028",
    crop: "Tomatoes",
    price: "₹32/kg",
    priceValue: 32,
    quantity: "500 kg",
    quantityValue: 500,
    status: "Active",
    buyers: 5,
    views: 178,
    inquiries: 14,
    lastUpdated: "1 day ago",
    listedDate: "Jan 24, 2025",
    imageUrl: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=300&fit=crop",
    marketPrice: 30,
  },
];

const performanceData = [
  { name: "Jan 15", views: 120, inquiries: 8, sales: 2 },
  { name: "Jan 18", views: 180, inquiries: 12, sales: 3 },
  { name: "Jan 21", views: 220, inquiries: 16, sales: 4 },
  { name: "Jan 24", views: 280, inquiries: 22, sales: 5 },
  { name: "Jan 27", views: 340, inquiries: 28, sales: 6 },
];

const categoryData = [
  { name: "Vegetables", value: 35, sales: 45000 },
  { name: "Grains", value: 30, sales: 68000 },
  { name: "Spices", value: 20, sales: 32000 },
  { name: "Fruits", value: 15, sales: 28000 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

const FarmerMyListings = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const totalListings = mockListings.length;
  const activeListings = mockListings.filter((l) => l.status === "Active").length;
  const soldListings = mockListings.filter((l) => l.status === "Sold").length;
  const totalViews = mockListings.reduce((sum, l) => sum + l.views, 0);
  const totalInquiries = mockListings.reduce((sum, l) => sum + l.inquiries, 0);
  const averagePrice = mockListings.reduce((sum, l) => sum + l.priceValue, 0) / totalListings;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700";
      case "Pending Dispatch":
        return "bg-amber-100 text-amber-700";
      case "Sold":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <FarmerPageShell
      title="My Crop Listings"
      description="Track every crop you have listed, monitor buyer interest, and action approvals or edits without leaving the farmer portal."
      badge="Listings"
      action={{ label: "Create New Listing", to: "/farmer/create-listing" }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <Activity className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="listings"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <Package className="mr-2 h-4 w-4" />
            All Listings
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-farmer/10 p-3">
                  <Package className="h-6 w-6 text-farmer" />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12%
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{activeListings}</p>
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{totalListings} total</span>
                <Separator orientation="vertical" className="h-4" />
                <span>{soldListings} sold</span>
              </div>
              <Progress value={(activeListings / totalListings) * 100} className="mt-3 h-2" />
            </Card>

            <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-100 p-3">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +18%
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{totalViews}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{Math.round(totalViews / activeListings)} avg/listing</span>
              </div>
              <Progress value={75} className="mt-3 h-2" />
            </Card>

            <Card className="border-purple-300 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-purple-100 p-3">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +25%
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{totalInquiries}</p>
              <p className="text-sm text-muted-foreground">Buyer Inquiries</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{Math.round(totalInquiries / activeListings)} avg/listing</span>
              </div>
              <Progress value={65} className="mt-3 h-2" />
            </Card>

            <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-amber-100 p-3">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
                <Badge className="bg-amber-100 text-amber-700">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +8%
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">₹{Math.round(averagePrice)}</p>
              <p className="text-sm text-muted-foreground">Avg Price/Unit</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>Above market avg</span>
              </div>
              <Progress value={82} className="mt-3 h-2" />
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="border-farmer/30 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-farmer/10 p-3">
                <Sparkles className="h-6 w-6 text-farmer" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">AI-Powered Insights</h3>
                <p className="text-sm text-muted-foreground">
                  🎯 Your Red Onions listing is performing 34% better than similar listings in your area
                </p>
                <p className="text-sm text-muted-foreground">
                  💡 Consider increasing Tomatoes price by ₹2-3/kg based on current market demand
                </p>
                <p className="text-sm text-muted-foreground">
                  📈 Best time to list new crops: Between 6 AM - 10 AM for maximum visibility
                </p>
              </div>
            </div>
          </Card>

          {/* Charts Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Performance Trend */}
            <Card className="border-border bg-white/90 p-6 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Listing Performance</h3>
                  <p className="text-sm text-muted-foreground">Views, inquiries & sales trend</p>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="inquiries"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Category Distribution */}
            <Card className="border-border bg-white/90 p-6 shadow-soft">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Category Distribution</h3>
                <p className="text-sm text-muted-foreground">Sales by crop category</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid gap-2">
                {categoryData.map((cat, index) => (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between rounded-lg bg-muted/30 p-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-foreground">{cat.name}</span>
                    </div>
                    <span className="font-semibold text-farmer">₹{cat.sales.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">Latest updates on your listings</p>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: <Eye className="h-4 w-4 text-blue-600" />,
                  text: "Red Onions listing viewed by 23 buyers today",
                  time: "2 hours ago",
                  bg: "bg-blue-50",
                },
                {
                  icon: <MessageSquare className="h-4 w-4 text-purple-600" />,
                  text: "New inquiry received for Basmati Rice",
                  time: "5 hours ago",
                  bg: "bg-purple-50",
                },
                {
                  icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
                  text: "Sugarcane listing marked as Sold",
                  time: "1 day ago",
                  bg: "bg-emerald-50",
                },
                {
                  icon: <TrendingUp className="h-4 w-4 text-amber-600" />,
                  text: "Turmeric price adjusted to match market rate",
                  time: "2 days ago",
                  bg: "bg-amber-50",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-border bg-white p-3"
                >
                  <div className={`rounded-full ${activity.bg} p-2`}>{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* All Listings Tab */}
        <TabsContent value="listings" className="space-y-6">
          <ScrollArea className="h-[800px] pr-4">
            <div className="space-y-4">
              {mockListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="border-border bg-white/90 p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="grid gap-6 md:grid-cols-[200px,1fr,auto]">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted md:aspect-square">
                      <img
                        src={listing.imageUrl}
                        alt={listing.crop}
                        className="h-full w-full object-cover"
                      />
                      <Badge className={`absolute right-2 top-2 ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </Badge>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{listing.crop}</h3>
                            <p className="text-sm text-muted-foreground">ID: {listing.id}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-farmer/30 text-farmer">
                            <DollarSign className="mr-1 h-3 w-3" />
                            {listing.price}
                          </Badge>
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            <Package className="mr-1 h-3 w-3" />
                            {listing.quantity}
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="rounded-lg bg-blue-50 p-3">
                          <Eye className="mx-auto mb-1 h-4 w-4 text-blue-600" />
                          <p className="text-lg font-bold text-foreground">{listing.views}</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                        <div className="rounded-lg bg-purple-50 p-3">
                          <MessageSquare className="mx-auto mb-1 h-4 w-4 text-purple-600" />
                          <p className="text-lg font-bold text-foreground">{listing.inquiries}</p>
                          <p className="text-xs text-muted-foreground">Inquiries</p>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-3">
                          <Users className="mx-auto mb-1 h-4 w-4 text-farmer" />
                          <p className="text-lg font-bold text-foreground">{listing.buyers}</p>
                          <p className="text-xs text-muted-foreground">Interested</p>
                        </div>
                      </div>

                      {/* Price Analysis */}
                      <div className="rounded-lg bg-muted/30 p-3">
                        <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                          Price Analysis
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground">Your Price:</span>
                          <span className="font-bold text-farmer">{listing.price}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-sm">
                          <span className="text-foreground">Market Avg:</span>
                          <span className="text-muted-foreground">
                            ₹{listing.marketPrice}
                            {listing.priceValue > listing.marketPrice ? (
                              <ArrowUpRight className="ml-1 inline h-3 w-3 text-emerald-600" />
                            ) : (
                              <ArrowDownRight className="ml-1 inline h-3 w-3 text-red-600" />
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Listed: {listing.listedDate}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <Clock className="h-3 w-3" />
                        <span>Updated: {listing.lastUpdated}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="w-full border-foreground/10">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-amber-200 text-amber-600 hover:text-amber-700"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      {listing.status !== "Sold" && (
                        <Button
                          variant="outline"
                          className="w-full border-rose-200 text-rose-600 hover:text-rose-700"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Close
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border bg-white/90 p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-3">
                  <TrendingUp className="h-5 w-5 text-farmer" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">18.5%</p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-white/90 p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.2 days</p>
                  <p className="text-sm text-muted-foreground">Avg Time to Sell</p>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-white/90 p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-100 p-3">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.7/5</p>
                  <p className="text-sm text-muted-foreground">Buyer Rating</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Weekly Performance */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Weekly Performance</h3>
              <p className="text-sm text-muted-foreground">Detailed metrics for the past 2 weeks</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="inquiries"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Recommendations */}
          <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-farmer" />
              <h3 className="text-lg font-semibold text-foreground">Smart Recommendations</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-farmer/20 bg-white p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Optimize Listing Times</p>
                    <p className="text-sm text-muted-foreground">
                      Your listings get 45% more views when posted between 6-10 AM
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="font-semibold text-foreground">Add More Photos</p>
                    <p className="text-sm text-muted-foreground">
                      Listings with 3+ photos receive 67% more inquiries
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                  <div>
                    <p className="font-semibold text-foreground">Competitive Pricing</p>
                    <p className="text-sm text-muted-foreground">
                      Your average price is 5% above market - consider adjusting for faster sales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </FarmerPageShell>
  );
};

export default FarmerMyListings;

