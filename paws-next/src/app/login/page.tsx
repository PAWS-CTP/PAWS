"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import "./login.css";
import logo from "../../assets/PAWS_Logo_NoText.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  async function handleLocalLogin() {
    
    const res: any = await signIn("credentials", { redirect: false, username, password });
    if (res && res.ok) {
      router.push("/");
    } else {
      alert("Local login failed. Ensure a credentials provider is configured.");
    }
  }

  return (
    <div className="login-root">
      <div className="login-card">
        <div style={{ display: "block" }}>
          <Image src={logo} alt="PAWS logo" className="login-logo" width={160} height={160} />
        </div>
          {session ? (
            <>
              <p className="login-note">Signed in as {session.user?.email}</p>
              <button className="signin-btn" onClick={() => signOut()}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 12 }}>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username or email"
                  type="text"
                  style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #e6e6e6" }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                  style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #e6e6e6" }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <button className="signin-btn" onClick={handleLocalLogin}>
                  Login
                </button>
              </div>

              <div className="sep">OR</div>

              <button
                className="signin-btn"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                aria-label="Sign in with Google"
              >
                Sign in with Google
              </button>

              <div style={{ fontSize: 13, color: "#666", marginTop: 12 }}>
                Don't have an account? <a href="/signup" style={{ color: "var(--primary-color)" }}>Sign up</a>
              </div>
            </>
          )}
        
      </div>
    </div>
  );
}
