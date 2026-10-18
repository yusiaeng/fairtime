import Image from "next/image";
import Link from "next/link";

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <header className="site-header">
        <Link href="/" className="wordmark">FairTime</Link>
        <Link href="/" className="header-mark"><Image src="/fairtime-logo.png" alt="FairTime" width={64} height={38} /></Link>
        <nav className="site-nav">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/login">Log out</Link>
        </nav>
      </header>
      <main className="calendar-main">
        <Link href="/dashboard" className="calendar-back">← Go back</Link>
        <h1>02 - Calendar platform</h1>
        <p className="calendar-intro">FairTime works with your existing calendar, so there&apos;s no need to start from scratch.</p>
        <p className="calendar-description">Connect your calendar to let FairTime check your availability and recommend meeting times that consider everyone&apos;s commitments and preferences.</p>
        <section className="calendar-connect" aria-labelledby="calendar-connect-title">
          <h2 id="calendar-connect-title">Connect your calendar</h2>
          <p>One simple connection. Fairer schedule.</p>
          <div className="calendar-connect-content">
            <div className="calendar-provider-area">
              <button className="calendar-provider" disabled title="Google Calendar integration is not yet available">Connect with Google Calendar</button>
              <button className="calendar-provider" disabled title="Microsoft Outlook integration is not yet available">Connect with Microsoft Outlook</button>
              <p className="calendar-unavailable" role="status">Calendar connections are not available yet. No calendar is connected.</p>
            </div>
            <div className="calendar-illustration" aria-hidden="true">🗓️</div>
          </div>
        </section>
        <p className="calendar-tagline">Your calendar knows when you&apos;re free. FairTime knows what&apos;s fair.</p>
      </main>
    </div>
  );
}
