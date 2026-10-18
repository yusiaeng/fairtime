"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Panel = "extension" | "calendar" | "character" | "history" | null;

const actions = [
  { number: "01", title: "Click here to download and update your FairTime extension.", description: "Ensure that FairTime extension is downloaded and up to date for a smooth experience.", action: "Extension details", panel: "extension" },
  { number: "02", title: "Click here to connect your calendar app/browser to the FairTime extension.", description: "Give permission to the FairTime extension to pop up on your chosen calendar platform.", action: "Connect calendar", panel: "calendar" },
  { number: "03", title: "Click here to personalise your FairTime extension character.", description: "Choose your favourite character to help you fairly schedule a meeting.", action: "Personalise character", panel: "character" },
  { number: "04", title: "Click here to view fairness history of meetings.", description: "Have a look through the fairness ratings of your previous meetings.", action: "View fairness history", panel: "history" },
] as const;

export default function DashboardPage() {
  const [panel, setPanel] = useState<Panel>(null);
  useEffect(() => {
    if (!panel) return;
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") setPanel(null); }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [panel]);

  return (
    <div className="dashboard-page">
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="FairTime home">FairTime</Link>
        <Link href="/" className="header-mark" aria-label="FairTime home"><Image src="/fairtime-logo.png" alt="" width={64} height={38} /></Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/login">Log out</Link>
        </nav>
      </header>
      <main className="dashboard-main">
        <h1>Your FairTime hub</h1>
        <p className="dashboard-subtitle">Set up your companion, connect your calendar, and see how your meetings balance out.</p>
        <div className="dashboard-grid">
          {actions.map((item) => (
            <article className="dashboard-card" key={item.number}>
              <span className="dashboard-number">{item.number}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <button type="button" className="dashboard-card-action" onClick={() => setPanel(item.panel)}>{item.action} <span aria-hidden="true">→</span></button>
            </article>
          ))}
        </div>
        <p className="dashboard-tagline">Your calendar knows when you&apos;re free. FairTime knows what&apos;s fair.</p>
      </main>
      {panel && (
        <div className="dashboard-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPanel(null); }}>
          <section className="dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="dashboard-modal-title">
            <button className="dashboard-modal-close" type="button" onClick={() => setPanel(null)} aria-label="Close">×</button>
            {panel === "history" ? (
              <>
                <h2 id="dashboard-modal-title">Fairness history</h2>
                <p>Your previous meetings and fairness ratings will appear here when meeting history is connected to your account.</p>
                <p className="dashboard-modal-note">No meeting history is available in this demo.</p>
              </>
            ) : panel === "extension" ? (
              <>
                <h2 id="dashboard-modal-title">FairTime extension</h2>
                <p>The browser extension is still being developed. There is no verified download or update link yet.</p>
              </>
            ) : panel === "calendar" ? (
              <>
                <h2 id="dashboard-modal-title">Connect your calendar</h2>
                <p>Google and Outlook calendar connections are not enabled yet. Once integration is ready, you&apos;ll be able to authorise access here.</p>
              </>
            ) : (
              <>
                <h2 id="dashboard-modal-title">Choose your character</h2>
                <p>Character personalisation will be available when the FairTime extension and its character assets are ready.</p>
              </>
            )}
            <button type="button" className="dashboard-modal-done" onClick={() => setPanel(null)}>Close</button>
          </section>
        </div>
      )}
    </div>
  );
}
