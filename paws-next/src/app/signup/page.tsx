"use client";

import React, { useState } from "react";
import "../login/login.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please provide email and password");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    // Placeholder: account creation backend not implemented
    alert("Account creation not wired. This is a placeholder.");
    // Optionally redirect to login after 'creation'
    router.push("/login");
  };

    return (
    <div className="login-root">
      <div className="login-card">
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: 12 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #e6e6e6" }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #e6e6e6" }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #e6e6e6" }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              type={showPassword ? "text" : "password"}
              style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #e6e6e6" }}
            />
          </div>

          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input id="show-pw" type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
            <label htmlFor="show-pw" style={{ fontSize: 13, color: '#666' }}>Show password</label>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "none",
              background: "var(--primary-color)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Create account
          </button>
        </form>
        <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          Already have an account? <a href="/login" style={{ color: "var(--primary-color)" }}>Sign in</a>
        </div>
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={() => router.push('/')}
            style={{
              display: "inline-block",
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "none",
              background: "var(--primary-color)",
              color: "#fff",
              textAlign: "center",
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            Go to feed
          </button>
        </div>
      </div>
    </div>
  );
}
