import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollRestoration } from "@/hooks/use-scroll-restoration";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  Search,
  Filter,
  Wheat,
  Users,
  MapPin,
  Hash,
  CheckCircle2,
  Star,
  Package,
  Truck,
  Clock,
  Plus,
  Minus,
  X,
  Heart,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Sparkles,
  Eye,
  Bell,
  BarChart3,
  PieChart as PieChartIcon,
  Leaf,
  Award,
  Calendar,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

interface CropListing {
  id: string;
  crop: string;
  farmer: string;
  location: string;
  quantity: number;
  price: number;
  rating: number;
  image: string;
  quality: "Premium" | "Standard" | "Organic";
  blockchainHash: string;
  verified: boolean;
}

interface CartItem extends CropListing {
  cartQuantity: number;
}

interface Purchase {
  id: string;
  crop: string;
  farmer: string;
  quantity: number;
  total: number;
  status: "delivered" | "in_transit" | "processing";
  date: string;
  blockchainHash: string;
}

const sampleListings: CropListing[] = [
  {
    id: "1",
    crop: "Organic Rice",
    farmer: "Ramesh Kumar",
    location: "Kadur, Hassan",
    quantity: 500,
    price: 45,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    quality: "Organic",
    blockchainHash: "0x9F2A8B4C6D1E3H5K",
    verified: true,
  },
  {
    id: "2",
    crop: "Fresh Tomatoes",
    farmer: "Lakshmi Devi",
    location: "Mysore, Karnataka",
    quantity: 200,
    price: 30,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
    quality: "Premium",
    blockchainHash: "0x7K5J3H2F1D9C8B6A",
    verified: true,
  },
  {
    id: "3",
    crop: "Wheat Grains",
    farmer: "Suresh Patil",
    location: "Belgaum, Karnataka",
    quantity: 1000,
    price: 28,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    quality: "Premium",
    blockchainHash: "0x4D3C2B1A9H8G7F6E",
    verified: true,
  },
  {
    id: "4",
    crop: "Fresh Onions",
    farmer: "Manjunath Gowda",
    location: "Mandya, Karnataka",
    quantity: 300,
    price: 25,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop",
    quality: "Standard",
    blockchainHash: "0x2E1F9G8H7J6K5L4M",
    verified: true,
  },
  {
    id: "5",
    crop: "Fresh Spinach",
    farmer: "Geetha Reddy",
    location: "Hassan, Karnataka",
    quantity: 50,
    price: 40,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
    quality: "Organic",
    blockchainHash: "0x8C9D2A3B4E5F6G7H",
    verified: true,
  },
  {
    id: "6",
    crop: "Fresh Carrots",
    farmer: "Prakash Rao",
    location: "Shimoga, Karnataka",
    quantity: 80,
    price: 35,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
    quality: "Premium",
    blockchainHash: "0x1A2B3C4D5E6F7G8H",
    verified: true,
  },
];

const samplePurchases: Purchase[] = [
  {
    id: "PUR-001",
    crop: "Organic Rice (500kg)",
    farmer: "Ramesh Kumar",
    quantity: 500,
    total: 22500,
    status: "delivered",
    date: "3 days ago",
    blockchainHash: "0x8A7B6C5D4E3F2G1H",
  },
  {
    id: "PUR-002",
    crop: "Fresh Tomatoes (200kg)",
    farmer: "Lakshmi Devi",
    quantity: 200,
    total: 6000,
    status: "in_transit",
    date: "1 day ago",
    blockchainHash: "0x1H2G3F4E5D6C7B8A",
  },
];

// Chart data for analytics
const spendingData = [
  { month: "Jan", spending: 18500, orders: 8, avgPrice: 32, marketAvg: 38 },
  { month: "Feb", spending: 21200, orders: 10, avgPrice: 31, marketAvg: 37 },
  { month: "Mar", spending: 24800, orders: 12, avgPrice: 30, marketAvg: 36 },
  { month: "Apr", spending: 26500, orders: 13, avgPrice: 29, marketAvg: 35 },
  { month: "May", spending: 28500, orders: 12, avgPrice: 28, marketAvg: 34 },
];

const categoryData = [
  { name: "Vegetables", value: 35, spending: 9975, orders: 42 },
  { name: "Grains", value: 30, spending: 8550, orders: 28 },
  { name: "Fruits", value: 20, spending: 5700, orders: 35 },
  { name: "Organic", value: 15, spending: 4275, orders: 18 },
];

const farmerRatings = [
  { farmer: "Ramesh Kumar", orders: 8, rating: 4.8, savings: 15 },
  { farmer: "Lakshmi Devi", orders: 6, rating: 4.9, savings: 12 },
  { farmer: "Suresh Patil", orders: 5, rating: 4.7, savings: 18 },
  { farmer: "Geetha Reddy", orders: 4, rating: 4.6, savings: 10 },
];

const priceComparisonData = [
  { month: "Jan", yourPrice: 32, marketPrice: 38 },
  { month: "Feb", yourPrice: 31, marketPrice: 37 },
  { month: "Mar", yourPrice: 30, marketPrice: 36 },
  { month: "Apr", yourPrice: 29, marketPrice: 35 },
  { month: "May", yourPrice: 28, marketPrice: 34 },
];

const qualityDistribution = [
  { quality: "Organic", count: 18, percentage: 38 },
  { quality: "Premium", count: 16, percentage: 34 },
  { quality: "Standard", count: 13, percentage: 28 },
];

const recentActivity = [
  { type: "delivery", message: "Organic Rice delivered successfully", time: "2 hours ago", icon: Truck, color: "text-emerald-600" },
  { type: "transit", message: "Fresh Tomatoes in transit", time: "1 day ago", icon: Package, color: "text-blue-600" },
  { type: "order", message: "New order placed with Ramesh Kumar", time: "3 days ago", icon: ShoppingCart, color: "text-purple-600" },
  { type: "favorite", message: "Fresh Carrots added to favorites", time: "5 days ago", icon: Heart, color: "text-pink-600" },
];

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6", "#8b5cf6"];

const BuyerDashboard = () => {
  // Enable scroll restoration for this page
  useScrollRestoration();
  
  const navigate = useNavigate();
  const [listings] = useState<CropListing[]>(sampleListings);
  const [purchases] = useState<Purchase[]>(samplePurchases);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});
  const [showQuantitySelector, setShowQuantitySelector] = useState<string | null>(null);

  const addToCart = (listing: CropListing, quantity: number = 1) => {
    // Trigger animation
    setAddingToCart(listing.id);
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === listing.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === listing.id
            ? { ...item, cartQuantity: Math.min(item.cartQuantity + quantity, listing.quantity) }
            : item
        );
      }
      return [...prevCart, { ...listing, cartQuantity: quantity }];
    });

    // Hide quantity selector and show success animation
    setShowQuantitySelector(null);
    
    // Remove animation after 600ms
    setTimeout(() => {
      setAddingToCart(null);
    }, 600);
  };

  const handleAddToCartClick = (listingId: string) => {
    setShowQuantitySelector(listingId);
    // Initialize quantity to 1 if not set
    if (!productQuantities[listingId]) {
      setProductQuantities((prev) => ({
        ...prev,
        [listingId]: 1,
      }));
    }
  };

  const updateCartQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          // Ensure quantity doesn't exceed available stock
          const clampedQuantity = Math.min(newQuantity, item.quantity);
          return { ...item, cartQuantity: clampedQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const getProductQuantity = (id: string) => {
    return productQuantities[id] || 1;
  };

  const updateProductQuantity = (id: string, quantity: number, maxQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(quantity, maxQuantity));
    setProductQuantities((prev) => ({
      ...prev,
      [id]: clampedQuantity,
    }));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700";
      case "in_transit":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Organic":
        return "bg-green-100 text-green-700";
      case "Premium":
        return "bg-purple-100 text-purple-700";
      case "Standard":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.farmer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f3ed] via-[#f3f7f0] to-white">
      <Header />
      
      {/* Fixed Floating Cart Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed right-6 top-24 z-50 shadow-2xl bg-buyer hover:bg-buyer/90 transition-all hover:scale-110"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {cartItemCount > 0 && (
              <Badge className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 p-0 text-xs flex items-center justify-center animate-bounce">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Shopping Cart ({cart.length} items)</SheetTitle>
            <SheetDescription>
              Review your items before checkout
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <>
                <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.crop}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">
                                {item.crop}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {item.farmer}
                              </p>
                              <p className="mt-1 text-sm font-semibold text-foreground">
                                ₹{item.price}/kg
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    updateCartQuantity(
                                      item.id,
                                      item.cartQuantity - 1
                                    )
                                  }
                                  disabled={item.cartQuantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-16 text-center text-sm font-semibold">
                                  {item.cartQuantity}kg
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    updateCartQuantity(
                                      item.id,
                                      item.cartQuantity + 1
                                    )
                                  }
                                  disabled={item.cartQuantity >= item.quantity}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="text-sm font-bold text-foreground">
                                ₹{(item.price * item.cartQuantity).toLocaleString()}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Max: {item.quantity}kg available
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-buyer">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-buyer hover:bg-buyer/90" 
                    size="lg"
                    onClick={() => navigate("/buyer/checkout", { state: { cartItems: cart } })}
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <main className="flex-1">
        {/* Hero Section with Cart */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f1efe8] via-[#f4faf2] to-white py-12">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-buyer/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative rounded-full bg-gradient-to-br from-buyer/20 to-buyer/5 p-4 backdrop-blur-sm border border-buyer/20">
                      <ShoppingCart className="h-7 w-7 text-buyer" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-foreground">Farm-Fresh Marketplace</h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                      <Sparkles className="h-4 w-4 text-buyer" />
                      Direct from verified farmers to your doorstep
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-buyer/30 text-buyer hover:bg-buyer/10 transition-colors px-3 py-1">
                    🏠 Home Delivery
                  </Badge>
                  <Badge variant="outline" className="border-buyer/30 text-buyer hover:bg-buyer/10 transition-colors px-3 py-1">
                    🥬 Fresh & Organic
                  </Badge>
                  <Badge variant="outline" className="border-buyer/30 text-buyer hover:bg-buyer/10 transition-colors px-3 py-1">
                    📦 All Quantities
                  </Badge>
                  <Badge variant="outline" className="border-buyer/30 text-buyer hover:bg-buyer/10 transition-colors px-3 py-1">
                    💰 Best Prices
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">2</Badge>
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
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-buyer data-[state=active]:to-buyer/90 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="marketplace"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-buyer data-[state=active]:to-buyer/90 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Wheat className="mr-2 h-4 w-4" />
                  Marketplace
                </TabsTrigger>
                <TabsTrigger
                  value="purchases"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-buyer data-[state=active]:to-buyer/90 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Package className="mr-2 h-4 w-4" />
                  My Purchases
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-buyer data-[state=active]:to-buyer/90 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
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
                    <div className="absolute top-0 right-0 w-32 h-32 bg-buyer/5 rounded-full blur-3xl group-hover:bg-buyer/10 transition-colors" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-xl bg-gradient-to-br from-buyer/10 to-buyer/5 p-3 group-hover:scale-110 transition-transform">
                          <DollarSign className="h-6 w-6 text-buyer" />
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          +54%
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Spending</p>
                        <p className="text-3xl font-bold text-foreground mb-2">₹28,500</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Target className="h-3 w-3" />
                          <span>Budget: ₹35,000</span>
                        </div>
                        <Progress value={81} className="mt-3 h-1.5" />
                        <p className="text-xs text-muted-foreground mt-2">81% of monthly budget used</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="relative overflow-hidden border-border bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 p-3 group-hover:scale-110 transition-transform">
                          <Award className="h-6 w-6 text-emerald-600" />
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <Zap className="mr-1 h-3 w-3" />
                          17.6%
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Savings</p>
                        <p className="text-3xl font-bold text-foreground mb-2">₹6,020</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <PieChartIcon className="h-3 w-3" />
                          <span>vs market prices</span>
                        </div>
                        <div className="mt-3 p-2 bg-emerald-50 rounded-lg">
                          <p className="text-xs font-semibold text-emerald-700">Avg savings: ₹6/kg</p>
                        </div>
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
                          12
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Orders Completed</p>
                        <p className="text-3xl font-bold text-foreground mb-2">47</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>2 active orders</span>
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
                        <p className="text-xs text-muted-foreground mt-2">Last 7 days activity</p>
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
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          100%
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Trusted Farmers</p>
                        <p className="text-3xl font-bold text-foreground mb-2">8</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="h-3 w-3" />
                          <span>Avg rating: 4.75/5</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                                {String.fromCharCode(64 + i)}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">+4 more</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">All verified & trusted</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* AI Insights Banner */}
                <Card className="relative overflow-hidden border-border bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 p-6 shadow-lg">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl" />
                  <div className="relative flex items-start gap-4">
                    <div className="rounded-xl bg-white/80 backdrop-blur-sm p-3 shadow-sm">
                      <Sparkles className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">💰 Smart Savings Insights</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        You're saving an average of ₹6/kg compared to market prices! Your purchases from Ramesh Kumar show 15% savings. Consider bulk ordering Organic products to maximize savings this month.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-white/80 text-emerald-700 hover:bg-white border-emerald-200">
                          <TrendingDown className="mr-1 h-3 w-3" />
                          Best Prices
                        </Badge>
                        <Badge className="bg-white/80 text-teal-700 hover:bg-white border-teal-200">
                          <Leaf className="mr-1 h-3 w-3" />
                          Organic Focus
                        </Badge>
                        <Badge className="bg-white/80 text-cyan-700 hover:bg-white border-cyan-200">
                          <Award className="mr-1 h-3 w-3" />
                          Top Quality Farmers
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Charts Row */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Spending Trend Chart */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-buyer" />
                          Monthly Spending Trend
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Track your purchase patterns over time
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                        <Info className="mr-1 h-3 w-3" />
                        +54%
                      </Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <ComposedChart data={spendingData}>
                        <defs>
                          <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#fb923c" stopOpacity={0.1}/>
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
                          dataKey="spending" 
                          fill="url(#colorSpending)" 
                          stroke="#fb923c"
                          strokeWidth={2}
                          name="Spending"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="orders" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', r: 4 }}
                          yAxisId={0}
                          name="Orders"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <p className="text-sm text-orange-900">
                        <strong>📈 Insight:</strong> Your spending has increased by 54% over 5 months, but you maintained consistent ordering patterns (12-13 orders/month). Your average order value is growing healthily.
                      </p>
                    </div>
                  </Card>

                  {/* Price Comparison Chart */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Award className="h-5 w-5 text-emerald-600" />
                          Price Advantage Analysis
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your prices vs market average
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                        <TrendingDown className="mr-1 h-3 w-3" />
                        -17.6%
                      </Badge>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={priceComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => `₹${value}/kg`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="yourPrice" 
                          stroke="#22c55e" 
                          strokeWidth={3}
                          dot={{ fill: '#22c55e', r: 5, strokeWidth: 2, stroke: '#fff' }}
                          name="Your Price"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="marketPrice" 
                          stroke="#ef4444" 
                          strokeWidth={3}
                          strokeDasharray="5 5"
                          dot={{ fill: '#ef4444', r: 5, strokeWidth: 2, stroke: '#fff' }}
                          name="Market Price"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                      <p className="text-sm text-emerald-900">
                        <strong>💰 Savings Alert:</strong> You consistently pay ₹6/kg less than market average! Total savings: ₹6,020. Buying direct from farmers saves you 17.6% on every purchase.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Category Distribution and Top Farmers */}
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Activity Feed */}
                  <Card className="lg:col-span-1 border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Recent Activity
                      </h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
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

                  {/* Purchase Categories */}
                  <Card className="lg:col-span-2 border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <PieChartIcon className="h-5 w-5 text-purple-600" />
                          Purchase Distribution
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          How you spend across categories
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {categoryData.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                style={{ backgroundColor: COLORS[index] }}
                              >
                                {category.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">{category.name}</p>
                                <p className="text-xs text-muted-foreground">{category.orders} orders</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-foreground">₹{category.spending.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{category.value}%</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={category.value * 2.5} 
                              className="h-2 flex-1"
                            />
                            <span className="text-xs text-muted-foreground w-12 text-right">{category.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-900">
                        <strong>🥬 Category Insight:</strong> Vegetables dominate your purchases (35%), followed by Grains (30%). Consider seasonal bulk purchases for better deals on staple items.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Top Farmers Performance */}
                <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Users className="h-5 w-5 text-amber-600" />
                        Top Trusted Farmers
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your most reliable partners with best savings
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <Award className="mr-1 h-3 w-3" />
                      Top 4
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {farmerRatings.map((farmer, index) => (
                      <Card key={index} className="p-4 bg-gradient-to-br from-muted/50 to-muted/20 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {farmer.farmer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{farmer.farmer}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs font-semibold text-foreground">{farmer.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-3" />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Orders</span>
                            <span className="font-semibold text-foreground">{farmer.orders}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Savings</span>
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                              +{farmer.savings}%
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                          View Profile
                        </Button>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-xl border border-amber-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">👨‍🌾 Farmer Recommendation</p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Ramesh Kumar</strong> offers the best combination of quality (4.8★) and savings (15%). <strong>Suresh Patil</strong> provides maximum savings (18%) on bulk orders. Consider building long-term relationships for better deals.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quality Preference */}
                <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        Quality Preference Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your purchasing patterns by product quality
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      47 Orders
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={qualityDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ quality, percentage }) => `${quality}: ${percentage}%`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="count"
                          paddingAngle={2}
                        >
                          {qualityDistribution.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]}
                              stroke="#fff"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col justify-center space-y-4">
                      {qualityDistribution.map((item, index) => (
                        <div key={item.quality} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-4 w-4 rounded-full border-2 border-white shadow-sm" 
                              style={{ backgroundColor: COLORS[index] }}
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.quality}</p>
                              <p className="text-xs text-muted-foreground">{item.count} orders</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.percentage}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">🌱 Quality Insight</p>
                        <p className="text-sm text-muted-foreground">
                          You prefer <strong>Organic products</strong> (38% of orders), showing commitment to healthy eating. Premium products follow at 34%. This quality-focused approach ensures you get the best produce while supporting sustainable farming.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Marketplace Tab */}
              <TabsContent value="marketplace" className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Fresh Produce Available Now
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {filteredListings.length} products from verified farmers
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1 md:w-80">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search crops or farmers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredListings.map((listing) => (
                    <Card
                      key={listing.id}
                      className="group overflow-hidden border-border bg-white/90 shadow-soft transition hover:shadow-xl hover:scale-[1.02]"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={listing.image}
                          alt={listing.crop}
                          className="h-full w-full object-cover transition group-hover:scale-110"
                        />
                        <div className="absolute right-2 top-2 flex gap-2">
                          <Badge className={getQualityColor(listing.quality)}>
                            {listing.quality}
                          </Badge>
                          {listing.verified && (
                            <Badge className="bg-emerald-100 text-emerald-700">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-2 bg-white/90 hover:bg-white"
                          onClick={() => toggleFavorite(listing.id)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(listing.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }`}
                          />
                        </Button>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {listing.crop}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{listing.farmer}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{listing.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-foreground">
                            {listing.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            (24 reviews)
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-br from-buyer/5 to-buyer/10 p-3">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Price per kg
                            </p>
                            <p className="text-xl font-bold text-buyer">
                              ₹{listing.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              Available
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {listing.quantity} kg
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Hash className="h-3 w-3" />
                          <span className="font-mono truncate">
                            {listing.blockchainHash}
                          </span>
                        </div>

                        {/* Buttons Area - Shows either buttons or quantity selector */}
                        {showQuantitySelector === listing.id ? (
                          // Quantity Selector Mode
                          <div className="space-y-3">
                            <div className="rounded-lg border border-buyer bg-buyer/5 p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">
                                  Quantity
                                </span>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      updateProductQuantity(
                                        listing.id,
                                        getProductQuantity(listing.id) - 1,
                                        listing.quantity
                                      )
                                    }
                                    disabled={getProductQuantity(listing.id) <= 1}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-16 text-center font-bold text-foreground">
                                    {getProductQuantity(listing.id)} kg
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      updateProductQuantity(
                                        listing.id,
                                        getProductQuantity(listing.id) + 1,
                                        listing.quantity
                                      )
                                    }
                                    disabled={
                                      getProductQuantity(listing.id) >= listing.quantity
                                    }
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground text-right">
                                Max: {listing.quantity}kg available
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowQuantitySelector(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                className={`flex-1 bg-buyer hover:bg-buyer/90 transition-all ${
                                  addingToCart === listing.id
                                    ? "scale-95 bg-emerald-600"
                                    : ""
                                }`}
                                onClick={() => addToCart(listing, getProductQuantity(listing.id))}
                                disabled={addingToCart === listing.id}
                              >
                                {addingToCart === listing.id ? (
                                  <>
                                    <CheckCircle2 className="mr-2 h-4 w-4 animate-pulse" />
                                    Added!
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Confirm
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // Normal Buttons Mode
                          <div className="flex gap-2">
                            <Button
                              className="flex-1 bg-buyer hover:bg-buyer/90"
                              onClick={() => handleAddToCartClick(listing.id)}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                            <Button
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                              onClick={() => {
                                // Create a temporary cart with 1kg default
                                const buyNowCart = [{...listing, cartQuantity: 1}];
                                navigate("/buyer/checkout", { state: { cartItems: buyNowCart } });
                              }}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Buy Now
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Purchases Tab */}
              <TabsContent value="purchases" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">
                    Purchase History
                  </h2>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>

                <div className="grid gap-4">
                  {purchases.map((purchase) => (
                    <Card
                      key={purchase.id}
                      className="border-border bg-white/90 p-6 shadow-soft transition hover:shadow-lg"
                    >
                      <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {purchase.id}
                                </h3>
                                <Badge className={getStatusColor(purchase.status)}>
                                  {purchase.status === "in_transit"
                                    ? "In Transit"
                                    : purchase.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <Users className="mr-1 inline h-3 w-3" />
                                Farmer: {purchase.farmer}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-foreground">
                                ₹{purchase.total.toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <Clock className="mr-1 inline h-3 w-3" />
                                {purchase.date}
                              </p>
                            </div>
                          </div>

                          <div className="rounded-lg bg-muted/30 p-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground">
                                {purchase.crop}
                              </span>
                              <span className="font-semibold text-foreground">
                                Qty: {purchase.quantity} kg
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Hash className="h-3 w-3" />
                              <span className="font-mono">
                                {purchase.blockchainHash}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                                Blockchain Verified
                              </Badge>
                            </div>

                            {purchase.status === "in_transit" && (
                              <div className="rounded-lg bg-blue-50 p-3">
                                <div className="flex items-center gap-2 text-sm text-blue-700">
                                  <Truck className="h-4 w-4" />
                                  <span>Expected delivery: Tomorrow, 2:00 PM</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {purchase.status === "in_transit" && (
                            <Button size="sm" variant="outline">
                              <Truck className="mr-2 h-4 w-4" />
                              Track Order
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {purchase.status === "delivered" && (
                            <Button size="sm" variant="outline">
                              <Star className="mr-2 h-4 w-4" />
                              Rate
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {purchases.length === 0 && (
                  <Card className="border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      No purchases yet
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Browse the marketplace to find fresh produce from verified
                      farmers
                    </p>
                    <Button className="mt-4 bg-buyer hover:bg-buyer/90">
                      Explore Marketplace
                    </Button>
                  </Card>
                )}
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">Purchase Analytics</h2>
                    <p className="text-sm text-muted-foreground mt-1">Deep insights into your buying patterns and savings</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Last 5 Months
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Activity className="h-4 w-4" />
                      Export Report
                    </Button>
                  </div>
                </div>

                {/* Key Metrics Summary */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-border bg-gradient-to-br from-orange-50 to-white p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">₹2,375</p>
                    <p className="text-xs text-orange-600 mt-2">↑ 18.5% from avg</p>
                  </Card>
                  <Card className="border-border bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
                      <Award className="h-4 w-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">₹6,020</p>
                    <p className="text-xs text-emerald-600 mt-2">vs market prices</p>
                  </Card>
                  <Card className="border-border bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">Order Frequency</p>
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">2.4/week</p>
                    <p className="text-xs text-blue-600 mt-2">Consistent buyer</p>
                  </Card>
                </div>

                {/* Comprehensive Spending Analysis */}
                <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                        Spending & Order Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Track your purchasing patterns and order frequency over time
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +54% Growth
                    </Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={spendingData}>
                      <defs>
                        <linearGradient id="colorSpendingAnalytics" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fb923c" stopOpacity={0.9}/>
                          <stop offset="95%" stopColor="#fb923c" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={13} fontWeight={500} />
                      <YAxis yAxisId="left" stroke="#6b7280" fontSize={13} />
                      <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={13} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '12px',
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                          padding: '12px'
                        }}
                        formatter={(value: number, name: string) => {
                          if (name === 'Spending') return [`₹${value.toLocaleString()}`, name];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="spending" 
                        stroke="#fb923c" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorSpendingAnalytics)"
                        dot={{ fill: '#fb923c', r: 6, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8 }}
                        name="Spending"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="orders"
                        fill="#3b82f6"
                        radius={[8, 8, 0, 0]}
                        name="Orders"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                  <Separator className="my-6" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Highest Spend</p>
                      <p className="text-lg font-bold text-foreground">May</p>
                      <p className="text-xs text-orange-600">₹28,500</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Most Orders</p>
                      <p className="text-lg font-bold text-foreground">Apr</p>
                      <p className="text-xs text-blue-600">13 orders</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
                      <p className="text-lg font-bold text-foreground">₹119.5K</p>
                      <p className="text-xs text-emerald-600">5 months</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Avg/Month</p>
                      <p className="text-lg font-bold text-foreground">₹23.9K</p>
                      <p className="text-xs text-purple-600">consistent</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Sparkles className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">📊 Spending Insight</p>
                        <p className="text-sm text-muted-foreground">
                          Your spending increased 54% over 5 months while maintaining 10-13 orders/month. This indicates you're buying higher quality or larger quantities. Average order value grew from ₹2,312 to ₹2,375.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Category & Quality Analysis */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Category Breakdown */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <PieChartIcon className="h-5 w-5 text-purple-600" />
                          Category Spending
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Distribution across product categories
                        </p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={categoryData} layout="vertical">
                        <defs>
                          <linearGradient id="colorCategoryBar" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                        <XAxis type="number" stroke="#6b7280" fontSize={12} />
                        <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={80} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                          }}
                          formatter={(value: number) => `₹${value.toLocaleString()}`}
                        />
                        <Bar 
                          dataKey="spending" 
                          fill="url(#colorCategoryBar)" 
                          radius={[0, 8, 8, 0]} 
                          name="Spending"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                      <p className="text-sm text-purple-900">
                        <strong>🥬 Category Insight:</strong> Vegetables (₹9,975) and Grains (₹8,550) are your staples. Organic purchases (₹4,275) show health-conscious buying despite being 15% of total spend.
                      </p>
                    </div>
                  </Card>

                  {/* Quality Distribution */}
                  <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-600" />
                          Quality Metrics
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your quality preferences breakdown
                        </p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={qualityDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ quality, percentage }) => `${quality}: ${percentage}%`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="count"
                          paddingAngle={3}
                        >
                          {qualityDistribution.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]}
                              stroke="#fff"
                              strokeWidth={3}
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
                          formatter={(value: number) => `${value} orders`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                      <p className="text-sm text-green-900">
                        <strong>🌱 Quality Insight:</strong> 38% Organic + 34% Premium = 72% high-quality purchases. You prioritize health and quality, supporting sustainable farming practices.
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Price Comparison & Savings */}
                <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Award className="h-5 w-5 text-emerald-600" />
                        Price Advantage & Savings Tracker
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        How much you save by buying direct from farmers vs market prices
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      <TrendingDown className="mr-1 h-3 w-3" />
                      -17.6% Better
                    </Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={priceComparisonData}>
                      <defs>
                        <linearGradient id="colorYourPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMarketPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={13} />
                      <YAxis stroke="#6b7280" fontSize={13} label={{ value: '₹/kg', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                        }}
                        formatter={(value: number) => `₹${value}/kg`}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="yourPrice" 
                        stroke="#22c55e" 
                        fill="url(#colorYourPrice)"
                        strokeWidth={3}
                        name="Your Average Price"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="marketPrice" 
                        stroke="#ef4444" 
                        fill="url(#colorMarketPrice)"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Market Average"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="yourPrice" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', r: 6, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8 }}
                        name="Your Price"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="marketPrice" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ fill: '#ef4444', r: 6, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8 }}
                        name="Market Price"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <Separator className="my-6" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Total Savings</p>
                      <p className="text-xl font-bold text-emerald-600">₹6,020</p>
                      <p className="text-xs text-muted-foreground mt-1">5 months</p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Avg Savings/kg</p>
                      <p className="text-xl font-bold text-teal-600">₹6</p>
                      <p className="text-xs text-muted-foreground mt-1">per kilogram</p>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Best Saving</p>
                      <p className="text-xl font-bold text-cyan-600">₹10/kg</p>
                      <p className="text-xs text-muted-foreground mt-1">January</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">% Cheaper</p>
                      <p className="text-xl font-bold text-green-600">17.6%</p>
                      <p className="text-xs text-muted-foreground mt-1">on average</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-xl border border-emerald-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Award className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">💰 Savings Breakthrough!</p>
                        <p className="text-sm text-muted-foreground">
                          By buying directly from farmers, you've saved <strong>₹6,020 in 5 months</strong> - that's equivalent to <strong>21 free kg of produce</strong>! 
                          The price gap is widening (₹6/kg in May vs ₹6/kg in Jan), suggesting even better deals ahead. Your smart purchasing strategy beats market prices by 17.6%.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Top Farmers Performance */}
                <Card className="border-border bg-white/90 backdrop-blur-sm p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Users className="h-5 w-5 text-amber-600" />
                        Farmer Performance Comparison
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Rating and savings analysis of your trusted farmers
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <Star className="mr-1 h-3 w-3" />
                      4.75 Avg
                    </Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={farmerRatings}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="farmer" stroke="#6b7280" fontSize={11} angle={-15} textAnchor="end" height={80} />
                      <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} />
                      <YAxis yAxisId="right" orientation="right" stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                        }}
                      />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="orders" 
                        fill="#3b82f6" 
                        radius={[8, 8, 0, 0]} 
                        name="Orders"
                      />
                      <Bar 
                        yAxisId="right"
                        dataKey="savings" 
                        fill="#22c55e" 
                        radius={[8, 8, 0, 0]} 
                        name="Savings %"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-6 grid grid-cols-4 gap-4">
                    {farmerRatings.map((farmer, index) => (
                      <div key={index} className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground mb-1">{farmer.farmer.split(' ')[0]}</p>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-bold text-foreground">{farmer.rating}</span>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                          +{farmer.savings}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-xl border border-amber-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">👨‍🌾 Farmer Analytics</p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Ramesh Kumar</strong> leads with 8 orders (4.8★ rating, 15% savings). <strong>Lakshmi Devi</strong> has the highest rating (4.9★). 
                          <strong>Suresh Patil</strong> offers maximum savings (18%). Consider rotating between top 3 farmers for variety while maintaining quality and savings.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* AI Chatbot */}
      <AIChatbot userRole="buyer" />
    </div>
  );
};

export default BuyerDashboard;
