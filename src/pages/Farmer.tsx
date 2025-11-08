import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sprout, Brain, DollarSign, ShieldCheck, Wifi, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-farmer.jpg";

const Farmer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Indian farmers in field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-farmer/20 border border-farmer/40 backdrop-blur-sm">
              <Sprout className="h-4 w-4" />
              <span className="text-sm font-medium">Farmer Portal</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Grow Better. Sell Better. Earn Better.
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Get AI-powered farming insights, access trusted vendors, discover government schemes, 
              and sell your crops directly at fair, transparent prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-lg px-8 bg-farmer hover:bg-farmer/90">
                Start Selling Crops
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Try AI Soil Check
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
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-farmer/10">
                <Brain className="h-7 w-7 text-farmer" />
              </div>
              <h3 className="text-2xl font-bold">AI Soil Health & Crop Diagnosis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload photos of your soil or crop leaves. Get instant insights on:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-farmer flex-shrink-0" />
                  <span>Soil health condition and nutrients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-farmer flex-shrink-0" />
                  <span>Fertilizer recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-farmer flex-shrink-0" />
                  <span>Pest and disease alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-farmer flex-shrink-0" />
                  <span>Watering & care advice</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10">
                <DollarSign className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Sell Crops at Fair Prices</h3>
              <p className="text-muted-foreground leading-relaxed">
                List your produce in minutes and connect directly with buyers:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Set your own price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>Compare with market rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>See verified buyer ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>No middlemen, higher profits</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/10">
                <ShieldCheck className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold">Trusted Vendors & Products</h3>
              <p className="text-muted-foreground leading-relaxed">
                Find verified vendors for all your farming needs:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>Quality seeds & fertilizers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>Pesticides & tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>Vendor ratings & reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>Government verified suppliers</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Government Schemes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover schemes you're eligible for based on your location and crops
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-farmer/10">
                <ShieldCheck className="h-7 w-7 text-farmer" />
              </div>
              <h3 className="text-2xl font-bold">Blockchain Protection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your profile and crops are protected with blockchain traceability hashing
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10">
                <Wifi className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Works Offline</h3>
              <p className="text-muted-foreground leading-relaxed">
                DPIN support and offline caching ensure you can verify trades even without internet
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              "Sahi Daam. Sahi Faisla. Sahi Saathi."
            </h2>
            <p className="text-xl text-muted-foreground">
              Your Farm, Your Price, Your Market — Join thousands of farmers already earning better
            </p>
            <Button size="lg" className="text-lg px-8 mt-4 bg-farmer hover:bg-farmer/90">
              Register as Farmer
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Farmer;
