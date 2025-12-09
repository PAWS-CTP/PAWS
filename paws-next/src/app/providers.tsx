"use client";

// Using Supabase auth throughout this project. Remove NextAuth's SessionProvider
// to avoid the client attempting to call `/api/auth/session` (which we don't
// implement) and returning HTML (causing the JSON parse error).
export default function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
