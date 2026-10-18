"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Connect your calendar",
    description: "Link a supported calendar so FairTime can consider your availability.",
  },
  {
    number: "02",
    title: "Set your preferences",
    description: "Tell FairTime when you prefer to meet and what times are difficult for you.",
  },
  {
    number: "03",
    title: "Find a fair time",
    description: "Compare suggested times based on availability, preferences and accumulated inconvenience.",
  },
];

export default function HowItWorksPage() {
  const [panel, setPanel] = useState<"calendar" | "faq" | "login" | null>(null);

  return (
    <div className="how-page">
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="FairTime home">FairTime</Link>\n        <Link href="/" className="header-mark" aria-label="FairTime home"><Image src="/fairtime-logo.png" alt="" width={64} height={38} /></Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/how-it-works" aria-current="page">How it works</Link>
          <Link href="/faq">FAQ</Link>
          <button type="button" onClick={() => setPanel("login")}>Log in</button>
        </nav>
      </header>

      <main>
        <section className="how-intro" aria-labelledby="how-heading">
          <h1 id="how-heading">Less back-and-forth. More balanced meetings.</h1>
          <p className="how-lead">Connect your calendar, tell FairTime what works for you, and find meeting times that consider everyone.</p>
          <div className="how-steps">
            {steps.map((step) => (
              <article className="how-step" key={step.number}>
                <span className="how-step-number">{step.number}</span>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <button className="cta cta-primary how-main-cta" type="button" onClick={() => setPanel("calendar")}>
            Create your first meeting <span aria-hidden="true">→</span>
          </button>
          <p className="how-small-tagline">Your calendar knows when you&apos;re free. FairTime knows what&apos;s fair.</p>
        </section>

        <section className="how-more" aria-labelledby="fairness-heading">
          <h2 id="fairness-heading">What makes a meeting time fair?</h2>
          <p>FairTime&apos;s scheduling engine considers each person&apos;s local time, preferred meeting hours and recorded historical inconvenience when ranking candidate meeting times. Calendar availability must first be connected to generate real available slots.</p>
          <div className="how-more-grid">
            <article className="how-info-card">
              <h3>Set your preferences. Pick your companion.</h3>
              <p>Choose your time zone and preferred hours. Companion customisation is planned but is not available yet.</p>
              <div className="how-example" aria-label="Example preference preview">Example preview: 09:00–17:00 · Europe/London</div>
            </article>
            <article className="how-info-card">
              <h3>Create a meeting. Compare fairer times.</h3>
              <p>Specify attendees and meeting duration, then review ranked suggestions and their fairness trade-offs when scheduling is connected.</p>
              <div className="how-example" aria-label="Example recommendation preview">Example preview: Recommended time · Lowest maximum inconvenience</div>
            </article>
            <article className="how-info-card">
              <h3>Your browser companion</h3>
              <p>A Chrome side panel is planned so you can access FairTime without leaving your current tab. The extension is not available to install yet.</p>
              <div className="how-example" aria-label="Browser companion status">Coming soon · Chrome extension</div>
            </article>
          </div>
          <button className="cta cta-primary how-bottom-cta" type="button" onClick={() => setPanel("calendar")}>Connect your calendar</button>
        </section>
      </main>

      <footer className="how-footer"><Link href="/">FairTime</Link><span>Meeting times that work for everyone.</span></footer>

      {panel && (
        <div className="dialog-backdrop" onClick={() => setPanel(null)}>
          <section className="info-dialog" role="dialog" aria-modal="true" aria-labelledby="how-dialog-title" onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" aria-label="Close dialog" onClick={() => setPanel(null)}>×</button>
            <h2 id="how-dialog-title">Connect your calendar</h2>
            <p>Google and Outlook calendar connection is not implemented yet. This button is ready to link to onboarding once the integration is built.</p>
          </section>
        </div>
      )}
    </div>
  );
}
