"use client";

import { useState } from "react";
import Image from "next/image";

type Panel = "how" | "faq" | "login" | "calendar" | "demo" | null;

const panelContent = {
  how: {
    title: "How FairTime works",
    text: "FairTime will use your team's availability, time zones, preferred hours and historical meeting inconvenience to recommend fairer meeting times.",
  },
  faq: {
    title: "Frequently asked questions",
    text: "Does FairTime replace your calendar? No. The plan is to connect to the calendars you already use and help your group choose fair meeting times.",
  },
  login: {
    title: "Log in",
    text: "Authentication is not connected yet. We’ll link this button to the real sign-in flow once it is ready.",
  },
  calendar: {
    title: "Connect your calendar",
    text: "Google and Outlook calendar connection is not implemented yet. This button is ready to link to onboarding once the integration is built.",
  },
  demo: {
    title: "FairTime demo",
    text: "The demo video has not been supplied yet. When it's ready, this button can open the video here.",
  },
};

export default function Home() {
  const [panel, setPanel] = useState<Panel>(null);
  const active = panel ? panelContent[panel] : null;

  return (
    <div className="landing">
      <header className="site-header">
        <a href="/" className="wordmark" aria-label="FairTime home">FairTime</a>
        <nav className="site-nav" aria-label="Main navigation">
          <button type="button" onClick={() => setPanel("how")}>How it works</button>
          <button type="button" onClick={() => setPanel("faq")}>FAQ</button>
          <button type="button" onClick={() => setPanel("login")}>Log in</button>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-copy">
          <h1>Meeting times that work for everyone.</h1>
          <p className="hero-description">
            Find meeting times that balance availability, time zones, and everyone&apos;s preferred hours.
          </p>
          <p className="hero-tagline">
            Your calendar knows when you&apos;re free.<br />
            <strong>FairTime knows what&apos;s fair.</strong>
          </p>
          <div className="hero-actions">
            <button type="button" className="cta cta-primary" onClick={() => setPanel("calendar")}>
              Connect your calendar
            </button>
            <button type="button" className="cta cta-outline" onClick={() => setPanel("demo")}>
              Watch the demo
            </button>
          </div>
        </div>

        <div className="hero-art" aria-label="FairTime balance scales artwork area">
          <div className="hero-red-circle" aria-hidden="true" />
          <div className="hero-teal-circle" aria-hidden="true" />
          <Image className="hero-logo" src="/fairtime-logo.png" alt="FairTime balance scales logo" width={951} height={553} priority />
        </div>
      </main>

      {active && (
        <div className="dialog-backdrop" onClick={() => setPanel(null)}>
          <section className="info-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" aria-label="Close dialog" onClick={() => setPanel(null)}>×</button>
            <h2 id="dialog-title">{active.title}</h2>
            <p>{active.text}</p>
          </section>
        </div>
      )}
    </div>
  );
}
