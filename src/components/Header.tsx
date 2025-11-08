import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Languages, LogOut, User, GraduationCap, Sparkles } from "lucide-react";
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
  const location = useLocation();

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

  // Check if current path is active for a portal
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Sprout className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">{t("appName")}</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {/* Farmer Portal Link */}
          <Link 
            to="/farmer/login" 
            className={`
              relative text-sm font-medium transition-all duration-300 ease-in-out
              ${isActive('/farmer') 
                ? 'text-farmer scale-110' 
                : 'text-foreground/80 hover:text-farmer hover:scale-105'
              }
            `}
          >
            <span className="relative">
              {t("forFarmers")}
              {isActive('/farmer') && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-farmer animate-pulse" />
              )}
            </span>
          </Link>

          {/* Vendor Portal Link */}
          <Link 
            to="/vendor" 
            className={`
              relative text-sm font-medium transition-all duration-300 ease-in-out
              ${isActive('/vendor') 
                ? 'text-vendor scale-110' 
                : 'text-foreground/80 hover:text-vendor hover:scale-105'
              }
            `}
          >
            <span className="relative">
              {t("forVendors")}
              {isActive('/vendor') && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vendor animate-pulse" />
              )}
            </span>
          </Link>

          {/* Buyer Portal Link */}
          <Link 
            to="/buyer" 
            className={`
              relative text-sm font-medium transition-all duration-300 ease-in-out
              ${isActive('/buyer') 
                ? 'text-buyer scale-110' 
                : 'text-foreground/80 hover:text-buyer hover:scale-105'
              }
            `}
          >
            <span className="relative">
              {t("forBuyers")}
              {isActive('/buyer') && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-buyer animate-pulse" />
              )}
            </span>
          </Link>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Farm Academy Button - Catchy Learning Hub */}
          <Link to="/farm-academy">
            <Button 
              size="sm" 
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <GraduationCap className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
              <span className="relative font-semibold text-xs">Farm Academy</span>
              <Sparkles className="h-3 w-3 ml-1 opacity-80 group-hover:opacity-100 transition-opacity" />
            </Button>
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
