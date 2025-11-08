import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type UserRole = "farmer" | "vendor" | "buyer";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuth(role)) {
      // Redirect to login if not authenticated
      navigate(`/${role}/login`, { replace: true });
    }
  }, [checkAuth, role, navigate]);

  // If authenticated with correct role, render children
  if (checkAuth(role)) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
};

export default ProtectedRoute;

