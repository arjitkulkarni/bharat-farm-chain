import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  FlaskConical,
  UploadCloud,
  Camera,
  CheckCircle2,
  Leaf,
  Droplets,
  Sprout,
  Link2,
  ClipboardSignature,
  Hash,
  X,
  AlertCircle,
  Calendar,
  CloudSun,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileText,
  Download,
} from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";
import { fetchWeatherByCity, type WeatherResponse } from "@/services/weatherService";

interface AnalysisHistory {
  id: string;
  imageUrl: string;
  diagnosis: string;
  confidence: number;
  date: string;
  recommendations: string[];
}

// Sample history data with Google Images URLs
const sampleHistory: AnalysisHistory[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
    diagnosis: "Nitrogen Deficiency",
    confidence: 87,
    date: "2 days ago",
    recommendations: ["Apply 50kg Urea per acre", "Monitor leaf color weekly", "Increase organic matter"],
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    diagnosis: "Healthy Soil",
    confidence: 92,
    date: "1 week ago",
    recommendations: ["Maintain current practices", "Regular pH monitoring", "Continue composting"],
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop",
    diagnosis: "Potassium Deficiency",
    confidence: 78,
    date: "2 weeks ago",
    recommendations: ["Apply potash fertilizer", "Check irrigation schedule", "Add wood ash to soil"],
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop",
    diagnosis: "Leaf Blight Detected",
    confidence: 85,
    date: "3 weeks ago",
    recommendations: ["Apply fungicide spray", "Remove infected leaves", "Improve air circulation"],
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    diagnosis: "Iron Deficiency (Chlorosis)",
    confidence: 81,
    date: "1 month ago",
    recommendations: ["Apply iron chelate", "Check soil pH", "Foliar spray with iron solution"],
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
    diagnosis: "Phosphorus Deficiency",
    confidence: 76,
    date: "1 month ago",
    recommendations: ["Add DAP fertilizer", "Use bone meal", "Improve soil drainage"],
  },
];

const FarmerSoilAnalysis = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch weather data on component mount
  useEffect(() => {
    const loadWeather = async () => {
      setIsLoadingWeather(true);
      try {
        const weatherData = await fetchWeatherByCity("Kadur", "Karnataka");
        setWeather(weatherData);
      } catch (error) {
        console.error("Failed to load weather:", error);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    loadWeather();
  }, []);

  // Handle file upload
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setSelectedImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle drag and drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setSelectedImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Remove image
  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setSelectedImages((prev) => [...prev, imageData]);
        stopCamera();
      }
    }
  };

  // Analyze images
  const analyzeImages = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  return (
    <FarmerPageShell
      title="Soil Health AI Analysis"
      description="Upload soil or leaf photos, run AI diagnostics, and receive actionable insights with vendor recommendations."
      badge="AI Insights"
    >
      <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
        <Card className="border-border bg-white/90 p-6 shadow-soft">
          <Tabs defaultValue="upload" className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Soil & Leaf Diagnosis</h2>
                <p className="text-sm text-muted-foreground">
                  Upload or capture images for instant AI-powered health assessment.
                </p>
              </div>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="upload" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  Upload Photo
                </TabsTrigger>
                <TabsTrigger value="camera" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  Use Camera
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  History
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="upload" className="space-y-6">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Card className="border-dashed border-farmer/40 bg-farmer/5 p-8 text-center transition hover:bg-farmer/10">
                  <UploadCloud className="mx-auto h-10 w-10 text-farmer" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Drag & drop photos here</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload multiple images (soil, leaves, roots). Supports JPG, PNG up to 10MB each.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Select files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </Card>
              </div>

              {/* Selected Images Preview */}
              {selectedImages.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Selected Images ({selectedImages.length})</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedImages([])}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {selectedImages.map((img, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                        <img src={img} alt={`Selected ${index + 1}`} className="h-full w-full object-cover" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={analyzeImages}
                    disabled={isAnalyzing}
                    className="w-full bg-farmer hover:bg-farmer/90"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FlaskConical className="mr-2 h-4 w-4" />
                        Analyze Images
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Analysis Results */}
              {showResults && (
                <Card className="border-farmer/30 bg-emerald-50/50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-farmer/10 p-3">
                      <CheckCircle2 className="h-6 w-6 text-farmer" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Analysis Complete!</h3>
                        <p className="text-sm text-muted-foreground">AI diagnosis with 89% confidence</p>
                      </div>
                      <div className="rounded-lg border border-farmer/20 bg-white p-4">
                        <Badge className="mb-2 bg-amber-100 text-amber-800">Nitrogen Deficiency Detected</Badge>
                        <Progress value={89} className="mb-2 h-2" />
                        <p className="text-sm text-foreground">
                          Your soil shows signs of nitrogen deficiency. Yellowing leaves and stunted growth are common indicators.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">Recommended Actions:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Leaf className="mt-0.5 h-4 w-4 text-farmer" />
                            <span>Apply 50kg Urea per acre within 7 days</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Droplets className="mt-0.5 h-4 w-4 text-farmer" />
                            <span>Increase watering frequency to twice weekly</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Sprout className="mt-0.5 h-4 w-4 text-farmer" />
                            <span>Nearby vendor: GreenGrowth Fertilizers (4.8★, 3 km away)</span>
                          </li>
                        </ul>
                      </div>
                      <Button variant="outline" className="w-full" onClick={() => setShowResults(false)}>
                        Analyze Another Sample
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border bg-muted/20 p-5">
                  <div className="flex items-center gap-3 text-foreground">
                    <FlaskConical className="h-5 w-5 text-farmer" />
                    <h4 className="text-base font-semibold">AI Model Pipeline</h4>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>1. Image quality preprocessing</li>
                    <li>2. Pest & nutrient deficiency detection</li>
                    <li>3. Confidence scoring</li>
                    <li>4. Recommendations & vendor matching</li>
                  </ul>
                </Card>
                <Card className="border-border bg-muted/20 p-5">
                  <div className="flex items-center gap-3 text-foreground">
                    <Link2 className="h-5 w-5 text-farmer" />
                    <h4 className="text-base font-semibold">Vendor Linkage</h4>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Recommendations auto-tag vendors with the right fertilizers, pesticides, or soil treatments—verified
                    through Vendor Hub data.
                  </p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="camera" className="space-y-5">
              {!isCameraActive ? (
                <Card className="border-border bg-muted/20 p-8 text-center">
                  <Camera className="mx-auto h-10 w-10 text-farmer" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Launch device camera</h3>
                  <p className="text-sm text-muted-foreground">
                    Capture soil or leaf samples directly from your device camera for instant analysis.
                  </p>
                  <Button onClick={startCamera} className="mt-4 bg-farmer hover:bg-farmer/90">
                    <Camera className="mr-2 h-4 w-4" />
                    Open Camera
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  <Card className="overflow-hidden border-border bg-black p-0">
                    <div className="relative aspect-video">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
                        <Button
                          onClick={capturePhoto}
                          size="lg"
                          className="rounded-full bg-farmer hover:bg-farmer/90"
                        >
                          <Camera className="mr-2 h-5 w-5" />
                          Capture
                        </Button>
                        <Button
                          onClick={stopCamera}
                          size="lg"
                          variant="outline"
                          className="rounded-full bg-white/90"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <p className="text-center text-sm text-muted-foreground">
                    Position your camera over soil or leaves for best results
                  </p>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Captured Images from Camera */}
              {selectedImages.length > 0 && !isCameraActive && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Captured Images ({selectedImages.length})</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedImages([])}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {selectedImages.map((img, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                        <img src={img} alt={`Captured ${index + 1}`} className="h-full w-full object-cover" />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={analyzeImages}
                    disabled={isAnalyzing}
                    className="w-full bg-farmer hover:bg-farmer/90"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FlaskConical className="mr-2 h-4 w-4" />
                        Analyze Images
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Analysis Results */}
              {showResults && !isCameraActive && (
                <Card className="border-farmer/30 bg-emerald-50/50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-farmer/10 p-3">
                      <CheckCircle2 className="h-6 w-6 text-farmer" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Analysis Complete!</h3>
                        <p className="text-sm text-muted-foreground">AI diagnosis with 89% confidence</p>
                      </div>
                      <div className="rounded-lg border border-farmer/20 bg-white p-4">
                        <Badge className="mb-2 bg-amber-100 text-amber-800">Nitrogen Deficiency Detected</Badge>
                        <Progress value={89} className="mb-2 h-2" />
                        <p className="text-sm text-foreground">
                          Your soil shows signs of nitrogen deficiency. Yellowing leaves and stunted growth are common indicators.
                        </p>
                      </div>
                      <Button variant="outline" className="w-full" onClick={() => setShowResults(false)}>
                        Analyze Another Sample
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Analysis History</h3>
                  <p className="text-sm text-muted-foreground">View past soil and leaf health assessments</p>
                </div>
                <Badge variant="outline" className="text-farmer">
                  {sampleHistory.length} Records
                </Badge>
              </div>

              <div className="grid gap-4">
                {sampleHistory.map((record) => (
                  <Card key={record.id} className="overflow-hidden border-border bg-white/90 shadow-sm transition hover:shadow-md">
                    <div className="grid gap-4 md:grid-cols-[200px,1fr]">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden bg-muted md:aspect-square">
                        <img
                          src={record.imageUrl}
                          alt={record.diagnosis}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-black/70 text-white backdrop-blur">
                            {record.confidence}% confidence
                          </Badge>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-base font-semibold text-foreground">{record.diagnosis}</h4>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{record.date}</span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              record.confidence >= 85
                                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                : record.confidence >= 75
                                ? "border-amber-300 bg-amber-50 text-amber-700"
                                : "border-orange-300 bg-orange-50 text-orange-700"
                            }
                          >
                            {record.confidence >= 85 ? "High" : record.confidence >= 75 ? "Medium" : "Low"} Confidence
                          </Badge>
                        </div>

                        <Progress value={record.confidence} className="h-1.5" />

                        <div className="space-y-1.5">
                          <h5 className="text-xs font-semibold uppercase text-muted-foreground">Recommendations:</h5>
                          <ul className="space-y-1 text-sm text-foreground/80">
                            {record.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-farmer" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Full Report
                          </Button>
                          <Button size="sm" variant="ghost" className="text-farmer">
                            <Hash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Empty state (hidden when there's data) */}
              {sampleHistory.length === 0 && (
                <Card className="border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">No analysis history yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Upload or capture your first soil/leaf sample to get started
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </Card>
        <div className="space-y-6">
          {/* Comprehensive AI Report */}
          <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-farmer/10 p-2">
                  <FileText className="h-5 w-5 text-farmer" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">AI Farm Health Report</h3>
                  <p className="text-xs text-muted-foreground">Generated {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            <Separator className="my-4" />

            {/* Current Weather Impact */}
            <div className="mb-4 space-y-3">
              <div className="flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-foreground">Weather Impact Analysis</h4>
              </div>
              {isLoadingWeather ? (
                <div className="flex items-center justify-center py-4">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-farmer border-t-transparent"></div>
                </div>
              ) : weather ? (
                <div className="space-y-2 rounded-lg border border-farmer/20 bg-white/80 p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Temp</p>
                      <p className="font-semibold text-foreground">{weather.current.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Humidity</p>
                      <p className="font-semibold text-foreground">{weather.current.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rain Chance</p>
                      <p className="font-semibold text-foreground">{weather.current.rainChance}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Wind Speed</p>
                      <p className="font-semibold text-foreground">{weather.current.windSpeed} km/h</p>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Weather Recommendations:</p>
                    {weather.current.rainChance > 60 ? (
                      <div className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                        <span className="text-foreground/80">High rain probability - delay fertilizer application by 2-3 days</span>
                      </div>
                    ) : weather.current.temperature > 32 ? (
                      <div className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                        <span className="text-foreground/80">High temperature - increase irrigation frequency and apply in early morning</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-farmer" />
                        <span className="text-foreground/80">Ideal conditions for fertilizer application and field work</span>
                      </div>
                    )}
                    {weather.current.humidity > 70 && (
                      <div className="flex items-start gap-2 text-sm">
                        <Droplets className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600" />
                        <span className="text-foreground/80">High humidity - monitor for fungal diseases, ensure good air circulation</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Weather data unavailable</p>
              )}
            </div>

            <Separator className="my-4" />

            {/* Soil Health Trends */}
            <div className="mb-4 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <h4 className="font-semibold text-foreground">Soil Health Trends</h4>
              </div>
              <div className="space-y-3 rounded-lg border border-farmer/20 bg-white/80 p-4">
                {/* Analysis Summary */}
                <div className="grid gap-3">
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-foreground">Overall Health</span>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">Improving</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Recent Patterns:</p>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-farmer" />
                        <span className="text-foreground/80">2 out of 6 analyses show healthy soil conditions</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-600" />
                        <span className="text-foreground/80">Nitrogen deficiency detected in 2 recent samples</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingDown className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-orange-600" />
                        <span className="text-foreground/80">Potassium and phosphorus levels need attention</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* Key Metrics */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Nutrient Status:</p>
                  <div className="space-y-2">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-foreground/70">Nitrogen (N)</span>
                        <span className="font-semibold text-amber-700">Low</span>
                      </div>
                      <Progress value={45} className="h-1.5 bg-muted" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-foreground/70">Phosphorus (P)</span>
                        <span className="font-semibold text-orange-700">Low</span>
                      </div>
                      <Progress value={52} className="h-1.5 bg-muted" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-foreground/70">Potassium (K)</span>
                        <span className="font-semibold text-amber-700">Medium</span>
                      </div>
                      <Progress value={68} className="h-1.5 bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Priority Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold text-foreground">Priority Actions (Next 7 Days)</h4>
              </div>
              <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-farmer text-xs font-bold text-white">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Apply Nitrogen Fertilizer</p>
                      <p className="text-xs text-muted-foreground">50kg Urea per acre - Apply in early morning when soil is moist</p>
                      <Badge variant="outline" className="mt-1 text-xs">Urgent</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-farmer text-xs font-bold text-white">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Supplement with DAP & Potash</p>
                      <p className="text-xs text-muted-foreground">25kg DAP + 15kg Potash per acre after nitrogen application</p>
                      <Badge variant="outline" className="mt-1 text-xs">Within 5 days</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-farmer text-xs font-bold text-white">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Monitor Leaf Health</p>
                      <p className="text-xs text-muted-foreground">Take follow-up photos in 10-12 days to track improvement</p>
                      <Badge variant="outline" className="mt-1 text-xs">Scheduled</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Vendor & Support */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-farmer" />
                <h4 className="font-semibold text-foreground">Recommended Vendors</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border bg-white p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-farmer/10 p-2">
                      <Sprout className="h-4 w-4 text-farmer" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">GreenGrowth Fertilizers</p>
                      <p className="text-xs text-muted-foreground">4.8★ • 3 km away • Urea, DAP available</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Contact</Button>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border border-border bg-white p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-farmer/10 p-2">
                      <ClipboardSignature className="h-4 w-4 text-farmer" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Agronomist Consultation</p>
                      <p className="text-xs text-muted-foreground">Expert callback within 2 hours</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Book</Button>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Report Footer */}
            <div className="rounded-lg bg-muted/30 p-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="h-3 w-3" />
                  <span>Report Hash: 7F4A23K9BC8D</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Blockchain Verified
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </FarmerPageShell>
  );
};

export default FarmerSoilAnalysis;

