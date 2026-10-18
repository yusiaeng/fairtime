import Link from "next/link";

export default function DashboardPage() {
  return (
    <main style={{ minHeight: "100svh", background: "#f9ad65", color: "#642c45", padding: "36px clamp(20px, 6vw, 90px)", fontFamily: "Georgia, serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <Link href="/" style={{ color: "inherit", fontSize: 25, fontWeight: "bold" }}>FairTime</Link>
        <Link href="/login" style={{ color: "inherit" }}>Back to login</Link>
      </nav>
      <section style={{ maxWidth: 760, margin: "12vh auto 0", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 16 }}>Welcome to FairTime</h1>
        <p style={{ fontSize: 22, lineHeight: 1.5 }}>You're viewing the dashboard preview. Account sign-in and personal meeting data aren't connected yet.</p>
        <p style={{ fontSize: 18 }}>Your meetings, groups and fairness history will appear here once the dashboard is built.</p>
      </section>
    </main>
  );
}
