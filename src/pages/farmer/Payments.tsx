import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Wallet, CheckCircle2, ShieldCheck, Smartphone, FileText, Hash } from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const transactions = [
  {
    id: "TXN-8841",
    type: "Incoming",
    mode: "UPI",
    from: "Ravi Traders",
    amount: "₹18,600",
    status: "Settled",
    time: "Today, 10:14 AM",
  },
  {
    id: "TXN-8839",
    type: "Escrow",
    mode: "Escrow",
    from: "FreshMart Retail",
    amount: "₹42,400",
    status: "Pending Release",
    time: "Yesterday, 6:05 PM",
  },
  {
    id: "TXN-8832",
    type: "COD",
    mode: "Cash",
    from: "Local Buyer (COD)",
    amount: "₹6,500",
    status: "Awaiting Confirmation",
    time: "2 days ago",
  },
];

const FarmerPayments = () => {
  return (
    <FarmerPageShell
      title="Payments & Wallet"
      description="Track every rupee with clarity. From UPI and escrow to COD and DPIN-verified settlements—farmers see it all in one place."
      badge="Payments"
    >
      <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
        <Card className="border-border bg-white/90 p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Transaction overview (Stub)</h2>
              <p className="text-sm text-muted-foreground">Real data plugs into Supabase tables with RLS per farmer.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download statement (PDF)
              </Button>
              <Button variant="outline" className="inline-flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate GST report
              </Button>
            </div>
          </div>
          <Tabs defaultValue="wallet" className="mt-6 space-y-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="wallet" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                Wallet
              </TabsTrigger>
              <TabsTrigger value="escrow" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                Escrow
              </TabsTrigger>
              <TabsTrigger value="cod" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                COD
              </TabsTrigger>
            </TabsList>
            <TabsContent value="wallet" className="space-y-4">
              <Card className="border-border bg-muted/20 p-4">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground">Wallet balance</h3>
                <p className="mt-2 text-3xl font-semibold text-foreground">₹78,450</p>
                <p className="text-xs text-muted-foreground">Can be withdrawn anytime via UPI or bank transfer.</p>
              </Card>
            </TabsContent>
            <TabsContent value="escrow" className="space-y-3 text-sm text-muted-foreground">
              Escrow ensures buyers release payment only when the crop is delivered and verified. Farmers can raise disputes
              with evidence.
            </TabsContent>
            <TabsContent value="cod" className="space-y-3 text-sm text-muted-foreground">
              Cash on Delivery entries appear here. Farmers confirm receipt via DPIN or OTP confirmation.
            </TabsContent>
          </Tabs>
          <ScrollArea className="mt-6 h-[320px] pr-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-medium">{txn.id}</TableCell>
                    <TableCell>{txn.type}</TableCell>
                    <TableCell>{txn.from}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-farmer/15 text-farmer">
                        {txn.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{txn.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
        <div className="space-y-6">
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Payment safeguards</h3>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                UPI, bank transfer, escrow, and COD supported
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                DPIN confirmation for COD & cash settlements
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-farmer" />
                Blockchain hash for every completed payment
              </li>
            </ul>
          </Card>
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Implementation notes</h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>Integrate Razorpay/Paytm for UPI, with escrow API for conditional payouts.</p>
              <p>Use Supabase functions to trigger SMS confirmations for DPIN-based settlements.</p>
              <p>Store payment metadata with <Hash className="inline h-3 w-3 text-farmer" /> hashed references per farmer.</p>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              <Wallet className="h-4 w-4 text-farmer" />
              Farmers can download receipts anytime—even offline via cached PDFs.
            </div>
          </Card>
        </div>
      </div>
    </FarmerPageShell>
  );
};

export default FarmerPayments;

