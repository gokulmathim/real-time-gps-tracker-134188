"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";

/**
 * PUBLIC_INTERFACE
 * Wraps protected routes, redirects to /login if not authenticated.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;
  return <>{children}</>;
}
