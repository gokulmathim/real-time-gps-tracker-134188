"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  token?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
};
// Just for demonstration - store user in localStorage
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
});

// PUBLIC_INTERFACE
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = window.localStorage.getItem("gps_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  async function login(email: string) {
    // Dummy: accept any password, and email is required
    if (!email) return false;
    const u = { email, token: "demo-token" };
    setUser(u);
    window.localStorage.setItem("gps_user", JSON.stringify(u));
    return true;
  }
  function logout() {
    setUser(null);
    window.localStorage.removeItem("gps_user");
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
