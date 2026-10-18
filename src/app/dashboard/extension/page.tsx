import Image from "next/image";
import Link from "next/link";

export default function ExtensionPage() {
  return (
    <div className="extension-page">
      <header className="site-header">
        <Link href="/" className="wordmark">FairTime</Link>
        <Link href="/" className="header-mark"><Image src="/fairtime-logo.png" alt="FairTime" width={64} height={38} /></Link>
        <nav className="site-nav">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/login">Log out</Link>
        </nav>
      </header>
      <main className="extension-main">
        <Link href="/dashboard" className="extension-back">← Go back</Link>
        <h1>01 - Download the FairTime extension</h1>
        <p className="extension-lead">Bring FairTime into your browser and find meeting times that work better for everyone, without constantly switching between tabs or calendars.</p>
        <div className="extension-centre">
          <a href="/fairtime-extension.zip" download="fairtime-extension.zip" className="extension-download">Download the FairTime extension</a>
          <div className="extension-video">Demo Video</div>
          <div className="extension-update-row">
            <strong>Already installed?</strong>
            <button type="button" className="extension-update" disabled title="Update checking is not available yet">Check for updates</button>
          </div>
        </div>
        <p className="extension-tagline">Your calendar knows when you&apos;re free. FairTime knows what&apos;s fair.</p>
      </main>
    </div>
  );
}
