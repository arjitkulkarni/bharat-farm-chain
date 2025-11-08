import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ShoppingCart,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  CreditCard,
  Truck,
  CheckCircle2,
  Hash,
  ArrowLeft,
  Package,
} from "lucide-react";

interface CartItem {
  id: string;
  crop: string;
  farmer: string;
  location: string;
  quantity: number;
  price: number;
  image: string;
  quality: string;
  blockchainHash: string;
  cartQuantity: number;
}

const BuyerCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = (location.state?.cartItems as CartItem[]) || [];
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Karnataka",
    pincode: "",
    landmark: "",
    deliveryNotes: "",
    paymentMethod: "cod",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  const deliveryCharge = cartTotal >= 1000 ? 0 : 100;
  const gst = Math.round(cartTotal * 0.05); // 5% GST
  const finalTotal = cartTotal + deliveryCharge + gst;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.city || !formData.pincode) {
      alert("Please fill in all required fields");
      return;
    }

    // Generate order ID
    const newOrderId = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);

    // In real app, would send order to backend
    console.log("Order placed:", {
      orderId: newOrderId,
      items: cartItems,
      customerInfo: formData,
      total: finalTotal,
    });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f3ed] via-[#f3f7f0] to-white">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-8 text-center shadow-xl">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                
                <h1 className="text-3xl font-bold text-foreground">Order Placed Successfully! 🎉</h1>
                <p className="mt-2 text-muted-foreground">
                  Thank you for your purchase. Your order has been confirmed.
                </p>

                <div className="my-6 rounded-lg bg-white/80 p-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span>Order ID:</span>
                    <span className="text-lg font-bold text-foreground">{orderId}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Hash className="h-3 w-3" />
                    <span className="font-mono">0x{Math.random().toString(16).slice(2, 18).toUpperCase()}</span>
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                      Blockchain Verified
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-foreground">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">2-3 business days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-4">
                    <Package className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-foreground">Order Total</p>
                      <p className="text-sm text-muted-foreground">₹{finalTotal.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-4">
                    <Mail className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="font-semibold text-foreground">Confirmation Sent</p>
                      <p className="text-sm text-muted-foreground">Check your email for details</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/buyer/dashboard")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Marketplace
                  </Button>
                  <Button
                    className="flex-1 bg-buyer hover:bg-buyer/90"
                    onClick={() => navigate("/buyer/dashboard?tab=purchases")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f3ed] via-[#f3f7f0] to-white">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/buyer/dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground">Complete your order details</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Personal Information */}
              <Card className="border-border bg-white/90 p-6 shadow-soft">
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full bg-buyer/10 p-2">
                    <User className="h-5 w-5 text-buyer" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Personal Information
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </Card>

              {/* Delivery Address */}
              <Card className="border-border bg-white/90 p-6 shadow-soft">
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full bg-buyer/10 p-2">
                    <MapPin className="h-5 w-5 text-buyer" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">
                      Address Line 1 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="addressLine1"
                      name="addressLine1"
                      placeholder="House/Flat No., Building Name"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      name="addressLine2"
                      placeholder="Street, Area, Colony"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">
                        Pincode <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        placeholder="560001"
                        value={formData.pincode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="landmark">Landmark (Optional)</Label>
                    <Input
                      id="landmark"
                      name="landmark"
                      placeholder="Near landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryNotes">
                      Delivery Instructions (Optional)
                    </Label>
                    <Textarea
                      id="deliveryNotes"
                      name="deliveryNotes"
                      placeholder="Any special instructions for delivery..."
                      rows={3}
                      value={formData.deliveryNotes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="border-border bg-white/90 p-6 shadow-soft">
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-full bg-buyer/10 p-2">
                    <CreditCard className="h-5 w-5 text-buyer" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Payment Method
                  </h2>
                </div>

                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMethod: value })
                  }
                >
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pay when you receive your order
                          </p>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700">
                          Recommended
                        </Badge>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-semibold text-foreground">UPI Payment</p>
                        <p className="text-sm text-muted-foreground">
                          Pay via Google Pay, PhonePe, Paytm
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-semibold text-foreground">
                          Credit/Debit Card
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Visa, Mastercard, RuPay
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <Card className="sticky top-4 border-border bg-white/90 p-6 shadow-soft">
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-lg border border-border p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.crop}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {item.crop}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.farmer}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {item.cartQuantity} kg × ₹{item.price}
                          </span>
                          <span className="font-semibold text-foreground">
                            ₹{(item.price * item.cartQuantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charges</span>
                    <span className="font-semibold text-foreground">
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-600">FREE</span>
                      ) : (
                        `₹${deliveryCharge}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="font-semibold text-foreground">
                      ₹{gst.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-buyer">
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>

                {deliveryCharge === 0 && cartTotal >= 1000 && (
                  <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                    🎉 Free delivery on orders above ₹1,000!
                  </div>
                )}

                <Button
                  className="mt-6 w-full bg-buyer hover:bg-buyer/90"
                  size="lg"
                  onClick={handlePlaceOrder}
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Place Order
                </Button>

                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>Blockchain verified transaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>Direct from verified farmers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>Quality guaranteed</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyerCheckout;

