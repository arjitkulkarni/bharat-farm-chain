import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  TrendingUp,
  Package,
  DollarSign,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatbotProps {
  userRole: "vendor" | "buyer";
}

const AIChatbot = ({ userRole }: AIChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting message
      const greeting: Message = {
        id: "1",
        text: userRole === "vendor" 
          ? "👋 Hello! I'm your AI assistant. I can help you with pricing strategies, inventory management, and market insights. How can I assist you today?"
          : "👋 Hello! I'm your AI shopping assistant. I can help you find the best products, compare prices, and recommend quality produce. What are you looking for?",
        sender: "ai",
        timestamp: new Date(),
        suggestions: userRole === "vendor"
          ? ["💰 Pricing Tips", "📦 Inventory Help", "📈 Market Trends", "🎯 Sales Strategy"]
          : ["🔍 Find Products", "💰 Compare Prices", "⭐ Top Farmers", "🥬 Seasonal Produce"],
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length, userRole]);

  const getAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let responseText = "";
    let suggestions: string[] = [];

    if (userRole === "vendor") {
      // Vendor-specific responses
      if (lowerMessage.includes("price") || lowerMessage.includes("pricing")) {
        responseText = "💰 **Pricing Strategy Tips:**\n\n1. Check current market rates in the Analytics tab\n2. Consider your quality grade (Organic: +30%, Premium: +20%)\n3. Bulk orders can have 10-15% discount\n4. Keep prices competitive but don't undersell\n\nYour current average price is performing well at ₹28/kg. The market average is ₹34/kg, so you're offering great value!";
        suggestions = ["View Analytics", "Update Prices", "Set Discounts"];
      } else if (lowerMessage.includes("inventory") || lowerMessage.includes("stock")) {
        responseText = "📦 **Inventory Management:**\n\nYou have 2 low-stock items that need attention:\n• DAP Fertilizer: 25 units left\n• Pesticide Spray: Out of stock\n\nRecommendation: Restock popular items during off-peak hours (8-10 PM) for better prices from suppliers.";
        suggestions = ["View Inventory", "Restock Now", "Set Alerts"];
      } else if (lowerMessage.includes("sales") || lowerMessage.includes("revenue")) {
        responseText = "📈 **Sales Performance:**\n\nGreat news! Your revenue is up 54% this month (₹125,000).\n\nTop performing categories:\n1. Fertilizers (45% of sales)\n2. Organic products (+24% growth)\n\nTip: Focus on organic products - they're trending and command higher margins!";
        suggestions = ["View Dashboard", "Top Products", "Growth Tips"];
      } else if (lowerMessage.includes("customer") || lowerMessage.includes("buyer")) {
        responseText = "👥 **Customer Insights:**\n\nYou have 89 active customers (↑12 this week).\n\nTop customers:\n• Ramesh Kumar: 8 orders, 4.8★\n• Lakshmi Devi: 6 orders, 4.9★\n\nTip: Send personalized offers to your top 10 customers for better retention!";
        suggestions = ["View Customers", "Send Offers", "Customer Stats"];
      } else {
        responseText = "I can help you with:\n\n💰 Pricing strategies and market rates\n📦 Inventory and stock management\n📈 Sales analytics and growth tips\n👥 Customer insights and retention\n🎯 Marketing and promotion ideas\n\nWhat would you like to know more about?";
        suggestions = ["Pricing Help", "Inventory Tips", "Sales Growth", "Customer Care"];
      }
    } else {
      // Buyer-specific responses
      if (lowerMessage.includes("find") || lowerMessage.includes("search") || lowerMessage.includes("looking")) {
        responseText = "🔍 **Finding Products:**\n\nWhat type of produce are you looking for? Here are today's fresh arrivals:\n\n• Fresh Tomatoes - ₹30/kg (Premium)\n• Organic Rice - ₹65/kg (Organic)\n• Onions - ₹25/kg (Standard)\n\nAll from verified farmers with 4.5+ ratings!";
        suggestions = ["Show Vegetables", "Show Grains", "Show Organic", "Show All"];
      } else if (lowerMessage.includes("price") || lowerMessage.includes("cheap") || lowerMessage.includes("save")) {
        responseText = "💰 **Best Deals Today:**\n\nYou're already saving 17.6% by buying direct!\n\nTop savings:\n• Suresh Patil: 18% below market\n• Ramesh Kumar: 15% savings\n• Organic products: Best value this week\n\nYour total savings so far: ₹6,020! 🎉";
        suggestions = ["Best Deals", "Compare Prices", "Savings Report"];
      } else if (lowerMessage.includes("quality") || lowerMessage.includes("organic") || lowerMessage.includes("fresh")) {
        responseText = "⭐ **Quality Products:**\n\nTop-rated farmers for quality:\n\n1. Lakshmi Devi - 4.9★ (Premium)\n2. Ramesh Kumar - 4.8★ (Organic)\n3. Suresh Patil - 4.7★ (Premium)\n\nAll certified and verified. 100% satisfaction guaranteed!";
        suggestions = ["View Top Farmers", "Organic Products", "Premium Grade"];
      } else if (lowerMessage.includes("seasonal") || lowerMessage.includes("season")) {
        responseText = "🍂 **Seasonal Picks:**\n\nBest produce this season:\n• Winter vegetables (high quality)\n• Fresh leafy greens\n• Root vegetables\n\nThese are at peak freshness and best prices right now!";
        suggestions = ["Seasonal Guide", "Winter Specials", "Best Buys"];
      } else {
        responseText = "I can help you:\n\n🔍 Find the best products\n💰 Get the lowest prices\n⭐ Discover top-rated farmers\n🥬 Learn about seasonal produce\n📊 Track your savings\n🚚 Check order status\n\nWhat would you like help with?";
        suggestions = ["Find Products", "Best Prices", "Top Farmers", "My Orders"];
      }
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: "ai",
      timestamp: new Date(),
      suggestions,
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl ${
            userRole === "vendor" ? "bg-vendor hover:bg-vendor/90" : "bg-buyer hover:bg-buyer/90"
          } transition-all hover:scale-110`}
        >
          <div className="relative">
            <MessageCircle className="h-7 w-7 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] shadow-2xl border-2 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className={`p-4 ${userRole === "vendor" ? "bg-gradient-to-r from-vendor to-vendor/90" : "bg-gradient-to-r from-buyer to-buyer/90"} text-white rounded-t-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    AI Assistant
                    <Sparkles className="h-4 w-4" />
                  </h3>
                  <p className="text-xs text-white/80">Online • Always ready to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 to-white">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user"
                        ? userRole === "vendor"
                          ? "bg-vendor/20 text-vendor"
                          : "bg-buyer/20 text-buyer"
                        : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`flex-1 ${
                      message.sender === "user" ? "flex justify-end" : ""
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[85%] rounded-2xl p-3 ${
                        message.sender === "user"
                          ? userRole === "vendor"
                            ? "bg-vendor text-white"
                            : "bg-buyer text-white"
                          : "bg-white border border-border shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 ml-11 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white border border-border shadow-sm rounded-2xl p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-muted/30">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 whitespace-nowrap"
                onClick={() => handleSuggestionClick(userRole === "vendor" ? "Show me analytics" : "Find best deals")}
              >
                {userRole === "vendor" ? <TrendingUp className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
                {userRole === "vendor" ? "Analytics" : "Best Deals"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 whitespace-nowrap"
                onClick={() => handleSuggestionClick(userRole === "vendor" ? "Inventory help" : "Top farmers")}
              >
                {userRole === "vendor" ? <Package className="h-3 w-3" /> : <User className="h-3 w-3" />}
                {userRole === "vendor" ? "Inventory" : "Top Rated"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 whitespace-nowrap"
                onClick={() => handleSuggestionClick("Help me")}
              >
                <HelpCircle className="h-3 w-3" />
                Help
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 whitespace-nowrap"
                onClick={() => handleSuggestionClick(userRole === "vendor" ? "Give me tips" : "Seasonal produce")}
              >
                <Lightbulb className="h-3 w-3" />
                Tips
              </Button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`${
                  userRole === "vendor"
                    ? "bg-vendor hover:bg-vendor/90"
                    : "bg-buyer hover:bg-buyer/90"
                }`}
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by AI • Context-aware assistance
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;

