import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Store, Users, TrendingUp, ShieldCheck, Package, Wifi } from "lucide-react";
import heroImage from "@/assets/hero-vendor.jpg";

const Vendor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Agricultural vendor store" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vendor/20 border border-vendor/40 backdrop-blur-sm">
              <Store className="h-4 w-4" />
              <span className="text-sm font-medium">Vendor Portal</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Connect With Real Farmers. Grow Your Business.
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Reach thousands of verified farmers directly. Sell quality agricultural inputs, 
              buy crops at fair rates, and build long-term trusted relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-lg px-8 bg-vendor hover:bg-vendor/90">
                List Your Products
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                View Farmer Network
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
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-vendor/10">
                <Package className="h-7 w-7 text-vendor" />
              </div>
              <h3 className="text-2xl font-bold">Sell Agricultural Inputs</h3>
              <p className="text-muted-foreground leading-relaxed">
                List your products and reach farmers who need them:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vendor flex-shrink-0" />
                  <span>Seeds & fertilizers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vendor flex-shrink-0" />
                  <span>Pesticides & tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vendor flex-shrink-0" />
                  <span>Show certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vendor flex-shrink-0" />
                  <span>Build farmer reviews</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10">
                <Users className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Buy Crops From Farmers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Act as a crop buyer and source directly from farms:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Buy at transparent rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Direct-from-farm stock</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Lower logistics costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Verified farmer quality</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">AI-Driven Recommendations</h3>
              <p className="text-muted-foreground leading-relaxed">
                When farmers check soil health, AI suggests your relevant products automatically
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-vendor/10">
                <ShieldCheck className="h-7 w-7 text-vendor" />
              </div>
              <h3 className="text-2xl font-bold">Build Verified Profile</h3>
              <p className="text-muted-foreground leading-relaxed">
                Blockchain-backed vendor identity with ratings, certifications, and trust scores
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/10">
                <Store className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">Community Services</h3>
              <p className="text-muted-foreground leading-relaxed">
                Offer tractor rentals, tool lending, irrigation services to nearby farmers
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10">
                <Wifi className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Offline Verification</h3>
              <p className="text-muted-foreground leading-relaxed">
                DPIN support helps verify farmer identity during rural field visits without internet
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-vendor mb-2">10,000+</div>
              <p className="text-muted-foreground">Verified Farmers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-vendor mb-2">500+</div>
              <p className="text-muted-foreground">Active Vendors</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-vendor mb-2">₹2Cr+</div>
              <p className="text-muted-foreground">Transactions Processed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-vendor text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              "Deliver Quality. Build Trust."
            </h2>
            <p className="text-xl text-white/90">
              Join the trusted network of vendors serving India's farmers
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 mt-4">
              Register as Vendor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vendor;
