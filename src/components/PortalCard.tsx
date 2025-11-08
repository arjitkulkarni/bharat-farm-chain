import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";

interface PortalCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  to: string;
  colorClass: string;
}

const PortalCard = ({ title, description, features, icon: Icon, to, colorClass }: PortalCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-strong)]">
      <div className="p-8 space-y-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colorClass} bg-opacity-10`}>
          <Icon className={`h-8 w-8 ${colorClass}`} />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className={`mt-1 h-1.5 w-1.5 rounded-full ${colorClass} flex-shrink-0`} />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>

        <Link to={to}>
          <Button className="w-full group-hover:shadow-lg transition-all" size="lg">
            Enter Portal
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PortalCard;
