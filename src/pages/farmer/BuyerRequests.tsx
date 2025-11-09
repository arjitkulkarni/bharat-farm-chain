import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin,
  Calendar,
  Repeat,
  TrendingUp,
  Package,
  Clock,
  Star,
  Hash,
  AlertCircle,
  X,
  IndianRupee,
  Users,
  Activity,
  ThumbsDown,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import FarmerPageShell from "./FarmerPageShell";

const mockRequests = [
  {
    id: "REQ-5512",
    name: "Ravi Traders",
    distance: "5 km",
    crop: "Turmeric (Organic)",
    quantity: "80 kg",
    status: "pending",
    message: "Looking to buy 80 kg for export order. Need within 4 days.",
    rating: 4.8,
    verified: true,
    blockchainHash: "0x9F2A8B4C6D1E3H5K",
  },
  {
    id: "REQ-5513",
    name: "Mahadeva Retail",
    distance: "12 km",
    crop: "Red Onions",
    quantity: "300 kg",
    status: "approved",
    message: "Repeat buyer. Wants to negotiate price & delivery schedule.",
    rating: 4.6,
    verified: true,
    blockchainHash: "0x7K5J3H2F1D9C8B6A",
  },
];

// Monthly subscription orders
const subscriptionOrders = [
  {
    id: "SUB-001",
    buyer: "Fresh Mart Supermarket",
    crop: "Organic Rice",
    quantity: "500 kg/month",
    price: "₹45/kg",
    duration: "6 months",
    nextDelivery: "5 days",
    status: "active",
    distance: "8 km",
    rating: 4.9,
    blockchainHash: "0x4D3C2B1A9H8G7F6E",
  },
  {
    id: "SUB-002",
    buyer: "Green Valley Restaurant",
    crop: "Fresh Tomatoes",
    quantity: "100 kg/week",
    price: "₹30/kg",
    duration: "3 months",
    nextDelivery: "2 days",
    status: "active",
    distance: "3 km",
    rating: 4.7,
    blockchainHash: "0x2E1F9G8H7J6K5L4M",
  },
];

// Nearby buyers looking for farmers
const nearbyBuyers = [
  {
    id: "BUY-001",
    name: "Organic Foods Co.",
    distance: "2.5 km",
    looking: ["Rice", "Wheat", "Pulses"],
    frequency: "Weekly",
    verified: true,
    rating: 4.8,
    message: "Looking for certified organic farmers for long-term partnership",
  },
  {
    id: "BUY-002",
    name: "Export House India",
    distance: "6 km",
    looking: ["Turmeric", "Spices", "Onions"],
    frequency: "Monthly",
    verified: true,
    rating: 4.9,
    message: "Export quality produce needed. Premium rates for consistent supply",
  },
];

const FarmerBuyerConnect = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [activeTab, setActiveTab] = useState("requests");
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
  const [messageText, setMessageText] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [proposedQuantity, setProposedQuantity] = useState("");

  // Calculate stats
  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const approvedRequests = requests.filter((r) => r.status === "approved").length;
  const totalRequests = requests.length;
  const averageRating = (
    requests.reduce((sum, r) => sum + r.rating, 0) / requests.length
  ).toFixed(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "approved":
        return "bg-blue-100 text-blue-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleApprove = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "approved" } : req
      )
    );
    toast.success("Request Approved! 🎉", {
      description: "The buyer has been notified. You can now contact them directly.",
    });
  };

  const handleReject = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "rejected" } : req
      )
    );
    toast.error("Request Rejected", {
      description: "The buyer has been notified of your decision.",
    });
  };

  const handleContactBuyer = (buyer: any) => {
    setSelectedBuyer(buyer);
    setShowContactDialog(true);
  };

  const handleSendMessage = () => {
    if (!messageText && !proposedPrice) {
      toast.error("Please enter a message or price proposal");
      return;
    }
    
    toast.success("Message Sent! 📨", {
      description: `Your message has been sent to ${selectedBuyer?.name || "the buyer"}`,
    });
    
    setShowContactDialog(false);
    setMessageText("");
    setProposedPrice("");
    setProposedQuantity("");
  };

  const handleCloseDialog = () => {
    setShowContactDialog(false);
    setSelectedBuyer(null);
    setMessageText("");
    setProposedPrice("");
    setProposedQuantity("");
  };

  return (
    <FarmerPageShell
      title="Buyer Connect"
      description="Direct connections with buyers. Schedule monthly orders, approve requests, and eliminate middlemen for better profits."
      badge="Direct Sales"
    >
      {/* Overall Status KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-amber-100 p-3">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">{pendingRequests}</p>
          <p className="text-sm text-muted-foreground">Awaiting Response</p>
          <Progress value={(pendingRequests / totalRequests) * 100} className="mt-3 h-2" />
        </Card>

        <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-blue-100 p-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
            <Badge className="bg-blue-100 text-blue-700">Approved</Badge>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">{approvedRequests}</p>
          <p className="text-sm text-muted-foreground">Active Connections</p>
          <Progress value={(approvedRequests / totalRequests) * 100} className="mt-3 h-2" />
        </Card>

        <Card className="border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-emerald-100 p-3">
              <Repeat className="h-6 w-6 text-emerald-600" />
            </div>
            <Badge className="bg-emerald-100 text-emerald-700">
              <Activity className="mr-1 h-3 w-3" />
              Active
            </Badge>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">{subscriptionOrders.length}</p>
          <p className="text-sm text-muted-foreground">Monthly Subscriptions</p>
          <div className="mt-2 text-xs text-emerald-600">₹45,000/month revenue</div>
        </Card>

        <Card className="border-purple-300 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-purple-100 p-3">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <Badge className="bg-purple-100 text-purple-700">Rating</Badge>
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">{averageRating}</p>
          <p className="text-sm text-muted-foreground">Average Buyer Rating</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
            <Star className="h-3 w-3 fill-purple-400 text-purple-400" />
            <span>Excellent reputation</span>
          </div>
        </Card>
      </div>

      {/* AI Insights Banner */}
      <Card className="border-farmer/30 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 p-5 mb-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-farmer/10 p-2">
            <Sparkles className="h-5 w-5 text-farmer" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              Smart Recommendations
            </h3>
            <p className="text-sm text-muted-foreground">
              💡 You have {pendingRequests} pending request(s) - Review them to maintain good response time • 
              📈 Buyers within 5 km radius offer better profit margins • 
              ⭐ Your {averageRating} rating attracts premium buyers
            </p>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="requests" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
            <Package className="mr-2 h-4 w-4" />
            Buyer Requests ({pendingRequests})
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
            <Repeat className="mr-2 h-4 w-4" />
            Monthly Orders ({subscriptionOrders.length})
          </TabsTrigger>
          <TabsTrigger value="nearby" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
            <MapPin className="mr-2 h-4 w-4" />
            Nearby Buyers ({nearbyBuyers.length})
          </TabsTrigger>
        </TabsList>

        {/* Buyer Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <div className="grid gap-6">
            {requests.map((request) => (
              <Card key={request.id} className="border-border bg-white/95 p-6 shadow-soft transition-all hover:shadow-lg">
                <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 border border-farmer/20 bg-farmer/10 text-farmer">
                        <AvatarFallback>{request.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">{request.name}</h3>
                          {request.verified && (
                            <Badge className="bg-emerald-100 text-emerald-700">
                              <ShieldCheck className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {request.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/30 p-3">
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Crop:</span>
                          <span className="font-semibold text-foreground">{request.crop}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Quantity:</span>
                          <span className="font-semibold text-foreground">{request.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="message" className="border-none">
                        <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground">
                          View buyer message
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {request.message}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Hash className="h-3 w-3" />
                      <span className="font-mono">{request.blockchainHash}</span>
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                        Verified
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {request.status === "pending" && (
                      <>
                        <Button 
                          className="bg-farmer hover:bg-farmer/90"
                          onClick={() => handleApprove(request.id)}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handleReject(request.id)}
                        >
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContactBuyer(request)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </>
                    )}
                    {request.status === "approved" && (
                      <>
                        <Button 
                          className="bg-farmer hover:bg-farmer/90"
                          onClick={() => toast.success("Opening call interface...")}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleContactBuyer(request)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </>
                    )}
                    {request.status === "rejected" && (
                      <div className="rounded-lg bg-red-50 p-3 text-center">
                        <p className="text-sm font-medium text-red-700">Request Rejected</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => handleApprove(request.id)}
                        >
                          Undo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {requests.length === 0 && (
            <Card className="border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No buyer requests yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                When buyers request your produce, they'll appear here
              </p>
            </Card>
          )}
        </TabsContent>

        {/* Monthly Subscription Orders Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Repeat className="h-5 w-5 text-farmer" />
                <h2 className="text-xl font-semibold text-foreground">Active Subscriptions</h2>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">
                {subscriptionOrders.length} Active
              </Badge>
            </div>

            <div className="space-y-4">
              {subscriptionOrders.map((order) => (
                <Card key={order.id} className="border-border bg-white/90 p-5 shadow-sm">
                  <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground">{order.buyer}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              {order.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {order.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {order.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-2 rounded-lg bg-muted/30 p-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Crop:</span>
                          <span className="font-semibold text-foreground">{order.crop}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Quantity:</span>
                          <span className="font-semibold text-foreground">{order.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-semibold text-farmer">{order.price}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-semibold text-foreground">{order.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next Delivery:</span>
                          <span className="font-semibold text-foreground">{order.nextDelivery}</span>
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
                      <Button className="bg-farmer hover:bg-farmer/90">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Monthly Revenue from Subscriptions</h4>
                  <p className="text-2xl font-bold text-farmer mt-1">₹45,000/month</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Guaranteed income • No middleman • Direct payment
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Nearby Buyers Tab */}
        <TabsContent value="nearby" className="space-y-4">
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Buyers Near You</h2>
                <p className="text-sm text-muted-foreground">Connect with verified buyers looking for farmers in your area</p>
              </div>
              <Badge variant="outline" className="bg-farmer/10 text-farmer">
                <MapPin className="mr-1 h-3 w-3" />
                Within 10 km
              </Badge>
            </div>

            <div className="space-y-4">
              {nearbyBuyers.map((buyer) => (
                <Card key={buyer.id} className="border-border bg-white/95 p-5 shadow-sm">
                  <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 border border-farmer/20 bg-farmer/10 text-farmer">
                          <AvatarFallback>{buyer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground">{buyer.name}</h3>
                            {buyer.verified && (
                              <Badge className="bg-emerald-100 text-emerald-700">
                                <ShieldCheck className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {buyer.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {buyer.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {buyer.frequency}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-muted/30 p-3">
                        <p className="text-sm font-semibold text-foreground mb-2">Looking for:</p>
                        <div className="flex flex-wrap gap-2">
                          {buyer.looking.map((crop, index) => (
                            <Badge key={index} variant="outline" className="border-farmer/30 text-farmer">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-lg bg-blue-50 p-3">
                        <p className="flex items-start gap-2 text-sm text-blue-700">
                          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                          {buyer.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button 
                        className="bg-farmer hover:bg-farmer/90"
                        onClick={() => {
                          toast.success("Connection Request Sent!", {
                            description: `Your request to connect with ${buyer.name} has been sent.`
                          });
                        }}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleContactBuyer(buyer)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="rounded-lg border border-farmer/30 bg-gradient-to-br from-emerald-50 to-white p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Why Connect Directly?</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">No Middleman</p>
                    <p className="text-sm text-muted-foreground">Keep 100% of your profits</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Better Prices</p>
                    <p className="text-sm text-muted-foreground">Negotiate directly with buyers</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Guaranteed Orders</p>
                    <p className="text-sm text-muted-foreground">Monthly subscriptions available</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Blockchain Verified</p>
                    <p className="text-sm text-muted-foreground">All transactions secured</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact/Message Dialog */}
      <Dialog open={showContactDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <MessageSquare className="h-6 w-6 text-farmer" />
              Contact {selectedBuyer?.name}
            </DialogTitle>
            <DialogDescription>
              Send a message or price proposal to the buyer
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Buyer Info Summary */}
            <Card className="bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-farmer/20 bg-farmer/10 text-farmer">
                  <AvatarFallback>
                    {selectedBuyer?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{selectedBuyer?.name}</h4>
                    {selectedBuyer?.verified && (
                      <Badge className="bg-emerald-100 text-emerald-700" variant="secondary">
                        <ShieldCheck className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedBuyer?.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {selectedBuyer?.rating}
                    </span>
                  </div>
                  {selectedBuyer?.crop && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Request: <span className="font-medium text-foreground">{selectedBuyer.crop}</span> - {selectedBuyer.quantity}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Price Proposal */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="proposedPrice" className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  Proposed Price (per kg)
                </Label>
                <Input
                  id="proposedPrice"
                  type="number"
                  placeholder="e.g., 45"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposedQuantity" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Available Quantity (kg)
                </Label>
                <Input
                  id="proposedQuantity"
                  type="number"
                  placeholder="e.g., 500"
                  value={proposedQuantity}
                  onChange={(e) => setProposedQuantity(e.target.value)}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="messageText" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Your Message
              </Label>
              <Textarea
                id="messageText"
                placeholder="Enter your message to the buyer..."
                rows={5}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                💡 Tip: Be clear about delivery times and payment terms
              </p>
            </div>

            {/* Quick Message Templates */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Quick Templates:</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessageText("Hi! I have your requested produce available. Let's discuss the details.")}
                >
                  Availability
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessageText("I can offer you premium quality organic produce with certifications.")}
                >
                  Quality Assurance
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessageText("Delivery available within 24-48 hours. Payment upon delivery.")}
                >
                  Delivery Terms
                </Button>
              </div>
            </div>

            {/* Blockchain Notice */}
            <Card className="bg-blue-50 border-blue-200 p-3">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  All communications and agreements will be recorded on the blockchain for transparency and security
                </p>
              </div>
            </Card>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              className="bg-farmer hover:bg-farmer/90"
              onClick={handleSendMessage}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FarmerPageShell>
  );
};

export default FarmerBuyerConnect;
