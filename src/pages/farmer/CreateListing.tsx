import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Image, Loader2, ShieldCheck, CheckCircle2, Hash } from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const FarmerCreateListing = () => {
  return (
    <FarmerPageShell
      title="Create Crop Listing"
      description="List new produce in under a minute. Auto-compressed photos, auto-filled locations, and instant traceability hashes keep farmers in control."
      badge="Listings"
    >
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <Card className="border-border bg-white/90 p-8 shadow-soft">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Listing Form (Stub)</h2>
              <p className="text-sm text-muted-foreground">
                This stub demonstrates the structure. Integrate with Supabase/S3 for real uploads and persistence.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Name</Label>
                <Input id="crop" placeholder="e.g. Basmati Rice" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (kg/quintal)</Label>
                <Input id="quantity" placeholder="e.g. 25 quintal" />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Expected Price (per kg/quintal)</Label>
                <Input id="price" placeholder="₹" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location (auto-filled)</Label>
                <Input id="location" placeholder="Village: Kadur, District: Hassan" disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Crop Description (optional)</Label>
              <Textarea id="description" rows={4} placeholder="Organic, harvested this week, naturally dried..." />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Card className="border-dashed border-farmer/40 bg-farmer/5 p-5 text-center">
                <Image className="mx-auto h-8 w-8 text-farmer" />
                <p className="mt-2 text-sm font-medium text-foreground">Upload Photos</p>
                <p className="text-xs text-muted-foreground">
                  Auto-compress to &lt; 300kb for faster rural uploads.
                </p>
                <Button variant="outline" className="mt-3">
                  Choose files
                </Button>
              </Card>
              <Card className="border-dashed border-farmer/40 bg-farmer/5 p-5 text-center">
                <Camera className="mx-auto h-8 w-8 text-farmer" />
                <p className="mt-2 text-sm font-medium text-foreground">Take Photo</p>
                <p className="text-xs text-muted-foreground">
                  Use device camera. Compress & upload via background worker.
                </p>
                <Button variant="outline" className="mt-3">
                  Launch camera
                </Button>
              </Card>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-farmer/10 p-4 text-sm text-farmer">
              <Loader2 className="h-4 w-4 animate-spin" />
              Real implementation triggers background job → saves listing → returns traceability hash instantly.
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <Button className="bg-farmer hover:bg-farmer/90">Submit Listing</Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-farmer" />
                Protected with farmer verification & DPIN fallback.
              </div>
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Workflow Overview</h3>
            <ul className="mt-3 space-y-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Farmer fills basic crop info.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Photos compressed client-side for low data usage.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                On submit, listing ID & hash generated.
              </li>
            </ul>
          </Card>
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Traceability & Security</h3>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              <Hash className="h-4 w-4 text-farmer" />
              Blockchain hash anchors listing metadata.
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-farmer" />
              DPIN fallback ensures offline verification.
            </div>
            <Badge variant="outline" className="mt-4 bg-farmer/10 text-farmer">
              Status: Draft Stub
            </Badge>
          </Card>
        </div>
      </div>
    </FarmerPageShell>
  );
};

export default FarmerCreateListing;

