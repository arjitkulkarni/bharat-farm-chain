import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dot, Pencil, Trash2, Users, Eye, CheckCircle2 } from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const mockListings = [
  {
    id: "LST-1024",
    crop: "Red Onions",
    price: "₹28/kg",
    quantity: "800 kg",
    status: "Active",
    buyers: 6,
    lastUpdated: "2 hours ago",
  },
  {
    id: "LST-1025",
    crop: "Turmeric (Organic)",
    price: "₹145/kg",
    quantity: "120 kg",
    status: "Pending Dispatch",
    buyers: 3,
    lastUpdated: "1 day ago",
  },
  {
    id: "LST-1026",
    crop: "Sugarcane",
    price: "₹3100/ton",
    quantity: "4 tons",
    status: "Sold",
    buyers: 4,
    lastUpdated: "3 days ago",
  },
];

const FarmerMyListings = () => {
  return (
    <FarmerPageShell
      title="My Crop Listings"
      description="Track every crop you have listed, monitor buyer interest, and action approvals or edits without leaving the farmer portal."
      badge="Listings"
      action={{ label: "Create New Listing", to: "/farmer/create-listing" }}
    >
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <Card className="border-border bg-white/90 p-6 shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Live Listings</h2>
              <Badge variant="outline" className="bg-farmer/10 text-farmer">
                Stub Data
              </Badge>
            </div>
            <ScrollArea className="max-h-[520px] pr-3">
              <div className="space-y-4">
                {mockListings.map((listing) => (
                  <Card key={listing.id} className="border-border bg-white/90 p-5 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-foreground">{listing.crop}</h3>
                          <Badge variant="secondary" className="bg-farmer/15 text-farmer">
                            {listing.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">ID: {listing.id}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/80">
                          <span className="inline-flex items-center gap-2">
                            <Dot className="h-5 w-5 text-farmer" />
                            {listing.price}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Dot className="h-5 w-5 text-farmer" />
                            {listing.quantity}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Users className="h-4 w-4 text-farmer" />
                            {listing.buyers} interested buyers
                          </span>
                        </div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground/70">
                          Updated: {listing.lastUpdated}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-foreground/10" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" className="border-amber-200 text-amber-600 hover:text-amber-700" size="sm">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="outline" className="border-rose-200 text-rose-600 hover:text-rose-700" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Close
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">What the full page includes</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Filters for crop, status, and season
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Deep link to buyer contact requests
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Inline analytics (views, conversions)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Export to PDF for offline record keeping
              </li>
            </ul>
          </Card>
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Next actions</h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>Implement Supabase tables for listings, with Row Level Security per farmer.</p>
              <p>Connect this table to React Query for real-time updates and optimistic status changes.</p>
              <p>Offer offline sync via IndexedDB for farmers in low network zones.</p>
            </div>
          </Card>
        </div>
      </div>
    </FarmerPageShell>
  );
};

export default FarmerMyListings;

