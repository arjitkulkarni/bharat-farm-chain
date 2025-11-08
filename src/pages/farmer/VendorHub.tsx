import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  ShoppingBag, 
  CheckCircle2, 
  Search, 
  Filter,
  TrendingUp,
  Package,
  Clock,
  Sparkles,
  AlertCircle,
  Calendar,
} from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const vendors = [
  {
    id: "VND-2201",
    name: "Sai Krishi Seeds",
    rating: 4.8,
    distance: "2.5 km",
    verified: true,
    tags: ["Seeds", "Fertilisers"],
    summary: "Certified hybrid seeds and soil nutrients with home delivery.",
  },
  {
    id: "VND-2202",
    name: "Green Shield Agro",
    rating: 4.6,
    distance: "5.1 km",
    verified: true,
    tags: ["Pesticides", "Advisory"],
    summary: "Govt approved pesticides with field consultation support.",
  },
  {
    id: "VND-2203",
    name: "FarmTools Hub",
    rating: 4.3,
    distance: "8.4 km",
    verified: false,
    tags: ["Implements", "Rentals"],
    summary: "Implements for rent, drip kits, and on-call repairs.",
  },
];

// Recent orders data
const recentOrders = [
  {
    id: "ORD-001",
    vendor: "Sai Krishi Seeds",
    product: "Urea Fertilizer (50kg)",
    quantity: 10,
    total: 8500,
    date: "3 days ago",
    status: "delivered",
  },
  {
    id: "ORD-002",
    vendor: "Green Shield Agro",
    product: "Pesticide Spray",
    quantity: 5,
    total: 2250,
    date: "1 week ago",
    status: "delivered",
  },
  {
    id: "ORD-003",
    vendor: "FarmTools Hub",
    product: "Drip Irrigation Kit",
    quantity: 1,
    total: 15000,
    date: "2 weeks ago",
    status: "delivered",
  },
];

// AI Recommendations
const aiRecommendations = [
  {
    product: "DAP Fertilizer",
    reason: "Based on your soil analysis showing phosphorus deficiency",
    confidence: 92,
    vendor: "Sai Krishi Seeds",
    estimatedPrice: "₹1,200/bag",
  },
  {
    product: "Organic Compost",
    reason: "Recommended for improving soil health after recent harvest",
    confidence: 85,
    vendor: "Green Shield Agro",
    estimatedPrice: "₹350/bag",
  },
];

const FarmerVendorHub = () => {
  return (
    <FarmerPageShell
      title="Vendor Hub"
      description="Discover trusted input suppliers nearby. Verified badges, ratings, and contact approvals keep procurement transparent and safe."
      badge="Vendors"
    >
      <div className="grid gap-8 xl:grid-cols-[1.4fr,1fr]">
        <Card className="border-border bg-white/90 p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Find vendors (Stub)</h2>
              <p className="text-sm text-muted-foreground">
                Search and filter across inputs, services, and verified government partners.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Search className="h-4 w-4" />
                Smart search
              </Button>
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input placeholder="Search by crop, product, vendor name..." />
            <Tabs defaultValue="all" className="md:col-span-2">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="seed" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  Seeds
                </TabsTrigger>
                <TabsTrigger value="fertiliser" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  Fertilisers
                </TabsTrigger>
                <TabsTrigger value="tools" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  Tools & Rentals
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <ScrollArea className="h-[360px] pr-4">
                  <div className="space-y-4">
                    {vendors.map((vendor) => (
                      <Card key={vendor.id} className="border-border bg-white/95 p-5 shadow-sm">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12 border border-farmer/20 bg-farmer/10 text-farmer">
                              <AvatarFallback>{vendor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-semibold text-foreground">{vendor.name}</h3>
                                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                                  <Star className="mr-1 h-4 w-4 text-amber-600" />
                                  {vendor.rating}
                                </Badge>
                                {vendor.verified ? (
                                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                                    <ShieldCheck className="mr-1 h-4 w-4 text-emerald-600" />
                                    Govt Verified
                                  </Badge>
                                ) : null}
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground">{vendor.summary}</p>
                              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                <Badge variant="outline" className="border-farmer/30 text-farmer">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {vendor.distance}
                                </Badge>
                                {vendor.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="border-foreground/20 text-foreground">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4" />
                              View Products
                            </Button>
                            <Button className="bg-farmer hover:bg-farmer/90" size="sm">
                              Request Contact
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="seed" className="text-sm text-muted-foreground">
                Seed vendor filter stub.
              </TabsContent>
              <TabsContent value="fertiliser" className="text-sm text-muted-foreground">
                Fertiliser vendor filter stub.
              </TabsContent>
              <TabsContent value="tools" className="text-sm text-muted-foreground">
                Tools & rentals vendor filter stub.
              </TabsContent>
            </Tabs>
          </div>
        </Card>
        <div className="space-y-6">
          {/* AI-Powered Recommendations */}
          <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-farmer/10 p-2">
                <Sparkles className="h-5 w-5 text-farmer" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
            </div>
            
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="rounded-lg border border-farmer/20 bg-white/80 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{rec.product}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{rec.vendor}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {rec.confidence}% match
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    <AlertCircle className="inline h-3 w-3 mr-1" />
                    {rec.reason}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{rec.estimatedPrice}</span>
                    <Button size="sm" className="bg-farmer hover:bg-farmer/90">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="rounded-lg bg-muted/30 p-3 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-farmer" />
                Recommendations updated based on your soil analysis and crop cycle
              </p>
            </div>
          </Card>

          {/* Recent Orders */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-farmer" />
                <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
              </div>
              <Badge variant="outline">3 orders</Badge>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="rounded-lg border border-border bg-muted/20 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{order.product}</p>
                      <p className="text-xs text-muted-foreground">{order.vendor}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {order.date}
                    </span>
                    <span className="font-semibold text-foreground">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Orders
            </Button>
          </Card>

          {/* Purchase Analytics */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-farmer" />
              <h3 className="text-lg font-semibold text-foreground">Purchase Analytics</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Total Spent (This Month)</span>
                  <span className="font-bold text-foreground">₹25,750</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">65% of monthly budget</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Top Categories</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fertilizers</span>
                    <span className="font-semibold text-foreground">₹15,500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pesticides</span>
                    <span className="font-semibold text-foreground">₹6,250</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tools</span>
                    <span className="font-semibold text-foreground">₹4,000</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="rounded-lg bg-blue-50 p-3 text-sm">
                <p className="flex items-center gap-2 text-blue-700">
                  <Clock className="h-4 w-4" />
                  Best time to buy: Early morning (6-9 AM) for better deals
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </FarmerPageShell>
  );
};

export default FarmerVendorHub;

