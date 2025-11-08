import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sprout, Phone, ShieldCheck, Send, CheckCircle2 } from "lucide-react";

const FarmerLogin = () => {
  const [stage, setStage] = useState<"mobile" | "otp" | "success">("mobile");
  const [otpFallback, setOtpFallback] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { login, checkAuth } = useAuth();

  // If already logged in as farmer, redirect to dashboard
  useEffect(() => {
    if (checkAuth("farmer")) {
      navigate("/farmer/dashboard", { replace: true });
    }
  }, [checkAuth, navigate]);

  const handleGetOtp = () => {
    setStage("otp");
  };

  const handleVerify = () => {
    setStage("success");
    // Store authentication in localStorage
    login("farmer", undefined, phoneNumber, "Farmer User");
    setTimeout(() => {
      navigate("/farmer/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f2e8] via-[#f2f8ef] to-white">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Card className="border-none bg-white/90 shadow-xl">
                <div className="space-y-6 p-8 md:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-farmer/10 px-4 py-2 text-sm font-medium text-farmer">
                    <Sprout className="h-4 w-4" />
                    Farmer Login
                  </div>
                  <h1 className="text-3xl font-bold text-foreground md:text-4xl">Namaste! Log in with your mobile number.</h1>
                  <div className="space-y-6">
                    {stage === "mobile" ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile number</Label>
                          <Input 
                            id="mobile" 
                            placeholder="+91 XXXXX XXXXX" 
                            className="h-14 text-lg"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <Button className="h-12 w-full bg-farmer text-base hover:bg-farmer/90" onClick={handleGetOtp}>
                          <Phone className="mr-2 h-5 w-5" />
                          Get OTP
                        </Button>
                      </div>
                    ) : null}
                    {stage === "otp" ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otp">Enter OTP</Label>
                          <Input id="otp" placeholder="6-digit OTP" className="h-14 text-center text-2xl tracking-[0.5em]" />
                        </div>
                        <div className="space-y-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2 text-foreground">
                            <ShieldCheck className="h-4 w-4 text-farmer" />
                            OTP sent via SMS. Auto-fill on supported phones.
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-10 px-3 text-sm text-farmer hover:text-farmer"
                            onClick={() => setOtpFallback(true)}
                          >
                            OTP delayed? Enter DPIN instead
                          </Button>
                          {otpFallback ? <Input placeholder="Enter 6-digit DPIN" className="h-12 text-center text-lg" /> : null}
                        </div>
                        <Button className="h-12 w-full bg-farmer text-base hover:bg-farmer/90" onClick={handleVerify}>
                          <Send className="mr-2 h-5 w-5" />
                          Verify & Continue
                        </Button>
                      </div>
                    ) : null}
                    {stage === "success" ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-6 text-sm text-emerald-700">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5" />
                          <p>Success! Checking your role and redirecting to the Farmer Dashboard…</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FarmerLogin;

