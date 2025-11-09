import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Send,
  Upload,
  X,
  Loader2,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { toast } from "sonner";
import FarmerPageShell from "./FarmerPageShell";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

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
    officialWebsite: "https://pmkisan.gov.in/",
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
    officialWebsite: "https://raitamitra.karnataka.gov.in/",
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
    officialWebsite: "https://pmfby.gov.in/",
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
    officialWebsite: "https://soilhealth.dac.gov.in/",
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
    officialWebsite: "https://nhm.nic.in/",
  },
];

// Analytics Data
const benefitsTrendData = [
  { month: "Jul 2024", amount: 2000, schemes: 1 },
  { month: "Aug 2024", amount: 2000, schemes: 1 },
  { month: "Sep 2024", amount: 2000, schemes: 1 },
  { month: "Oct 2024", amount: 2000, schemes: 1 },
  { month: "Nov 2024", amount: 2000, schemes: 1 },
  { month: "Dec 2024", amount: 2000, schemes: 1 },
  { month: "Jan 2025", amount: 2000, schemes: 2 },
];

const schemeStatusData = [
  { name: "Enrolled", value: 1, color: "#10b981" },
  { name: "Applied", value: 1, color: "#3b82f6" },
  { name: "Eligible", value: 3, color: "#f59e0b" },
];

const categoryDistributionData = [
  { category: "Financial Aid", count: 2, totalBenefit: 16000 },
  { category: "Insurance", count: 1, totalBenefit: 0 },
  { category: "Advisory", count: 1, totalBenefit: 0 },
  { category: "Infrastructure", count: 1, totalBenefit: 50000 },
];

const applicationTimelineData = [
  { month: "Dec 2024", applied: 0, approved: 1, pending: 0 },
  { month: "Jan 2025", applied: 1, approved: 0, pending: 1 },
  { month: "Feb 2025", applied: 0, approved: 0, pending: 0 },
  { month: "Mar 2025", applied: 0, approved: 0, pending: 0 },
];

const stateWiseSchemes = [
  { state: "Central", schemes: 4, enrolled: 1, eligible: 2 },
  { state: "Karnataka", schemes: 1, enrolled: 0, eligible: 1 },
];

const eligibilityScoreData = [
  { scheme: "PM-Kisan", score: 98 },
  { scheme: "KA Raitha Siri", score: 95 },
  { scheme: "PM Fasal Bima", score: 88 },
  { scheme: "Soil Health", score: 82 },
  { scheme: "Horticulture", score: 75 },
];

const monthlyImpactData = [
  { month: "Jul", income: 2000, applications: 0 },
  { month: "Aug", income: 2000, applications: 0 },
  { month: "Sep", income: 2000, applications: 0 },
  { month: "Oct", income: 2000, applications: 0 },
  { month: "Nov", income: 2000, applications: 0 },
  { month: "Dec", income: 2000, applications: 1 },
  { month: "Jan", income: 2000, applications: 1 },
];

interface ApplicationForm {
  fullName: string;
  fatherName: string;
  aadhaarNumber: string;
  mobileNumber: string;
  email: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  landHolding: string;
  cropType: string;
  bankAccount: string;
  ifscCode: string;
  additionalInfo: string;
  documents: File[];
}

const initialFormData: ApplicationForm = {
  fullName: "",
  fatherName: "",
  aadhaarNumber: "",
  mobileNumber: "",
  email: "",
  address: "",
  district: "",
  state: "",
  pincode: "",
  landHolding: "",
  cropType: "",
  bankAccount: "",
  ifscCode: "",
  additionalInfo: "",
  documents: [],
};

const FarmerGovernmentSchemes = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [schemesList, setSchemesList] = useState(schemes);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<typeof schemes[0] | null>(null);
  const [applicationForm, setApplicationForm] = useState<ApplicationForm>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const enrolledCount = schemesList.filter((s) => s.status === "Enrolled").length;
  const appliedCount = schemesList.filter((s) => s.status === "Applied").length;
  const eligibleCount = schemesList.filter((s) => s.status === "Eligible").length;
  const totalBenefits = schemesList
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

  const handleApplyClick = (scheme: typeof schemes[0]) => {
    setSelectedScheme(scheme);
    setShowApplicationDialog(true);
    // Pre-fill some data if available
    setApplicationForm({
      ...initialFormData,
      district: "Hassan",
      state: "Karnataka",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      setApplicationForm(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)]
      }));
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== fileName));
  };

  const handleFormChange = (field: keyof ApplicationForm, value: string) => {
    setApplicationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitApplication = async () => {
    // Validate required fields
    const requiredFields: (keyof ApplicationForm)[] = [
      'fullName',
      'aadhaarNumber',
      'mobileNumber',
      'address',
      'district',
      'state',
      'landHolding',
      'bankAccount',
      'ifscCode'
    ];

    const emptyFields = requiredFields.filter(field => !applicationForm[field]);

    if (emptyFields.length > 0) {
      toast.error('Please fill all required fields', {
        description: 'All fields marked with * are mandatory',
      });
      return;
    }

    if (!selectedScheme) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Update scheme status
      setSchemesList(prev =>
        prev.map(scheme =>
          scheme.id === selectedScheme.id
            ? {
                ...scheme,
                status: "Applied",
                applicationDate: new Date().toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })
              }
            : scheme
        )
      );

      setIsSubmitting(false);
      setShowApplicationDialog(false);
      
      // Show success toast
      toast.success('Application Submitted Successfully! 🎉', {
        description: `Your application for ${selectedScheme.name} has been submitted. Track status in "My Schemes" tab.`,
        duration: 5000,
      });

      // Switch to My Schemes tab
      setTimeout(() => {
        setActiveTab("enrolled");
      }, 1000);

      // Reset form
      setApplicationForm(initialFormData);
      setUploadedFiles([]);
    }, 2000); // Simulate network delay
  };

  const handleDialogClose = () => {
    setShowApplicationDialog(false);
    setSelectedScheme(null);
    setApplicationForm(initialFormData);
    setUploadedFiles([]);
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
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
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
              {schemesList
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
                          <Button 
                            className="bg-farmer hover:bg-farmer/90 gap-2"
                            onClick={() => handleApplyClick(scheme)}
                          >
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
                          <Button 
                            variant="outline" 
                            className="gap-2"
                            onClick={() => window.open(scheme.officialWebsite, '_blank', 'noopener,noreferrer')}
                          >
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
            {schemesList
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => window.open(scheme.officialWebsite, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Official Website
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
              {schemesList.map((scheme) => (
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
                        <Button 
                          size="sm" 
                          className="bg-farmer hover:bg-farmer/90 gap-2"
                          onClick={() => handleApplyClick(scheme)}
                        >
                          <FileText className="h-4 w-4" />
                          Apply
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => window.open(scheme.officialWebsite, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Official Website
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-foreground">Scheme Analytics & Insights</h3>
            <p className="text-sm text-muted-foreground">Track your benefits, applications, and scheme performance</p>
          </div>

          {/* Key Metrics Row */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-emerald-100 p-3">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">₹14,000</p>
              <p className="text-sm text-muted-foreground">Total Benefits Received</p>
              <div className="mt-2 flex items-center text-xs text-emerald-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+₹2,000 this month</span>
              </div>
            </Card>

            <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-100 p-3">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">Active</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground">Active Applications</p>
              <div className="mt-2 text-xs text-muted-foreground">
                1 Enrolled, 1 Pending
              </div>
            </Card>

            <Card className="border-purple-300 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-purple-100 p-3">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700">85%</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">90%</p>
              <p className="text-sm text-muted-foreground">Avg Match Score</p>
              <div className="mt-2 text-xs text-muted-foreground">
                High eligibility rating
              </div>
            </Card>

            <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-amber-100 p-3">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
                <Badge className="bg-amber-100 text-amber-700">New</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">₹52,000</p>
              <p className="text-sm text-muted-foreground">Potential Benefits</p>
              <div className="mt-2 text-xs text-muted-foreground">
                From 3 eligible schemes
              </div>
            </Card>
          </div>

          {/* Benefits Trend Chart */}
          <Card className="border-border bg-white/90 p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-farmer" />
                  Benefits Received Over Time
                </h3>
                <p className="text-sm text-muted-foreground">Monthly benefits tracking (Last 7 months)</p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">
                ↑ 0% Growth
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={benefitsTrendData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
                  formatter={(value: number) => [`₹${value}`, 'Amount']}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorAmount)"
                  name="Benefits (₹)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Two Column Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Scheme Status Distribution */}
            <Card className="border-border bg-white/90 p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-farmer" />
                  Scheme Status Distribution
                </h3>
                <p className="text-sm text-muted-foreground">Current status of all schemes</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={schemeStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {schemeStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {schemeStatusData.map((item) => (
                  <div key={item.name} className="rounded-lg bg-muted/50 p-2">
                    <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Category Distribution */}
            <Card className="border-border bg-white/90 p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-farmer" />
                  Schemes by Category
                </h3>
                <p className="text-sm text-muted-foreground">Distribution across categories</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-20} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#10b981" name="Schemes" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Application Timeline */}
          <Card className="border-border bg-white/90 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-farmer" />
                Application Timeline
              </h3>
              <p className="text-sm text-muted-foreground">Track your application and approval journey</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={applicationTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
                <Legend />
                <Line type="monotone" dataKey="applied" stroke="#f59e0b" strokeWidth={2} name="Applied" />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} name="Approved" />
                <Line type="monotone" dataKey="pending" stroke="#3b82f6" strokeWidth={2} name="Pending" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </Card>

          {/* State-wise Distribution & Eligibility Score */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* State-wise Schemes */}
            <Card className="border-border bg-white/90 p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-farmer" />
                  State-wise Distribution
                </h3>
                <p className="text-sm text-muted-foreground">Schemes by state/central</p>
              </div>
              <div className="space-y-4">
                {stateWiseSchemes.map((item) => (
                  <div key={item.state} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{item.state}</span>
                      <Badge variant="outline">{item.schemes} schemes</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-emerald-50 p-2 text-center">
                        <p className="text-xl font-bold text-emerald-600">{item.enrolled}</p>
                        <p className="text-xs text-muted-foreground">Enrolled</p>
                      </div>
                      <div className="rounded-lg bg-amber-50 p-2 text-center">
                        <p className="text-xl font-bold text-amber-600">{item.eligible}</p>
                        <p className="text-xs text-muted-foreground">Eligible</p>
                      </div>
                    </div>
                    <Progress 
                      value={(item.enrolled / item.schemes) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Eligibility Score Radar */}
            <Card className="border-border bg-white/90 p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-farmer" />
                  Eligibility Match Scores
                </h3>
                <p className="text-sm text-muted-foreground">Your match percentage for each scheme</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={eligibilityScoreData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="scheme" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Match Score"
                    dataKey="score"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Monthly Impact Analysis */}
          <Card className="border-border bg-white/90 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-farmer" />
                Monthly Impact Analysis
              </h3>
              <p className="text-sm text-muted-foreground">Income vs Application Activity</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyImpactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="income" fill="#10b981" name="Income (₹)" />
                <Bar yAxisId="right" dataKey="applications" fill="#3b82f6" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Insights & Recommendations */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-farmer/10 p-2">
                  <Sparkles className="h-5 w-5 text-farmer" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">AI Insights</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ You're receiving consistent benefits of ₹2,000/month from PM-Kisan</li>
                    <li>✓ High eligibility scores (90% avg) - Apply to more schemes!</li>
                    <li>✓ Karnataka Raitha Siri can add ₹10,000 to your benefits</li>
                    <li>✓ Your PMFBY application is under review (15-20 days remaining)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Action Items</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>🎯 Apply for Karnataka Raitha Siri before March 31</li>
                    <li>🎯 Register for Soil Health Card (Free service)</li>
                    <li>🎯 Check eligibility for National Horticulture Mission</li>
                    <li>🎯 Download PM-Kisan certificate for bank records</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Export & Share */}
          <Card className="border-border bg-muted/20 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-farmer/10 p-3">
                  <Download className="h-6 w-6 text-farmer" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Export Analytics Report</h3>
                  <p className="text-sm text-muted-foreground">Download detailed report for your records</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  PDF Report
                </Button>
                <Button className="bg-farmer hover:bg-farmer/90 gap-2">
                  <Download className="h-4 w-4" />
                  Download Data
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <FileText className="h-6 w-6 text-farmer" />
              Apply for {selectedScheme?.name}
            </DialogTitle>
            <DialogDescription>
              Fill in the application form below. All fields marked with * are mandatory.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personal Information
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={applicationForm.fullName}
                    onChange={(e) => handleFormChange('fullName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    placeholder="Enter father's name"
                    value={applicationForm.fatherName}
                    onChange={(e) => handleFormChange('fatherName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                  <Input
                    id="aadhaar"
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={12}
                    value={applicationForm.aadhaarNumber}
                    onChange={(e) => handleFormChange('aadhaarNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    placeholder="+91 XXXXX-XXXXX"
                    maxLength={10}
                    value={applicationForm.mobileNumber}
                    onChange={(e) => handleFormChange('mobileNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={applicationForm.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Details
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    rows={2}
                    value={applicationForm.address}
                    onChange={(e) => handleFormChange('address', e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      placeholder="District"
                      value={applicationForm.district}
                      onChange={(e) => handleFormChange('district', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={applicationForm.state}
                      onChange={(e) => handleFormChange('state', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="Pincode"
                      maxLength={6}
                      value={applicationForm.pincode}
                      onChange={(e) => handleFormChange('pincode', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Agricultural Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Agricultural Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="landHolding">Land Holding (hectares) *</Label>
                  <Input
                    id="landHolding"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 2.5"
                    value={applicationForm.landHolding}
                    onChange={(e) => handleFormChange('landHolding', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropType">Primary Crop Type</Label>
                  <Select
                    value={applicationForm.cropType}
                    onValueChange={(value) => handleFormChange('cropType', value)}
                  >
                    <SelectTrigger id="cropType">
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="millets">Millets</SelectItem>
                      <SelectItem value="pulses">Pulses</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Bank Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Bank Account Details
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Bank Account Number *</Label>
                  <Input
                    id="bankAccount"
                    placeholder="Enter account number"
                    value={applicationForm.bankAccount}
                    onChange={(e) => handleFormChange('bankAccount', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code *</Label>
                  <Input
                    id="ifsc"
                    placeholder="e.g., SBIN0001234"
                    maxLength={11}
                    value={applicationForm.ifscCode}
                    onChange={(e) => handleFormChange('ifscCode', e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Document Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Documents
              </h3>

              <div className="space-y-2">
                <Label htmlFor="documents">Supporting Documents (Optional)</Label>
                <p className="text-sm text-muted-foreground">
                  Upload Aadhaar, land records, bank passbook, etc. (Max 5 files, 10MB each)
                </p>
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files:</Label>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted"
                      >
                        <span className="text-sm flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {file}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any additional details you'd like to provide..."
                rows={3}
                value={applicationForm.additionalInfo}
                onChange={(e) => handleFormChange('additionalInfo', e.target.value)}
              />
            </div>

            {/* Declaration */}
            <Card className="bg-amber-50 border-amber-200 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-amber-900">Declaration</p>
                  <p className="text-sm text-amber-800">
                    I hereby declare that the information provided above is true and correct to the best of my knowledge.
                    I understand that any false information may result in rejection of my application.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleDialogClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="bg-farmer hover:bg-farmer/90"
              onClick={handleSubmitApplication}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FarmerPageShell>
  );
};

export default FarmerGovernmentSchemes;

