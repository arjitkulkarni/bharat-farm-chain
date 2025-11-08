import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Languages, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const languageOptions = [
    { code: "en" as const, label: "English", flag: "🇬🇧" },
    { code: "hi" as const, label: "हिंदी", flag: "🇮🇳" },
    { code: "kn" as const, label: "ಕನ್ನಡ", flag: "🇮🇳" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "farmer":
        return "Farmer";
      case "vendor":
        return "Vendor";
      case "buyer":
        return "Buyer";
      default:
        return "User";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Sprout className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">{t("appName")}</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/farmer/login" className="text-sm font-medium text-foreground/80 hover:text-farmer transition-colors">
            {t("forFarmers")}
          </Link>
          <Link to="/vendor" className="text-sm font-medium text-foreground/80 hover:text-vendor transition-colors">
            {t("forVendors")}
          </Link>
          <Link to="/buyer" className="text-sm font-medium text-foreground/80 hover:text-buyer transition-colors">
            {t("forBuyers")}
          </Link>
          
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {languageOptions.find(opt => opt.code === language)?.label}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languageOptions.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  onClick={() => setLanguage(option.code)}
                  className={language === option.code ? "bg-muted" : ""}
                >
                  <span className="mr-2">{option.flag}</span>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu (only show when authenticated) */}
          {isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {getRoleName(user.role || "")}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {user.phone || user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
