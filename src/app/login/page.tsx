"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [remember, setRemember] = useState(false);

  function enterDemo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="login-page">
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="FairTime home">FairTime</Link>
        <Link href="/" className="header-mark" aria-label="FairTime home">
          <Image src="/fairtime-logo.png" alt="" width={64} height={38} />
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/login" aria-current="page">Log in</Link>
        </nav>
      </header>

      <main className="login-main">
        <div className="login-side-art login-side-left" aria-hidden="true" />
        <section className="login-card" aria-labelledby="login-title">
          <h1 id="login-title">FairTime</h1>
          <h2>Log in to your account</h2>
          <p className="login-instructions">Enter your email and password to continue.</p>
          <form onSubmit={enterDemo}>
            <label htmlFor="login-email">Email address</label>
            <input id="login-email" name="email" type="email" autoComplete="email" />
            <label htmlFor="login-password">Password</label>
            <input id="login-password" name="password" type="password" autoComplete="current-password" />
            <div className="login-options">
              <label className="login-remember"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me</label>
              <button type="button" className="login-text-action" onClick={() => setMessage("Password recovery is not available until authentication is connected.")}>Forgot password?</button>
            </div>
            <button type="submit" className="login-submit">Log in</button>
            {message && <p className="login-status" role="status">{message}</p>}
          </form>
          <button type="button" className="login-create" onClick={() => router.push("/dashboard")}>Create an account</button>
        </section>
        <div className="login-side-art login-side-right" aria-hidden="true" />
      </main>
      <p className="login-tagline">Your calendar knows when you&apos;re free. FairTime knows what&apos;s fair.</p>
    </div>
  );
}
