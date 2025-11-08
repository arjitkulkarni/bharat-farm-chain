import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ShieldCheck,
  Hash,
  Sprout,
  MapPin,
  Phone,
  Upload,
  CheckCircle2,
  ClipboardSignature,
  Lock,
  Edit,
} from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const FarmerProfile = () => {
  return (
    <FarmerPageShell
      title="Farmer Profile & Verification"
      description="Digital identity for every farmer—covering location, crops, verification, DPIN, and blockchain hashes. Built for trust."
      badge="Profile"
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
        <Card className="border-border bg-white/90 p-6 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border border-farmer/20 bg-farmer/10 text-farmer">
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold text-foreground">Ramesh Kumar</h2>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="mr-1 h-4 w-4 text-emerald-600" />
                    Verified
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">DPIN: 7F4A-23K9</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="border-farmer/20 text-farmer">
                    <MapPin className="mr-1 h-3 w-3 text-farmer" />
                    Village: Kadur
                  </Badge>
                  <Badge variant="outline" className="border-farmer/20 text-farmer">
                    District: Hassan
                  </Badge>
                  <Badge variant="outline" className="border-farmer/20 text-farmer">
                    Karnataka
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" className="inline-flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Update profile photo
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact number</Label>
              <Input id="contact" value="+91 98765 43210" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred language</Label>
              <Input id="language" value="English, हिंदी, ಕನ್ನಡ" readOnly />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value="4/12, Kadur Main Road, Hassan district, Karnataka - 573101"
                readOnly
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crops">Crops grown</Label>
              <Input id="crops" value="Paddy, Millets, Turmeric" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acreage">Land size</Label>
              <Input id="acreage" value="6.5 acres" readOnly />
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="border-border bg-muted/20 p-5">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground">Verification checks</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-farmer" />
                  Mobile OTP + DPIN verification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-farmer" />
                  Land records matched (Bhoomi)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-farmer" />
                  KYC documents stored securely
                </li>
              </ul>
            </Card>
            <Card className="border-border bg-muted/20 p-5">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground">Blockchain identity</h3>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-xs text-muted-foreground">
                <Hash className="h-4 w-4 text-farmer" />
                0x8f2e...b3cd42
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Hash anchored to Supabase record; share with buyers/exporters for trust.
              </p>
            </Card>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Identity actions</h3>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <Button variant="outline" className="inline-flex items-center gap-2 justify-start">
                <Sprout className="h-4 w-4 text-farmer" />
                Update crops grown
              </Button>
              <Button variant="outline" className="inline-flex items-center gap-2 justify-start">
                <Phone className="h-4 w-4 text-farmer" />
                Change contact number
              </Button>
              <Button variant="outline" className="inline-flex items-center gap-2 justify-start">
                <ClipboardSignature className="h-4 w-4 text-farmer" />
                Upload new land documents
              </Button>
            </div>
          </Card>
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Security overview</h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-farmer" />
                Supabase JWT with Row-Level Security for every profile attribute.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                DPIN works offline & syncs when the network is restored.
              </li>
              <li className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-farmer" />
                All edits require OTP confirmation for tamper-proof changes.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </FarmerPageShell>
  );
};

export default FarmerProfile;

