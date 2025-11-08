import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Handshake, 
  Tractor, 
  MessageCircleMore, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Send, 
  MapPin,
  Sparkles,
  TrendingUp,
  Package,
  Clock,
  Star,
  Hash,
  AlertCircle,
  Users,
  Wrench,
} from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const posts = [
  {
    id: "POST-774",
    type: "Need",
    title: "Need Tractor for 1 day",
    author: "Murthy",
    distance: "3 km",
    message: "Looking for a tractor + driver to plough 2 acres tomorrow morning.",
    responses: 4,
    verified: true,
    rating: 4.8,
    blockchainHash: "0x9F2A8B4C6D1E3H5K",
  },
  {
    id: "POST-775",
    type: "Offer",
    title: "Lending Sprayer (Backpack)",
    author: "Lakshmi",
    distance: "1.2 km",
    message: "Can lend for 2 days. DPIN verification required before pickup.",
    responses: 2,
    verified: true,
    rating: 4.9,
    blockchainHash: "0x7K5J3H2F1D9C8B6A",
  },
  {
    id: "POST-776",
    type: "Offer",
    title: "Water Pump Available",
    author: "Suresh",
    distance: "5 km",
    message: "Diesel water pump available for rent. ₹500/day including fuel.",
    responses: 6,
    verified: true,
    rating: 4.7,
    blockchainHash: "0x4D3C2B1A9H8G7F6E",
  },
];

// Active lending/borrowing
const activeLendings = [
  {
    id: "LEND-001",
    item: "Tractor with Rotavator",
    borrower: "Ramesh Kumar",
    duration: "3 days",
    returnDate: "2 days left",
    status: "active",
    deposit: "₹5,000",
    blockchainHash: "0x2E1F9G8H7J6K5L4M",
  },
  {
    id: "LEND-002",
    item: "Seed Drill Machine",
    borrower: "Prakash Rao",
    duration: "1 day",
    returnDate: "Today",
    status: "returning",
    deposit: "₹2,000",
    blockchainHash: "0x8C9D2A3B4E5F6G7H",
  },
];

// AI Recommendations
const aiRecommendations = [
  {
    tool: "Rotavator",
    reason: "Based on your 5-acre land size and upcoming sowing season",
    availability: "3 farmers nearby",
    avgCost: "₹800/day",
    confidence: 88,
  },
  {
    tool: "Sprinkler System",
    reason: "Weather forecast shows low rainfall next 2 weeks",
    availability: "2 farmers nearby",
    avgCost: "₹600/day",
    confidence: 82,
  },
];

// Community stats
const communityStats = {
  totalMembers: 156,
  activeTools: 42,
  completedExchanges: 89,
  avgSavings: "₹12,500",
};

const FarmerCommunityExchange = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700";
      case "returning":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <FarmerPageShell
      title="Community Exchange"
      description="Share tools, borrow equipment, and connect with nearby farmers. AI-powered recommendations help you save costs."
      badge="Community"
    >
      <div className="space-y-6">
        {/* Community Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border bg-white/90 p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Community Members</p>
                <p className="text-2xl font-bold text-foreground">{communityStats.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-farmer" />
            </div>
          </Card>
          <Card className="border-border bg-white/90 p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tools Available</p>
                <p className="text-2xl font-bold text-foreground">{communityStats.activeTools}</p>
              </div>
              <Wrench className="h-8 w-8 text-farmer" />
            </div>
          </Card>
          <Card className="border-border bg-white/90 p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Exchanges</p>
                <p className="text-2xl font-bold text-foreground">{communityStats.completedExchanges}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-farmer" />
            </div>
          </Card>
          <Card className="border-border bg-white/90 p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Savings/Month</p>
                <p className="text-2xl font-bold text-foreground">{communityStats.avgSavings}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-farmer" />
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Post Creation */}
            <Card className="border-border bg-white/90 p-6 shadow-soft">
              <Tabs defaultValue="need" className="space-y-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Share with Community</h2>
                    <p className="text-sm text-muted-foreground">
                      Post what you need or offer what you have. Visible within 15 km radius.
                    </p>
                  </div>
                  <TabsList className="bg-muted/50">
                    <TabsTrigger value="need" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                      Need Help
                    </TabsTrigger>
                    <TabsTrigger value="offer" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                      Offer Tool
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="need" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="need-title">
                        What do you need?
                      </label>
                      <Input id="need-title" placeholder="e.g. Need tractor for 1 day" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="need-date">
                        Required on
                      </label>
                      <Input id="need-date" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="need-details">
                      Additional details
                    </label>
                    <Textarea id="need-details" rows={3} placeholder="Mention duration, land size, any specific requirements..." />
                  </div>
                  <Button className="inline-flex items-center gap-2 bg-farmer hover:bg-farmer/90">
                    <Send className="h-4 w-4" />
                    Publish Need
                  </Button>
                </TabsContent>
                <TabsContent value="offer" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="offer-title">
                        What are you offering?
                      </label>
                      <Input id="offer-title" placeholder="e.g. Lending sprayer for 2 days" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" htmlFor="offer-available">
                        Available until
                      </label>
                      <Input id="offer-available" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="offer-details">
                      Additional details
                    </label>
                    <Textarea id="offer-details" rows={3} placeholder="Mention condition, pickup address, rental cost if any..." />
                  </div>
                  <Button className="inline-flex items-center gap-2 bg-farmer hover:bg-farmer/90">
                    <Send className="h-4 w-4" />
                    Publish Offer
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Community Posts */}
            <Card className="border-border bg-white/90 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Posts</h3>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="border-border bg-white/95 p-5 shadow-sm">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border border-farmer/20 bg-farmer/10 text-farmer">
                              <AvatarFallback>{post.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <Badge
                                  variant="secondary"
                                  className={post.type === "Need" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}
                                >
                                  {post.type}
                                </Badge>
                                <h4 className="font-semibold text-foreground">{post.title}</h4>
                                {post.verified && (
                                  <Badge className="bg-emerald-100 text-emerald-700">
                                    <ShieldCheck className="mr-1 h-3 w-3" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {post.distance}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                  {post.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-foreground/85">{post.message}</p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Hash className="h-3 w-3" />
                          <span className="font-mono">{post.blockchainHash}</span>
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                            Verified
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                            <MessageCircleMore className="h-4 w-4" />
                            {post.responses} responses
                          </Button>
                          <Button size="sm" className="bg-farmer hover:bg-farmer/90">
                            <Handshake className="mr-2 h-4 w-4" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Recommendations */}
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
                        <h4 className="font-semibold text-foreground">{rec.tool}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{rec.availability}</p>
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
                      <span className="text-sm font-semibold text-foreground">{rec.avgCost}</span>
                      <Button size="sm" className="bg-farmer hover:bg-farmer/90">
                        Find Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="rounded-lg bg-muted/30 p-3 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-farmer" />
                  Recommendations based on your crop cycle and weather
                </p>
              </div>
            </Card>

            {/* Active Lendings */}
            <Card className="border-border bg-white/90 p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-farmer" />
                  <h3 className="text-lg font-semibold text-foreground">Your Active Lendings</h3>
                </div>
                <Badge variant="outline">{activeLendings.length}</Badge>
              </div>

              <div className="space-y-3">
                {activeLendings.map((lending) => (
                  <div key={lending.id} className="rounded-lg border border-border bg-muted/20 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{lending.item}</p>
                        <p className="text-xs text-muted-foreground">To: {lending.borrower}</p>
                      </div>
                      <Badge className={getStatusColor(lending.status)}>
                        {lending.status}
                      </Badge>
                    </div>

                    <div className="grid gap-2 text-xs mt-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-semibold text-foreground">{lending.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Return:</span>
                        <span className="font-semibold text-foreground">{lending.returnDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deposit:</span>
                        <span className="font-semibold text-foreground">{lending.deposit}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                      <Hash className="h-3 w-3" />
                      <span className="font-mono truncate">{lending.blockchainHash}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All History
              </Button>
            </Card>

            {/* Benefits */}
            <Card className="border-border bg-white/90 p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Community Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Save Costs</p>
                    <p className="text-sm text-muted-foreground">Borrow instead of buying expensive equipment</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Earn Extra</p>
                    <p className="text-sm text-muted-foreground">Lend your idle tools and earn money</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Verified & Secure</p>
                    <p className="text-sm text-muted-foreground">DPIN verification and blockchain tracking</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Local Network</p>
                    <p className="text-sm text-muted-foreground">Connect with farmers within 15 km</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </FarmerPageShell>
  );
};

export default FarmerCommunityExchange;
