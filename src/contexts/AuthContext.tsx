import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "farmer" | "vendor" | "buyer" | null;

interface AuthUser {
  role: UserRole;
  email?: string;
  phone?: string;
  name?: string;
  loginTime: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string, phone?: string, name?: string) => void;
  logout: () => void;
  checkAuth: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "bharat_farm_chain_auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Load authentication state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        const parsedAuth: AuthUser = JSON.parse(storedAuth);
        setUser(parsedAuth);
      } catch (error) {
        console.error("Failed to parse stored auth:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  const login = (role: UserRole, email?: string, phone?: string, name?: string) => {
    const authUser: AuthUser = {
      role,
      email,
      phone,
      name,
      loginTime: Date.now(),
    };
    setUser(authUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const checkAuth = (role: UserRole): boolean => {
    return user !== null && user.role === role;
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

