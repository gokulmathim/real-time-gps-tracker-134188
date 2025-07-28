"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";

// PUBLIC_INTERFACE
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const ok = await login(email);
    if (!ok) setErr("Invalid credentials");
    else router.push("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded-lg shadow w-full max-w-sm" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Sign in</h1>
        <input
          className="w-full border rounded p-2 mb-3"
          placeholder="Email"
          type="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded p-2 mb-5"
          placeholder="Password"
          type="password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        {err && <div className="text-red-600 text-xs mb-2">{err}</div>}
        <button className="w-full py-2 rounded bg-primary text-white hover:bg-accent font-semibold">Login</button>
      </form>
    </div>
  );
}
