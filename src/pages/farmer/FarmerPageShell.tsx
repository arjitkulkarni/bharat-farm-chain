import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FarmerPageShellProps {
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
  action?: {
    label: string;
    to: string;
  };
}

const FarmerPageShell = ({ title, description, badge, children, action }: FarmerPageShellProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f6f2ea] via-white to-[#f1f7ef]">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border/50 bg-white/70 py-10 backdrop-blur">
          <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl space-y-3">
              {badge ? (
                <Badge variant="secondary" className="bg-farmer/15 text-farmer">
                  {badge}
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  Farmer Portal
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
              <p className="text-base text-muted-foreground md:text-lg">{description}</p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="border-foreground/10 text-muted-foreground hover:text-foreground">
                <Link to="/farmer/dashboard" className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              {action ? (
                <Button asChild className="bg-farmer hover:bg-farmer/90">
                  <Link to={action.to}>{action.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </section>
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FarmerPageShell;

