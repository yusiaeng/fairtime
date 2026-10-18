"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type FAQItem = { question: string; answer: string };
const sections: { title: string; items: FAQItem[] }[] = [
  {
    title: "Getting started",
    items: [
      { question: "What is FairTime?", answer: "FairTime is a group meeting scheduler being built to recommend times that consider people's local time, preferred hours and previous inconvenience." },
      { question: "How is it different from a regular calendar?", answer: "A calendar shows commitments. FairTime's fairness engine ranks possible meeting slots by how inconvenient they are for the group, instead of simply picking the earliest." },
      { question: "What does “fair” mean?", answer: "Among feasible slots, FairTime's algorithm prioritises the lowest maximum accumulated inconvenience across participants, then the lowest total, then the earliest time." },
      { question: "How do I get started?", answer: "The intended flow is to sign in, connect a calendar, set your preferences and create a group meeting. Sign-in and live calendar onboarding are still being developed." },
    ],
  },
  {
    title: "Calendars and privacy",
    items: [
      { question: "Which calendars can I connect?", answer: "Google Calendar and Outlook are planned. Live calendar connection is not yet available in this version." },
      { question: "What calendar information does FairTime access?", answer: "The planned integration uses availability to find feasible meeting times. Exact permissions, storage and privacy behaviour need to be reviewed once calendar authorisation is implemented." },
      { question: "Does FairTime create the meeting automatically?", answer: "Not yet. Calendar event creation is planned but is not connected in the current website." },
    ],
  },
  {
    title: "Scheduling and your companion",
    items: [
      { question: "Do I need the browser extension?", answer: "No extension is required to view this website. A Chrome side-panel companion is planned, but it isn't available to install yet." },
      { question: "Can I customise my companion?", answer: "Companion customisation is planned and hasn't been implemented yet." },
      { question: "What happens if no time suits everyone?", answer: "FairTime's ranking engine needs feasible meeting slots to make recommendations. If there are none, a new time window or different constraints will need to be tried; the full scheduling flow is still being built." },
    ],
  },
];

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="faq-page">
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="FairTime home">FairTime</Link>
        <Link href="/" className="header-mark" aria-label="FairTime home"><Image src="/fairtime-logo.png" alt="" width={64} height={38} /></Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/faq" aria-current="page">FAQ</Link>
          <button type="button" onClick={() => setLoginOpen(true)}>Log in</button>
        </nav>
      </header>

      <main className="faq-main">
        <h1>Got questions?<br />We&apos;ve got answers.</h1>
        <p className="faq-intro">Here are some of the most commonly asked questions about FairTime. Can&apos;t find what you&apos;re looking for? Contact us at <span className="faq-email">support@fairtime.app</span>.</p>
        <div className="faq-showcase" aria-label="Frequently asked questions">
          {[
            sections[0].items[0],
            sections[0].items[2],
            sections[2].items[2],
            sections[1].items[0],
            sections[0].items[1],
            sections[0].items[3],
            sections[1].items[1],
            sections[1].items[2],
            sections[2].items[0],
            sections[2].items[1],
          ].map((item, index) => {
            const featured = index === 0;
            const expanded = featured || openQuestion === item.question;
            return (
              <article className={`faq-item ${expanded ? "is-open" : ""} ${index === 0 ? "faq-featured" : ""}`} key={item.question}>
                {featured ? (
                  <h2 className="faq-featured-heading">{item.question}</h2>
                ) : (
                  <h2>
                    <button type="button" aria-expanded={expanded} onClick={() => setOpenQuestion(expanded ? null : item.question)}>
                      <span>{item.question}</span>
                      <span className="faq-symbol" aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </button>
                  </h2>
                )}
                {expanded && <p>{item.answer}</p>}
              </article>
            );
          })}
        </div>
        <p className="faq-tagline">Your calendar knows when you&apos;re free. FairTime knows what&apos;s fair.</p>
      </main>

      {loginOpen && (
        <div className="dialog-backdrop" onClick={() => setLoginOpen(false)}>
          <section className="info-dialog" role="dialog" aria-modal="true" aria-labelledby="faq-login-title" onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" type="button" aria-label="Close dialog" onClick={() => setLoginOpen(false)}>×</button>
            <h2 id="faq-login-title">Log in</h2>
            <p>Authentication is not connected yet. We’ll link this button to the real sign-in flow once it is ready.</p>
          </section>
        </div>
      )}
    </div>
  );
}
