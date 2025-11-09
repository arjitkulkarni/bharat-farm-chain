import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Filter,
  MapPin,
  CheckCircle2,
  FileText,
  Languages,
  Sparkles,
  TrendingUp,
  Clock,
  Calendar,
  Users,
  Award,
  Info,
  ExternalLink,
  AlertCircle,
  Activity,
  Target,
  DollarSign,
} from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const schemes = [
  {
    id: "1",
    name: "PM-Kisan Samman Nidhi",
    eligibility: "Small & marginal farmers with landholding up to 2 hectares",
    benefits: "₹6,000 yearly assistance in three instalments",
    amount: 6000,
    state: "Central",
    cropTypes: ["All crops"],
    deadline: "Ongoing",
    applicants: "12 Cr+",
    matchScore: 98,
    status: "Enrolled",
    lastInstallment: "₹2,000 received on Jan 10, 2025",
    applicationDate: "Dec 2024",
  },
  {
    id: "2",
    name: "Karnataka Raitha Siri",
    eligibility: "Farmers cultivating millets in Karnataka",
    benefits: "₹10,000 per hectare support for millet cultivation",
    amount: 10000,
    state: "Karnataka",
    cropTypes: ["Millets"],
    deadline: "March 31, 2025",
    applicants: "2.5 Lakh",
    matchScore: 95,
    status: "Eligible",
    applicationDate: null,
  },
  {
    id: "3",
    name: "Pradhan Mantri Fasal Bima Yojana",
    eligibility: "All farmers growing notified crops in notified areas",
    benefits: "Insurance coverage for crop loss due to natural calamities",
    amount: 0,
    state: "Central",
    cropTypes: ["Paddy", "Maize", "Pulses"],
    deadline: "Kharif 2025 - June 30",
    applicants: "5.5 Cr+",
    matchScore: 88,
    status: "Applied",
    applicationDate: "Jan 15, 2025",
  },
  {
    id: "4",
    name: "Soil Health Card Scheme",
    eligibility: "All farmers for soil testing and recommendations",
    benefits: "Free soil testing and nutrient management advice",
    amount: 0,
    state: "Central",
    cropTypes: ["All crops"],
    deadline: "Ongoing",
    applicants: "18 Cr+",
    matchScore: 82,
    status: "Eligible",
    applicationDate: null,
  },
  {
    id: "5",
    name: "National Horticulture Mission",
    eligibility: "Farmers engaged in horticulture crops",
    benefits: "Subsidy for drip irrigation, greenhouse, and planting material",
    amount: 50000,
    state: "Central",
    cropTypes: ["Vegetables", "Fruits"],
    deadline: "Feb 28, 2025",
    applicants: "8 Lakh",
    matchScore: 75,
    status: "Eligible",
    applicationDate: null,
  },
];

const FarmerGovernmentSchemes = () => {
  const [activeTab, setActiveTab] = useState("recommended");

  const enrolledCount = schemes.filter((s) => s.status === "Enrolled").length;
  const appliedCount = schemes.filter((s) => s.status === "Applied").length;
  const eligibleCount = schemes.filter((s) => s.status === "Eligible").length;
  const totalBenefits = schemes
    .filter((s) => s.status === "Enrolled" || s.status === "Applied")
    .reduce((sum, s) => sum + s.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enrolled":
        return "bg-emerald-100 text-emerald-700";
      case "Applied":
        return "bg-blue-100 text-blue-700";
      case "Eligible":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <FarmerPageShell
      title="Government Schemes Near You"
      description="Personalised list of central and state programmes that match the farmer's district, crops, and verification status—all available offline via DPIN."
      badge="Government Support"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger
            value="recommended"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <Target className="mr-2 h-4 w-4" />
            Recommended
          </TabsTrigger>
          <TabsTrigger
            value="enrolled"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            My Schemes ({enrolledCount + appliedCount})
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <Activity className="mr-2 h-4 w-4" />
            All Available
          </TabsTrigger>
        </TabsList>

        {/* Recommended Tab */}
        <TabsContent value="recommended" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-farmer/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-farmer" />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{enrolledCount}</p>
              <p className="text-sm text-muted-foreground">Enrolled Schemes</p>
              <Progress value={(enrolledCount / schemes.length) * 100} className="mt-3 h-2" />
            </Card>

            <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-100 p-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">Pending</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{appliedCount}</p>
              <p className="text-sm text-muted-foreground">Applied Schemes</p>
              <Progress value={(appliedCount / schemes.length) * 100} className="mt-3 h-2" />
            </Card>

            <Card className="border-purple-300 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-purple-100 p-3">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-amber-100 text-amber-700">Available</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">{eligibleCount}</p>
              <p className="text-sm text-muted-foreground">Eligible to Apply</p>
              <Progress value={(eligibleCount / schemes.length) * 100} className="mt-3 h-2" />
            </Card>

            <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-amber-100 p-3">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Benefits
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">₹{totalBenefits.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Benefits (Yearly)</p>
              <Progress value={85} className="mt-3 h-2" />
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card className="border-farmer/30 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-farmer/10 p-3">
                <Sparkles className="h-6 w-6 text-farmer" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Personalized Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  🎯 Based on your profile (Hassan, Karnataka), land (2 hectares), and crops (Rice, Millets)
                </p>
                <p className="text-sm text-muted-foreground">
                  💡 You're eligible for 5 schemes worth ₹66,000+ in benefits this year
                </p>
                <p className="text-sm text-muted-foreground">
                  ⚡ <strong>Urgent:</strong> Karnataka Raitha Siri deadline approaching (March 31) - Apply now for ₹10,000 support
                </p>
              </div>
            </div>
          </Card>

          {/* Top Recommended Schemes */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Top Matches for You</h3>
                <p className="text-sm text-muted-foreground">Schemes ranked by relevance and potential benefits</p>
              </div>
            </div>
            <div className="space-y-4">
              {schemes
                .filter((s) => s.status === "Eligible")
                .sort((a, b) => b.matchScore - a.matchScore)
                .map((scheme) => (
                  <Card
                    key={scheme.id}
                    className="border-border bg-white/90 p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="grid gap-6 md:grid-cols-[1fr,auto]">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <h3 className="text-lg font-bold text-foreground">{scheme.name}</h3>
                              <Badge className={getStatusColor(scheme.status)}>{scheme.status}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="border-farmer/30 text-farmer">
                                {scheme.state}
                              </Badge>
                              {scheme.cropTypes.map((crop) => (
                                <Badge key={crop} variant="secondary" className="bg-emerald-50 text-emerald-700">
                                  {crop}
                                </Badge>
                              ))}
                              <Badge className="bg-purple-100 text-purple-700">
                                <Award className="mr-1 h-3 w-3" />
                                {scheme.matchScore}% Match
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="grid gap-3 text-sm md:grid-cols-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-farmer" />
                            <div>
                              <p className="font-semibold text-foreground">Eligibility:</p>
                              <p className="text-muted-foreground">{scheme.eligibility}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <DollarSign className="mt-0.5 h-4 w-4 flex-shrink-0 text-farmer" />
                            <div>
                              <p className="font-semibold text-foreground">Benefits:</p>
                              <p className="text-muted-foreground">{scheme.benefits}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-farmer" />
                            <div>
                              <p className="font-semibold text-foreground">Deadline:</p>
                              <p className="text-muted-foreground">{scheme.deadline}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-farmer" />
                            <div>
                              <p className="font-semibold text-foreground">Applicants:</p>
                              <p className="text-muted-foreground">{scheme.applicants}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button className="bg-farmer hover:bg-farmer/90 gap-2">
                            <FileText className="h-4 w-4" />
                            Apply Now
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Languages className="h-4 w-4" />
                            Local Language
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Official Website
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        {/* My Schemes Tab */}
        <TabsContent value="enrolled" className="space-y-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-foreground">Active & Applied Schemes</h3>
            <p className="text-sm text-muted-foreground">Track your enrolled and pending applications</p>
          </div>

          <div className="space-y-4">
            {schemes
              .filter((s) => s.status === "Enrolled" || s.status === "Applied")
              .map((scheme) => (
                <Card
                  key={scheme.id}
                  className="border-border bg-white/90 p-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-lg font-bold text-foreground">{scheme.name}</h3>
                          <Badge className={getStatusColor(scheme.status)}>{scheme.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-farmer/30 text-farmer">
                            {scheme.state}
                          </Badge>
                          {scheme.cropTypes.map((crop) => (
                            <Badge key={crop} variant="secondary">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {scheme.status === "Enrolled" && scheme.lastInstallment && (
                      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                          <div>
                            <p className="font-semibold text-emerald-900">Latest Update</p>
                            <p className="text-sm text-emerald-700">{scheme.lastInstallment}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {scheme.status === "Applied" && scheme.applicationDate && (
                      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                        <div className="flex items-start gap-3">
                          <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                          <div>
                            <p className="font-semibold text-blue-900">Application Status</p>
                            <p className="text-sm text-blue-700">
                              Applied on {scheme.applicationDate} - Processing (15-30 days)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Deadline: {scheme.deadline}</span>
                      <Separator orientation="vertical" className="h-4" />
                      <Users className="h-3 w-3" />
                      <span>{scheme.applicants} beneficiaries</span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download Certificate
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          {(enrolledCount + appliedCount) === 0 && (
            <Card className="border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No active schemes yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Check the "Recommended" tab to find schemes you're eligible for
              </p>
              <Button className="mt-4 bg-farmer hover:bg-farmer/90" onClick={() => setActiveTab("recommended")}>
                View Recommendations
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* All Available Tab */}
        <TabsContent value="all" className="space-y-6">
          {/* Filters */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5 text-farmer" />
              <h3 className="text-lg font-semibold text-foreground">Filter Schemes</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Karnataka" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="central">All India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input id="district" placeholder="Hassan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type</Label>
                <Select>
                  <SelectTrigger id="crop">
                    <SelectValue placeholder="All crops" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All crops</SelectItem>
                    <SelectItem value="millets">Millets</SelectItem>
                    <SelectItem value="paddy">Paddy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* All Schemes List */}
          <ScrollArea className="h-[700px] pr-4">
            <div className="space-y-4">
              {schemes.map((scheme) => (
                <Card
                  key={scheme.id}
                  className="border-border bg-white/90 p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-lg font-bold text-foreground">{scheme.name}</h3>
                          <Badge className={getStatusColor(scheme.status)}>{scheme.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-farmer/30 text-farmer">
                            {scheme.state}
                          </Badge>
                          {scheme.cropTypes.slice(0, 2).map((crop) => (
                            <Badge key={crop} variant="secondary">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{scheme.benefits}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {scheme.deadline}
                      </span>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {scheme.applicants}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Info className="h-4 w-4" />
                        View Details
                      </Button>
                      {scheme.status === "Eligible" && (
                        <Button size="sm" className="bg-farmer hover:bg-farmer/90 gap-2">
                          <FileText className="h-4 w-4" />
                          Apply
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </FarmerPageShell>
  );
};

export default FarmerGovernmentSchemes;

