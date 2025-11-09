import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Wallet,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  FileText,
  Hash,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  Sparkles,
  Info,
  Calendar,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import FarmerPageShell from "./FarmerPageShell";

const transactions = [
  {
    id: "TXN-8841",
    type: "Incoming",
    mode: "UPI",
    from: "Ravi Traders",
    amount: 18600,
    amountStr: "₹18,600",
    status: "Settled",
    time: "Today, 10:14 AM",
    date: "Jan 27, 2025",
    crop: "Red Onions",
  },
  {
    id: "TXN-8839",
    type: "Escrow",
    mode: "Escrow",
    from: "FreshMart Retail",
    amount: 42400,
    amountStr: "₹42,400",
    status: "Pending Release",
    time: "Yesterday, 6:05 PM",
    date: "Jan 26, 2025",
    crop: "Basmati Rice",
  },
  {
    id: "TXN-8832",
    type: "COD",
    mode: "Cash",
    from: "Local Buyer (COD)",
    amount: 6500,
    amountStr: "₹6,500",
    status: "Awaiting Confirmation",
    time: "2 days ago",
    date: "Jan 25, 2025",
    crop: "Tomatoes",
  },
  {
    id: "TXN-8820",
    type: "Incoming",
    mode: "UPI",
    from: "Organic Foods Co.",
    amount: 24800,
    amountStr: "₹24,800",
    status: "Settled",
    time: "3 days ago",
    date: "Jan 24, 2025",
    crop: "Turmeric",
  },
  {
    id: "TXN-8815",
    type: "Incoming",
    mode: "Bank Transfer",
    from: "Green Valley Restaurant",
    amount: 15200,
    amountStr: "₹15,200",
    status: "Settled",
    time: "5 days ago",
    date: "Jan 22, 2025",
    crop: "Mixed Vegetables",
  },
  {
    id: "TXN-8810",
    type: "Escrow",
    mode: "Escrow",
    from: "Export House India",
    amount: 38900,
    amountStr: "₹38,900",
    status: "Settled",
    time: "1 week ago",
    date: "Jan 20, 2025",
    crop: "Sugarcane",
  },
];

const incomeData = [
  { name: "Jan 15", income: 35000, expenses: 8000, profit: 27000 },
  { name: "Jan 18", income: 42000, expenses: 12000, profit: 30000 },
  { name: "Jan 21", income: 48000, expenses: 10000, profit: 38000 },
  { name: "Jan 24", income: 56000, expenses: 14000, profit: 42000 },
  { name: "Jan 27", income: 67500, expenses: 16000, profit: 51500 },
];

const paymentMethods = [
  { name: "UPI", value: 45, amount: 68900 },
  { name: "Escrow", value: 35, amount: 81300 },
  { name: "Cash/COD", value: 15, amount: 28600 },
  { name: "Bank Transfer", value: 5, amount: 15200 },
];

const monthlyComparison = [
  { month: "Oct", amount: 125000 },
  { month: "Nov", amount: 148000 },
  { month: "Dec", amount: 172000 },
  { month: "Jan", amount: 194200 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

const FarmerPayments = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const walletBalance = 78450;
  const escrowBalance = 42400;
  const totalEarned = transactions.reduce((sum, t) => sum + (t.status === "Settled" ? t.amount : 0), 0);
  const pendingAmount = transactions.reduce((sum, t) => sum + (t.status !== "Settled" ? t.amount : 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Settled":
        return "bg-emerald-100 text-emerald-700";
      case "Pending Release":
        return "bg-amber-100 text-amber-700";
      case "Awaiting Confirmation":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (mode: string) => {
    switch (mode) {
      case "UPI":
        return <Smartphone className="h-4 w-4" />;
      case "Bank Transfer":
        return <CreditCard className="h-4 w-4" />;
      case "Cash":
        return <Wallet className="h-4 w-4" />;
      case "Escrow":
        return <ShieldCheck className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <FarmerPageShell
      title="Payments & Wallet"
      description="Track every rupee with clarity. From UPI and escrow to COD and DPIN-verified settlements—farmers see it all in one place."
      badge="Payments"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <Activity className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <FileText className="mr-2 h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-farmer data-[state=active]:text-white"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-farmer/10 p-3">
                  <Wallet className="h-6 w-6 text-farmer" />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Available
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">₹{walletBalance.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="flex-1 bg-farmer hover:bg-farmer/90">
                  Withdraw
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Add Funds
                </Button>
              </div>
            </Card>

            <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-100 p-3">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <Badge className="bg-amber-100 text-amber-700">
                  <Clock className="mr-1 h-3 w-3" />
                  Pending
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">₹{escrowBalance.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Escrow Balance</p>
              <div className="mt-2 text-xs text-muted-foreground">
                Will be released after delivery confirmation
              </div>
              <Progress value={75} className="mt-3 h-2" />
            </Card>

            <Card className="border-purple-300 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-purple-100 p-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +24%
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">₹{totalEarned.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Earned (This Month)</p>
              <div className="mt-2 text-xs text-muted-foreground">
                {transactions.filter((t) => t.status === "Settled").length} completed transactions
              </div>
              <Progress value={82} className="mt-3 h-2" />
            </Card>

            <Card className="border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-amber-100 p-3">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <Badge className="bg-amber-100 text-amber-700">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  {transactions.filter((t) => t.status !== "Settled").length} pending
                </Badge>
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">₹{pendingAmount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Pending Amount</p>
              <div className="mt-2 text-xs text-muted-foreground">Expected within 2-3 days</div>
              <Progress value={60} className="mt-3 h-2" />
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="border-farmer/30 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-farmer/10 p-3">
                <Sparkles className="h-6 w-6 text-farmer" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Financial Insights</h3>
                <p className="text-sm text-muted-foreground">
                  💰 Your earnings increased by 24% this month compared to last month
                </p>
                <p className="text-sm text-muted-foreground">
                  ⚡ UPI payments settle 67% faster than other methods - consider promoting it to buyers
                </p>
                <p className="text-sm text-muted-foreground">
                  📊 Your average transaction value is ₹{Math.round(totalEarned / transactions.filter((t) => t.status === "Settled").length).toLocaleString()} - 18% above regional average
                </p>
              </div>
            </div>
          </Card>

          {/* Charts Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Income & Profit Trend */}
            <Card className="border-border bg-white/90 p-6 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Income & Profit Trend</h3>
                  <p className="text-sm text-muted-foreground">Revenue analysis for the past 2 weeks</p>
                </div>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="2"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Payment Methods Distribution */}
            <Card className="border-border bg-white/90 p-6 shadow-soft">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
                <p className="text-sm text-muted-foreground">Distribution by payment type</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid gap-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={method.name}
                    className="flex items-center justify-between rounded-lg bg-muted/30 p-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-foreground">{method.name}</span>
                    </div>
                    <span className="font-semibold text-farmer">₹{method.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
                <p className="text-sm text-muted-foreground">Latest payment activity</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-white p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-muted p-3">{getTypeIcon(txn.mode)}</div>
                    <div>
                      <p className="font-semibold text-foreground">{txn.from}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{txn.crop}</span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>{txn.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-farmer">{txn.amountStr}</p>
                    <Badge className={`mt-1 ${getStatusColor(txn.status)}`}>{txn.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">All Transactions</h2>
              <p className="text-sm text-muted-foreground">Complete payment history with filters</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Statement
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                GST Report
              </Button>
            </div>
          </div>

          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <ScrollArea className="h-[600px] pr-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs font-medium">{txn.id}</TableCell>
                      <TableCell className="text-sm">{txn.date}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{txn.from}</p>
                          <p className="text-xs text-muted-foreground">{txn.time}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{txn.crop}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(txn.mode)}
                          <span className="text-sm">{txn.mode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-farmer">{txn.amountStr}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(txn.status)}>{txn.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border bg-white/90 p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-3">
                  <DollarSign className="h-5 w-5 text-farmer" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">₹32,367</p>
                  <p className="text-sm text-muted-foreground">Avg Transaction</p>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-white/90 p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1.8 days</p>
                  <p className="text-sm text-muted-foreground">Avg Settlement Time</p>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-white/90 p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-100 p-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">+24%</p>
                  <p className="text-sm text-muted-foreground">Growth (MoM)</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Monthly Comparison */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Monthly Income Comparison</h3>
              <p className="text-sm text-muted-foreground">Last 4 months revenue trend</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Payment Safeguards */}
          <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-farmer" />
              <h3 className="text-lg font-semibold text-foreground">Payment Safeguards</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-farmer/20 bg-white p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-farmer" />
                  <div>
                    <p className="font-semibold text-foreground">Escrow Protection</p>
                    <p className="text-sm text-muted-foreground">
                      Payment released only after delivery confirmation
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Hash className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <p className="font-semibold text-foreground">Blockchain Verified</p>
                    <p className="text-sm text-muted-foreground">
                      Every transaction has immutable blockchain hash
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                  <div>
                    <p className="font-semibold text-foreground">DPIN Security</p>
                    <p className="text-sm text-muted-foreground">
                      COD and cash settlements require DPIN confirmation
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                  <div>
                    <p className="font-semibold text-foreground">Dispute Resolution</p>
                    <p className="text-sm text-muted-foreground">
                      Raise disputes with evidence within 7 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </FarmerPageShell>
  );
};

export default FarmerPayments;

