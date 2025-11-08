import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Shield, CheckCircle2, ShoppingCart } from "lucide-react";

const BuyerLogin = () => {
  const [stage, setStage] = useState<"credentials" | "otp" | "success">("credentials");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { login, checkAuth } = useAuth();

  // If already logged in as buyer, redirect to dashboard
  useEffect(() => {
    if (checkAuth("buyer")) {
      navigate("/buyer/dashboard", { replace: true });
    }
  }, [checkAuth, navigate]);

  const handleSendOtp = () => {
    if (email && phone) {
      setStage("otp");
    }
  };

  const handleVerify = () => {
    setStage("success");
    // Store authentication in localStorage
    login("buyer", email, phone, "Buyer User");
    setTimeout(() => {
      navigate("/buyer/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f3ed] via-[#f3f7f0] to-white">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-buyer/10">
                  <ShoppingCart className="h-8 w-8 text-buyer" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Buyer Portal</h1>
                <p className="mt-2 text-muted-foreground">
                  Source fresh produce directly from verified farmers
                </p>
              </div>

              <Card className="border-none bg-white/90 shadow-xl">
                <div className="p-8">
                  {stage === "credentials" && (
                    <div className="space-y-6">
                      <div>
                        <Badge className="mb-4 bg-buyer/10 text-buyer">Step 1: Enter Credentials</Badge>
                        <h2 className="text-xl font-semibold text-foreground">Sign in to your account</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          We'll send an OTP to verify your identity
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="buyer@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-12 pl-10 text-base"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Mobile Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="h-12 pl-10 text-base"
                            />
                          </div>
                        </div>

                        <Button
                          className="h-12 w-full bg-buyer text-base hover:bg-buyer/90"
                          onClick={handleSendOtp}
                          disabled={!email || !phone}
                        >
                          <Shield className="mr-2 h-5 w-5" />
                          Send OTP
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-buyer" />
                          Secure authentication with OTP
                        </p>
                        <p className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-buyer" />
                          Blockchain-verified supply chain
                        </p>
                        <p className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-buyer" />
                          Direct sourcing from farmers
                        </p>
                      </div>
                    </div>
                  )}

                  {stage === "otp" && (
                    <div className="space-y-6">
                      <div>
                        <Badge className="mb-4 bg-buyer/10 text-buyer">Step 2: Verify OTP</Badge>
                        <h2 className="text-xl font-semibold text-foreground">Enter verification code</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          OTP sent to {email} and {phone}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otp">6-Digit OTP</Label>
                          <Input
                            id="otp"
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            className="h-14 text-center text-2xl tracking-widest"
                          />
                        </div>

                        <Button
                          className="h-12 w-full bg-buyer text-base hover:bg-buyer/90"
                          onClick={handleVerify}
                          disabled={otp.length !== 6}
                        >
                          <CheckCircle2 className="mr-2 h-5 w-5" />
                          Verify & Continue
                        </Button>

                        <Button
                          variant="ghost"
                          className="w-full text-buyer hover:bg-buyer/10"
                          onClick={() => setStage("credentials")}
                        >
                          Change credentials
                        </Button>
                      </div>

                      <div className="rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
                        Didn't receive OTP?{" "}
                        <button className="font-semibold text-buyer hover:underline">Resend</button>
                      </div>
                    </div>
                  )}

                  {stage === "success" && (
                    <div className="space-y-6 py-8 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-buyer/10">
                        <CheckCircle2 className="h-10 w-10 text-buyer" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground">Verification Successful!</h2>
                        <p className="mt-2 text-muted-foreground">Redirecting to marketplace...</p>
                      </div>
                      <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-full animate-pulse bg-buyer"></div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                New buyer?{" "}
                <a href="#" className="font-semibold text-buyer hover:underline">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BuyerLogin;

