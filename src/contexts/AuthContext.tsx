// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAdmin: boolean;
  loginAsAdmin: () => void;
  logout: () => void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
 

  const loginAsAdmin = () => {
    setIsAdmin(true);

  };
  const logout = () => setIsAdmin(false);

  return (
    <AuthContext.Provider value={{ isAdmin, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


