import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Search, 
  MessageCircle, 
  ShieldCheck, 
  CreditCard, 
  FileCheck,
  TrendingUp,
  Users,
  Package,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
  Eye,
  MapPin,
  Clock,
} from "lucide-react";
import heroImage from "@/assets/hero-buyer.jpg";

const Buyer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const stats = [
    { label: "Active Farmers", value: "10,000+", icon: Users, color: "text-emerald-600" },
    { label: "Crops Available", value: "50+", icon: Package, color: "text-orange-600" },
    { label: "Average Rating", value: "4.8/5", icon: Star, color: "text-amber-600" },
    { label: "Transactions", value: "₹2Cr+", icon: TrendingUp, color: "text-blue-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-orange-50/30">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative h-[700px] overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.img 
            src={heroImage} 
            alt="Fresh harvested crops" 
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/60" />
          
          {/* Animated particles */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,165,0,0.2) 0%, transparent 50%)`,
            }}
          />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            className="max-w-3xl text-white space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-buyer/20 border border-buyer/40 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ShoppingCart className="h-4 w-4" />
              </motion.div>
              <span className="text-sm font-medium">Buyer Portal</span>
              <Badge className="bg-emerald-500 text-white border-0">Live</Badge>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Buy Directly From{" "}
              <motion.span 
                className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Real Farmers
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl"
            >
              Source fresh, verified, high-quality crops from trusted farmers and vendors. 
              Transparent pricing, secure transactions, and complete traceability.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255,165,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="text-lg px-8 bg-buyer hover:bg-buyer/90 shadow-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Browse Crops
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Live stats ticker */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <div>
                      <p className="font-bold text-lg">{stat.value}</p>
                      <p className="text-xs text-white/70">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Main Features */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-buyer/10 text-buyer border-buyer/20">
              <Sparkles className="mr-2 h-4 w-4" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need to Buy Smart</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make your sourcing experience seamless
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Search,
                title: "Discover Crops Nearby",
                description: "Advanced search with smart filters:",
                features: [
                  "Filter by crop type & location",
                  "Price range selection",
                  "Organic vs. regular produce",
                  "Freshness indicators"
                ],
                color: "buyer",
                gradient: "from-orange-500/10 to-amber-500/10"
              },
              {
                icon: ShieldCheck,
                title: "Verified Farmers & Vendors",
                description: "Every listing shows complete verification:",
                features: [
                  "Verification badges",
                  "Farm location mapping",
                  "Sale history transparency",
                  "Buyer ratings & reviews"
                ],
                color: "emerald-600",
                gradient: "from-emerald-500/10 to-green-500/10"
              },
              {
                icon: MessageCircle,
                title: "Secure Contact & Chat",
                description: "Safe communication with farmers:",
                features: [
                  "Request contact approval",
                  "Real-time negotiation chat",
                  "Masked numbers until approved",
                  "Full conversation logs"
                ],
                color: "blue-600",
                gradient: "from-blue-500/10 to-cyan-500/10"
              },
              {
                icon: CreditCard,
                title: "Flexible Payments",
                description: "Multiple secure payment options: UPI, escrow, bank transfer, or cash on delivery",
                features: [],
                color: "purple-600",
                gradient: "from-purple-500/10 to-pink-500/10"
              },
              {
                icon: FileCheck,
                title: "End-to-End Traceability",
                description: "Blockchain-backed transaction hashes for export compliance and supply chain audits",
                features: [],
                color: "indigo-600",
                gradient: "from-indigo-500/10 to-purple-500/10"
              },
              {
                icon: Zap,
                title: "DPIN Offline Verification",
                description: "Validate farmer identity through SMS even in low-network rural areas",
                features: [],
                color: "amber-600",
                gradient: "from-amber-500/10 to-yellow-500/10"
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="relative h-full p-8 space-y-4 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    {/* Animated gradient background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{
                        x: "100%",
                        transition: { duration: 0.8, ease: "easeInOut" },
                      }}
                    />

                    <motion.div 
                      className="relative z-10"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                        <Icon className={`h-7 w-7 text-${feature.color}`} />
                      </div>
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold group-hover:text-buyer transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mt-2">
                        {feature.description}
                      </p>
                      
                      {feature.features.length > 0 && (
                        <ul className="space-y-2 text-sm mt-4">
                          {feature.features.map((item, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-start gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                              >
                                <CheckCircle className={`mt-1 h-4 w-4 text-${feature.color} flex-shrink-0`} />
                              </motion.div>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-buyer/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-orange-50/20 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-buyer rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <Badge className="mb-4 bg-buyer/10 text-buyer border-buyer/20">
              <Zap className="mr-2 h-4 w-4" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">How Buying Works</h2>
            <p className="text-xl text-muted-foreground">Simple, secure, and transparent in 4 easy steps</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-buyer via-amber-500 to-buyer opacity-20" />

            {[
              {
                step: 1,
                icon: Search,
                title: "Browse & Filter",
                description: "Find crops near you with advanced search filters",
                color: "from-orange-500 to-amber-500"
              },
              {
                step: 2,
                icon: MessageCircle,
                title: "Request Contact",
                description: "Send request to farmer, wait for approval",
                color: "from-amber-500 to-yellow-500"
              },
              {
                step: 3,
                icon: Users,
                title: "Chat & Negotiate",
                description: "Discuss price, quantity, and delivery details",
                color: "from-yellow-500 to-orange-600"
              },
              {
                step: 4,
                icon: CheckCircle,
                title: "Complete Purchase",
                description: "Pay securely and receive traceability hash",
                color: "from-orange-600 to-red-500"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = activeStep === index;
              
              return (
                <motion.div
                  key={item.step}
                  className="text-center space-y-4 relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <motion.div
                    className="relative inline-block"
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} text-white text-2xl font-bold shadow-xl relative z-10`}
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          <motion.div
                            key="icon"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="h-8 w-8" />
                          </motion.div>
                        ) : (
                          <motion.span
                            key="number"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            {item.step}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Pulse effect for active step */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color}`}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  <motion.h3 
                    className={`font-bold text-xl transition-colors ${isActive ? 'text-buyer' : ''}`}
                    animate={{ scale: isActive ? 1.05 : 1 }}
                  >
                    {item.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm text-muted-foreground leading-relaxed"
                    animate={{ opacity: isActive ? 1 : 0.7 }}
                  >
                    {item.description}
                  </motion.p>

                  {/* Arrow connector */}
                  {index < 3 && (
                    <motion.div
                      className="hidden md:block absolute top-10 -right-4 text-buyer/30"
                      animate={{ x: isActive ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Progress dots */}
          <motion.div 
            className="flex justify-center gap-2 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[0, 1, 2, 3].map((index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  activeStep === index ? 'w-8 bg-buyer' : 'w-2 bg-buyer/30'
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-buyer via-orange-500 to-amber-500 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Award className="h-16 w-16 mx-auto mb-6" />
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              "Transparent Sourcing. <br />Verified Produce."
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join retailers, wholesalers, and exporters buying directly from farmers
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="secondary" className="text-lg px-8 h-14">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Register as Buyer
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 h-14 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 pt-12 text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: ShieldCheck, text: "100% Secure" },
                { icon: Award, text: "Verified Farmers" },
                { icon: Clock, text: "24/7 Support" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Buyer;
