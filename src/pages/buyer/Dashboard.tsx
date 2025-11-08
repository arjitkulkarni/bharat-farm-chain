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
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        <section className="bg-gradient-to-br from-[#f1efe8] via-[#f4faf2] to-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-buyer/10 p-3">
                    <ShoppingCart className="h-6 w-6 text-buyer" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      Farm-Fresh Marketplace
                    </h1>
                    <p className="text-muted-foreground">
                      Direct from farmers to your doorstep
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-buyer/30 text-buyer">
                    🏠 Home Delivery
                  </Badge>
                  <Badge variant="outline" className="border-buyer/30 text-buyer">
                    🥬 Fresh & Organic
                  </Badge>
                  <Badge variant="outline" className="border-buyer/30 text-buyer">
                    📦 All Quantities
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border bg-white/90 p-6 shadow-soft transition hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Purchases</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      ₹28,500
                    </p>
                    <p className="mt-1 text-sm text-emerald-600">
                      12 orders completed
                    </p>
                  </div>
                  <div className="rounded-full bg-buyer/10 p-3">
                    <Package className="h-6 w-6 text-buyer" />
                  </div>
                </div>
              </Card>

              <Card className="border-border bg-white/90 p-6 shadow-soft transition hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Orders</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">2</p>
                    <p className="mt-1 text-sm text-blue-600">1 in transit</p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="border-border bg-white/90 p-6 shadow-soft transition hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Trusted Farmers
                    </p>
                    <p className="mt-1 text-2xl font-bold text-foreground">8</p>
                    <p className="mt-1 text-sm text-purple-600">All verified</p>
                  </div>
                  <div className="rounded-full bg-purple-100 p-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="marketplace" className="space-y-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger
                  value="marketplace"
                  className="data-[state=active]:bg-buyer data-[state=active]:text-white"
                >
                  <Wheat className="mr-2 h-4 w-4" />
                  Marketplace
                </TabsTrigger>
                <TabsTrigger
                  value="purchases"
                  className="data-[state=active]:bg-buyer data-[state=active]:text-white"
                >
                  <Package className="mr-2 h-4 w-4" />
                  My Purchases
                </TabsTrigger>
              </TabsList>

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
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
