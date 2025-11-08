import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Search, MessageCircle, ShieldCheck, CreditCard, FileCheck } from "lucide-react";
import heroImage from "@/assets/hero-buyer.jpg";

const Buyer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Fresh harvested crops" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-buyer/20 border border-buyer/40 backdrop-blur-sm">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-medium">Buyer Portal</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Buy Directly From Real Farmers
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Source fresh, verified, high-quality crops from trusted farmers and vendors. 
              Transparent pricing, secure transactions, and complete traceability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-lg px-8 bg-buyer hover:bg-buyer/90">
                Browse Crops
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-buyer/10">
                <Search className="h-7 w-7 text-buyer" />
              </div>
              <h3 className="text-2xl font-bold">Discover Crops Nearby</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced search with smart filters:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-buyer flex-shrink-0" />
                  <span>Filter by crop type & location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-buyer flex-shrink-0" />
                  <span>Price range selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-buyer flex-shrink-0" />
                  <span>Organic vs. regular produce</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-buyer flex-shrink-0" />
                  <span>Freshness indicators</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Verified Farmers & Vendors</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every listing shows complete verification:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>Verification badges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>Farm location mapping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>Sale history transparency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>Buyer ratings & reviews</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/10">
                <MessageCircle className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">Secure Contact & Chat</h3>
              <p className="text-muted-foreground leading-relaxed">
                Safe communication with farmers:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>Request contact approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>Real-time negotiation chat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>Masked numbers until approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>Full conversation logs</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-buyer/10">
                <CreditCard className="h-7 w-7 text-buyer" />
              </div>
              <h3 className="text-2xl font-bold">Flexible Payments</h3>
              <p className="text-muted-foreground leading-relaxed">
                Multiple secure payment options: UPI, escrow, bank transfer, or cash on delivery
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10">
                <FileCheck className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">End-to-End Traceability</h3>
              <p className="text-muted-foreground leading-relaxed">
                Blockchain-backed transaction hashes for export compliance and supply chain audits
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">DPIN Offline Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Validate farmer identity through SMS even in low-network rural areas
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">How Buying Works</h2>
            <p className="text-xl text-muted-foreground">Simple, secure, and transparent</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-buyer/10 text-buyer text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold">Browse & Filter</h3>
              <p className="text-sm text-muted-foreground">
                Find crops near you with advanced search filters
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-buyer/10 text-buyer text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold">Request Contact</h3>
              <p className="text-sm text-muted-foreground">
                Send request to farmer, wait for approval
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-buyer/10 text-buyer text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold">Chat & Negotiate</h3>
              <p className="text-sm text-muted-foreground">
                Discuss price, quantity, and delivery details
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-buyer/10 text-buyer text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold">Complete Purchase</h3>
              <p className="text-sm text-muted-foreground">
                Pay securely and receive traceability hash
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-buyer text-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              "Transparent Sourcing. Verified Produce."
            </h2>
            <p className="text-xl opacity-90">
              Join retailers, wholesalers, and exporters buying directly from farmers
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 mt-4">
              Register as Buyer
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Buyer;
