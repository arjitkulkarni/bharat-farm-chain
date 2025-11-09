import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Image as ImageIcon, 
  Loader2, 
  ShieldCheck, 
  CheckCircle2, 
  Hash, 
  HelpCircle,
  IndianRupee,
  MapPin,
  Package,
  Info,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Upload,
  X,
  Eye,
  Star,
  Calendar,
  Weight,
  Leaf
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import FarmerPageShell from "./FarmerPageShell";

// Sample data for suggestions
const cropSuggestions = [
  { name: "Basmati Rice", avgPrice: 45, unit: "kg", season: "Oct-Nov" },
  { name: "Wheat", avgPrice: 28, unit: "kg", season: "Mar-Apr" },
  { name: "Tomatoes", avgPrice: 30, unit: "kg", season: "Year-round" },
  { name: "Onions", avgPrice: 25, unit: "kg", season: "Year-round" },
  { name: "Potatoes", avgPrice: 20, unit: "kg", season: "Year-round" },
  { name: "Organic Rice", avgPrice: 65, unit: "kg", season: "Oct-Nov" },
  { name: "Fresh Spinach", avgPrice: 40, unit: "kg", season: "Winter" },
  { name: "Carrots", avgPrice: 35, unit: "kg", season: "Winter" },
];

const qualityOptions = [
  { value: "organic", label: "Organic", desc: "Certified organic, no chemicals", price: "+30%" },
  { value: "premium", label: "Premium", desc: "Top quality, best grade", price: "+20%" },
  { value: "standard", label: "Standard", desc: "Good quality, regular grade", price: "Base" },
];

const FarmerCreateListing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cropName: "",
    category: "",
    quantity: "",
    unit: "kg",
    price: "",
    quality: "",
    harvestDate: "",
    description: "",
    location: "Kadur, Hassan, Karnataka",
  });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const steps = [
    { number: 1, title: "Crop Details", icon: Package },
    { number: 2, title: "Pricing & Quality", icon: IndianRupee },
    { number: 3, title: "Photos & Details", icon: ImageIcon },
    { number: 4, title: "Review & Submit", icon: CheckCircle2 },
  ];

  const completionPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleCropSelect = (cropName: string) => {
    const crop = cropSuggestions.find(c => c.name === cropName);
    if (crop) {
      setFormData({ ...formData, cropName: crop.name });
      setSuggestedPrice(crop.avgPrice);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessNotification(true);
    }, 1500);
  };

  // Redirect to dashboard after showing success notification for 3 seconds
  useEffect(() => {
    if (showSuccessNotification) {
      const timer = setTimeout(() => {
        navigate('/farmer/dashboard');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessNotification, navigate]);

  return (
    <FarmerPageShell
      title="Create New Listing"
      description="List your produce easily with step-by-step guidance. Get price suggestions and reach buyers directly."
      badge="New Listing"
    >
      <TooltipProvider>
        {/* Success Notification Overlay */}
        {showSuccessNotification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="max-w-md w-full mx-4 p-8 shadow-2xl border-2 border-emerald-500 bg-white animate-in zoom-in duration-300">
              <div className="text-center space-y-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-in zoom-in duration-500">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 animate-in zoom-in duration-700" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">🎉 Listing Created Successfully!</h3>
                  <p className="text-muted-foreground">
                    Your <strong>{formData.cropName || "crop"}</strong> listing is now live and visible to buyers.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Hash className="h-5 w-5 text-emerald-600" />
                    <p className="text-sm font-semibold text-emerald-900">Blockchain Hash Generated</p>
                  </div>
                  <code className="text-xs font-mono text-emerald-800 bg-white px-3 py-2 rounded block">
                    0x{Math.random().toString(36).substring(2, 15).toUpperCase()}
                  </code>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Redirecting to dashboard in 3 seconds...</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <Button 
                  onClick={() => navigate('/farmer/dashboard')}
                  className="w-full bg-farmer hover:bg-farmer/90"
                >
                  Go to Dashboard Now
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Progress Header */}
        <Card className="mb-6 border-border bg-gradient-to-r from-farmer/5 via-white to-farmer/5 p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Step {currentStep} of {steps.length}</h2>
              <p className="text-sm text-muted-foreground">{steps[currentStep - 1].title}</p>
            </div>
            <Badge className="bg-farmer text-white px-4 py-2">
              {completionPercentage}% Complete
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isComplete = currentStep > step.number;
              
              return (
                <div 
                  key={step.number}
                  className={`flex items-center gap-2 rounded-lg p-3 transition-all ${
                    isActive ? 'bg-farmer/10 border-2 border-farmer' : 
                    isComplete ? 'bg-emerald-50 border-2 border-emerald-200' : 
                    'bg-muted/30 border-2 border-transparent'
                  }`}
                >
                  <div className={`rounded-full p-2 ${
                    isActive ? 'bg-farmer text-white' :
                    isComplete ? 'bg-emerald-500 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {isComplete ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${
                      isActive || isComplete ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Main Form */}
          <div className="space-y-6">
            {/* Step 1: Crop Details */}
            {currentStep === 1 && (
              <Card className="border-border bg-white/90 p-8 shadow-lg">
                <div className="mb-6 flex items-start gap-4">
                  <div className="rounded-xl bg-farmer/10 p-3">
                    <Package className="h-6 w-6 text-farmer" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">What are you selling?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tell us about your produce. We'll help you get the best price!
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Crop Name with Suggestions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cropName" className="text-base font-semibold flex items-center gap-2">
                        Crop Name
                        <span className="text-red-500">*</span>
                      </Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">Choose from popular crops or enter your own. We'll show you current market prices!</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select value={formData.cropName} onValueChange={handleCropSelect}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your crop..." />
                      </SelectTrigger>
                      <SelectContent>
                        {cropSuggestions.map((crop) => (
                          <SelectItem key={crop.name} value={crop.name}>
                            <div className="flex items-center justify-between w-full">
                              <span>{crop.name}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                ₹{crop.avgPrice}/{crop.unit}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.cropName && (
                      <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <Sparkles className="h-4 w-4 text-emerald-600" />
                        <p className="text-sm text-emerald-800">
                          <strong>Great choice!</strong> {formData.cropName} is in demand right now.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-base font-semibold flex items-center gap-2">
                      Category
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">🥬 Vegetables</SelectItem>
                        <SelectItem value="grains">🌾 Grains</SelectItem>
                        <SelectItem value="fruits">🍎 Fruits</SelectItem>
                        <SelectItem value="pulses">🫘 Pulses & Legumes</SelectItem>
                        <SelectItem value="spices">🌶️ Spices</SelectItem>
                        <SelectItem value="other">📦 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity and Unit */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="quantity" className="text-base font-semibold flex items-center gap-2">
                        <Weight className="h-4 w-4" />
                        Quantity Available
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="quantity" 
                        type="number"
                        placeholder="Enter quantity..."
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="unit" className="text-base font-semibold">
                        Unit
                      </Label>
                      <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilogram (kg)</SelectItem>
                          <SelectItem value="quintal">Quintal (100 kg)</SelectItem>
                          <SelectItem value="ton">Ton (1000 kg)</SelectItem>
                          <SelectItem value="bag">Bag (50 kg)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.quantity && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900">Quantity Tip</p>
                          <p className="text-sm text-blue-800 mt-1">
                            You have <strong>{formData.quantity} {formData.unit}</strong> available. 
                            Larger quantities often attract bulk buyers with better prices!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Harvest Date */}
                  <div className="space-y-3">
                    <Label htmlFor="harvestDate" className="text-base font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Harvest Date
                    </Label>
                    <Input 
                      id="harvestDate" 
                      type="date"
                      value={formData.harvestDate}
                      onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground">
                      Fresher produce gets better prices. Recently harvested crops are more attractive to buyers.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 2: Pricing & Quality */}
            {currentStep === 2 && (
              <Card className="border-border bg-white/90 p-8 shadow-lg">
                <div className="mb-6 flex items-start gap-4">
                  <div className="rounded-xl bg-farmer/10 p-3">
                    <IndianRupee className="h-6 w-6 text-farmer" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Set Your Price</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      We'll show you market rates to help you price competitively!
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Quality Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Quality Grade
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid gap-4 md:grid-cols-3">
                      {qualityOptions.map((option) => (
                        <Card
                          key={option.value}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            formData.quality === option.value 
                              ? 'border-2 border-farmer bg-farmer/5' 
                              : 'border-2 border-transparent hover:border-farmer/30'
                          }`}
                          onClick={() => setFormData({...formData, quality: option.value})}
                        >
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground">{option.label}</h4>
                              <Badge variant="outline" className="text-xs">
                                {option.price}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{option.desc}</p>
                            {formData.quality === option.value && (
                              <div className="mt-3 flex items-center gap-2 text-xs text-farmer">
                                <CheckCircle2 className="h-3 w-3" />
                                <span className="font-medium">Selected</span>
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Price Input with Suggestions */}
                  <div className="space-y-3">
                    <Label htmlFor="price" className="text-base font-semibold flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Your Price (per {formData.unit})
                      <span className="text-red-500">*</span>
                    </Label>
                    
                    {suggestedPrice && (
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-emerald-900 mb-1">💡 Suggested Price Range</p>
                            <p className="text-xs text-emerald-800">
                              Based on current market rates for {formData.cropName}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Minimum</p>
                                <p className="text-lg font-bold text-foreground">₹{Math.floor(suggestedPrice * 0.9)}</p>
                              </div>
                              <Separator orientation="vertical" className="h-12" />
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Market Avg</p>
                                <p className="text-lg font-bold text-emerald-600">₹{suggestedPrice}</p>
                              </div>
                              <Separator orientation="vertical" className="h-12" />
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Premium</p>
                                <p className="text-lg font-bold text-foreground">₹{Math.ceil(suggestedPrice * 1.2)}</p>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setFormData({...formData, price: suggestedPrice.toString()})}
                          >
                            Use Suggested
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="price" 
                        type="number"
                        placeholder="Enter your price..."
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="pl-10 text-lg"
                      />
                    </div>

                    {formData.price && suggestedPrice && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                          {parseFloat(formData.price) < suggestedPrice * 0.9 ? (
                            <>⚠️ Your price is <strong>lower than market rate</strong>. Consider increasing it!</>
                          ) : parseFloat(formData.price) > suggestedPrice * 1.3 ? (
                            <>⚠️ Your price is <strong>higher than market rate</strong>. This might reduce buyer interest.</>
                          ) : (
                            <>✅ Your price is <strong>competitive</strong> with current market rates!</>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Location (Auto-filled) */}
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-base font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Input 
                      id="location" 
                      value={formData.location}
                      disabled
                      className="bg-muted/50"
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Info className="h-3 w-3" />
                      Auto-detected from your profile. Contact support to update.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 3: Photos & Details */}
            {currentStep === 3 && (
              <Card className="border-border bg-white/90 p-8 shadow-lg">
                <div className="mb-6 flex items-start gap-4">
                  <div className="rounded-xl bg-farmer/10 p-3">
                    <ImageIcon className="h-6 w-6 text-farmer" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Add Photos & Description</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Good photos attract more buyers! Add at least 2-3 clear images.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Product Photos
                      <span className="text-red-500">*</span>
                      <Badge variant="outline" className="ml-2">
                        {selectedImages.length}/6
                      </Badge>
                    </Label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="border-dashed border-2 border-farmer/40 bg-gradient-to-br from-farmer/5 to-farmer/10 p-6 text-center cursor-pointer hover:bg-farmer/15 transition-colors relative overflow-hidden group">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload className="mx-auto h-10 w-10 text-farmer mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-semibold text-foreground mb-1">Upload from Gallery</p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG up to 5MB each
                        </p>
                        <Badge variant="outline" className="mt-3">
                          Click to browse
                        </Badge>
                      </Card>

                      <Card className="border-dashed border-2 border-farmer/40 bg-gradient-to-br from-farmer/5 to-farmer/10 p-6 text-center cursor-pointer hover:bg-farmer/15 transition-colors group">
                        <Camera className="mx-auto h-10 w-10 text-farmer mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-semibold text-foreground mb-1">Take Photo</p>
                        <p className="text-xs text-muted-foreground">
                          Use device camera
                        </p>
                        <Badge variant="outline" className="mt-3">
                          Launch Camera
                        </Badge>
                      </Card>
                    </div>

                    {/* Selected Images Preview */}
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {selectedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-32 object-cover rounded-lg border-2 border-border"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            {index === 0 && (
                              <Badge className="absolute bottom-2 left-2 bg-farmer text-white text-xs">
                                Cover
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-amber-900">Photo Tips for Best Results</p>
                          <ul className="text-xs text-amber-800 mt-2 space-y-1 list-disc list-inside">
                            <li>Take photos in good natural light</li>
                            <li>Show the produce from different angles</li>
                            <li>Keep background clean and simple</li>
                            <li>Highlight quality and freshness</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      Product Description
                    </Label>
                    <Textarea 
                      id="description" 
                      rows={6}
                      placeholder="Describe your produce... (e.g., 'Freshly harvested organic tomatoes from my farm. Naturally ripened, no chemicals used. Perfect for cooking and salads.')"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="resize-none"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Tell buyers why your produce is special</span>
                      <span>{formData.description.length}/500 characters</span>
                    </div>
                  </div>

                  {/* Example descriptions */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-2">💡 Good Description Examples:</p>
                    <div className="space-y-2">
                      <div className="p-2 bg-white rounded text-xs">
                        "Premium Basmati rice from my 5-acre organic farm. No pesticides, aged for 2 years for better aroma."
                      </div>
                      <div className="p-2 bg-white rounded text-xs">
                        "Fresh tomatoes picked this morning. Bright red, firm texture, perfect for making paste or curry."
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <Card className="border-border bg-white/90 p-8 shadow-lg">
                <div className="mb-6 flex items-start gap-4">
                  <div className="rounded-xl bg-farmer/10 p-3">
                    <Eye className="h-6 w-6 text-farmer" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Review Your Listing</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check all details before submitting. You can edit anytime later.
                    </p>
                  </div>
                </div>

                {/* Preview Card */}
                <div className="space-y-6">
                  <Card className="border-2 border-farmer/20 overflow-hidden">
                    {selectedImages.length > 0 && (
                      <div className="aspect-video relative">
                        <img 
                          src={selectedImages[0]} 
                          alt="Cover" 
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-farmer text-white">
                          {formData.quality}
                        </Badge>
                      </div>
                    )}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{formData.cropName || "Your Crop"}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{formData.category}</p>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Quantity</p>
                          <p className="text-lg font-semibold text-foreground">{formData.quantity} {formData.unit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Price</p>
                          <p className="text-lg font-semibold text-farmer">₹{formData.price}/{formData.unit}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Location</p>
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {formData.location}
                        </p>
                      </div>

                      {formData.description && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Description</p>
                          <p className="text-sm text-foreground">{formData.description}</p>
                        </div>
                      )}

                      {formData.harvestDate && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Harvested</p>
                          <p className="text-sm text-foreground">{new Date(formData.harvestDate).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Blockchain Info */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-6 w-6 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-purple-900 mb-1">🔐 Blockchain Protected</p>
                        <p className="text-xs text-purple-800">
                          After submission, your listing will be secured with blockchain technology for complete transparency and traceability. 
                          You'll receive a unique hash code that buyers can verify.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <Card className="border-border bg-white/90 p-6 shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  ← Previous Step
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    className="bg-farmer hover:bg-farmer/90 flex items-center gap-2"
                  >
                    Next Step →
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-farmer hover:bg-farmer/90 flex items-center gap-2 text-lg px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Submit Listing
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar Helper */}
          <div className="space-y-6">
            {/* Current Step Help */}
            <Card className="border-border bg-gradient-to-br from-white/90 to-farmer/5 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-farmer/10 p-2">
                  <HelpCircle className="h-5 w-5 text-farmer" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
              </div>

              {currentStep === 1 && (
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="font-medium">Step 1: Crop Details</p>
                  <ul className="space-y-2 list-disc list-inside text-xs">
                    <li>Choose your crop from the list or enter manually</li>
                    <li>Select the correct category for better visibility</li>
                    <li>Enter exact quantity available for sale</li>
                    <li>Recent harvest dates attract more buyers</li>
                  </ul>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="font-medium">Step 2: Pricing & Quality</p>
                  <ul className="space-y-2 list-disc list-inside text-xs">
                    <li>Quality grade affects your price - choose accurately</li>
                    <li>Check suggested prices before setting your own</li>
                    <li>Competitive pricing gets faster sales</li>
                    <li>Premium quality can command 20-30% higher prices</li>
                  </ul>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="font-medium">Step 3: Photos & Description</p>
                  <ul className="space-y-2 list-disc list-inside text-xs">
                    <li>Add at least 2-3 clear photos</li>
                    <li>First photo will be your cover image</li>
                    <li>Write detailed description highlighting quality</li>
                    <li>Mention if organic, fresh, or chemical-free</li>
                  </ul>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-3 text-sm text-foreground/80">
                  <p className="font-medium">Step 4: Review & Submit</p>
                  <ul className="space-y-2 list-disc list-inside text-xs">
                    <li>Double-check all information for accuracy</li>
                    <li>Preview how buyers will see your listing</li>
                    <li>You can edit the listing anytime after submission</li>
                    <li>Get blockchain hash for traceability</li>
                  </ul>
                </div>
              )}
            </Card>

            {/* Market Insights */}
            <Card className="border-border bg-white/90 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Market Insights
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <p className="text-xs font-semibold text-emerald-900 mb-1">🔥 Hot Demand</p>
                  <p className="text-xs text-emerald-800">Organic vegetables are trending! 24% more buyers this week.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-semibold text-blue-900 mb-1">💰 Price Alert</p>
                  <p className="text-xs text-blue-800">Rice prices up by 8% compared to last month.</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs font-semibold text-purple-900 mb-1">📈 Best Time</p>
                  <p className="text-xs text-purple-800">List now! Peak buying hours are 10 AM - 2 PM.</p>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border bg-gradient-to-br from-farmer/10 to-farmer/5 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Listings</span>
                  <span className="text-lg font-bold text-foreground">12</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Sales</span>
                  <span className="text-lg font-bold text-farmer">₹45,600</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-bold text-foreground">4.8</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Support */}
            <Card className="border-border bg-white/90 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-3">Need Assistance?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to help you 24/7
              </p>
              <Button variant="outline" className="w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </FarmerPageShell>
  );
};

export default FarmerCreateListing;

