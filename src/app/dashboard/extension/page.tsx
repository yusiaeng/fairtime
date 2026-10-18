import Link from "next/link";
export default function ExtensionPage() {
 return <main className="extension-page">
 <nav><Link href="/dashboard">← Go back</Link></nav>
 <h1>01 - Download the FairTime extension</h1>
 <p>Bring FairTime into your browser and find meeting times that work better for everyone, without constantly switching between tabs or calendars.</p>
 <button disabled>Download the FairTime extension</button>
 <div>Demo Video</div>
 <p>Already installed? <button disabled>Check for updates</button></p>
 <footer>Your calendar knows when you're free. FairTime knows what's fair.</footer>
 </main>;
}