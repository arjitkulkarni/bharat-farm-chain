import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Filter, MapPin, CheckCircle2, FileText, Languages } from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const schemes = [
  {
    name: "PM-Kisan Samman Nidhi",
    eligibility: "Small & marginal farmers with landholding up to 2 hectares",
    benefits: "₹6,000 yearly assistance in three instalments",
    state: "Central",
    cropTypes: ["All crops"],
  },
  {
    name: "Karnataka Raitha Siri",
    eligibility: "Farmers cultivating millets in Karnataka",
    benefits: "₹10,000 per hectare support for millet cultivation",
    state: "Karnataka",
    cropTypes: ["Millets"],
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    eligibility: "All farmers growing notified crops in notified areas",
    benefits: "Insurance coverage for crop loss due to natural calamities",
    state: "Central",
    cropTypes: ["Paddy", "Maize", "Pulses"],
  },
];

const FarmerGovernmentSchemes = () => {
  return (
    <FarmerPageShell
      title="Government Schemes Near You"
      description="Personalised list of central and state programmes that match the farmer's district, crops, and verification status—all available offline via DPIN."
      badge="Government Support"
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
        <Card className="border-border bg-white/90 p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Smart filters (Stub)</h2>
              <p className="text-sm text-muted-foreground">
                Fetch schemes from government APIs or curated datasets. This stub shows the filter layout.
              </p>
            </div>
            <Badge variant="outline" className="bg-farmer/15 text-farmer">
              Auto-localised
            </Badge>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="andhra">Andhra Pradesh</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="central">All India</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="Auto detected: Hassan" />
            </div>
            <div className="space-y-2">
              <Label>Crop Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Paddy", "Millets", "Horticulture", "Oilseeds"].map((crop) => (
                  <label key={crop} className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm">
                    <Checkbox />
                    {crop}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="English / हिंदी / ಕನ್ನಡ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="outline" className="mt-5 inline-flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Apply filters
          </Button>
          <ScrollArea className="mt-8 h-[360px] pr-4">
            <div className="space-y-4">
              {schemes.map((scheme) => (
                <Card key={scheme.name} className="border-border bg-white/95 p-6 shadow-sm">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{scheme.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <Badge variant="secondary" className="bg-farmer/15 text-farmer">
                          {scheme.state}
                        </Badge>
                        {scheme.cropTypes.map((crop) => (
                          <Badge key={crop} variant="outline" className="border-farmer/30 text-farmer">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="border-foreground/20 text-muted-foreground hover:text-foreground" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-foreground/80 md:grid-cols-2">
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-farmer" />
                      Eligibility: {scheme.eligibility}
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-farmer" />
                      Benefits: {scheme.benefits}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF (DPIN)
                    </Button>
                    <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      View in local language
                    </Button>
                    <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Apply Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
        <div className="space-y-6">
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">How it works</h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Auto-detect state & district from farmer profile.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Filter schemes by crop, land size, and certification.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Download documents via DPIN for offline usage.
              </li>
            </ul>
          </Card>
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Integration notes</h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>Sync datasets from AgriStack/central portals, cache results in Supabase.</p>
              <p>Allow QR code verification for offline government kiosks.</p>
              <p>Track application status and reminders directly inside Notifications panel.</p>
            </div>
          </Card>
        </div>
      </div>
    </FarmerPageShell>
  );
};

export default FarmerGovernmentSchemes;

