"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const characters = [
  { id: "pink", label: "Pink character", image: "/pink.girl.png" },
  { id: "orange", label: "Angry boy character", image: "/angry.boy.png" },
  { id: "green", label: "Green boy character", image: "/green.boy.png" },
] as const;

export default function CharacterPage() {
  const [selected, setSelected] = useState("pink");
  const [notice, setNotice] = useState("");
  function choose(id: string) {
    setSelected(id);
    setNotice("Preview selected. Character syncing with the browser extension is not available yet.");
  }
  const current = characters.find((character) => character.id === selected) ?? characters[0];
  return (
    <div className="character-page">
      <header className="site-header">
        <Link href="/" className="wordmark">FairTime</Link>
        <Link href="/" className="header-mark"><Image src="/fairtime-logo.png" alt="FairTime" width={64} height={38} /></Link>
        <nav className="site-nav">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/login">Log out</Link>
        </nav>
      </header>
      <main className="character-main">
        <Link className="character-back" href="/dashboard">← Go back</Link>
        <h1>03 - Personalise your avatar</h1>
        <div className="character-layout">
          <div className="character-preview" aria-label={current.label + " temporary illustration"}>
            <Image src={current.image} alt={current.label} width={650} height={650} unoptimized className="character-preview-image" />
          </div>
          <section className="character-picker" aria-label="Character selection">
            <h2>Select your character.</h2>
            <div className="character-options">
              {characters.map((character) => (
                <button key={character.id} type="button" className={"character-option" + (selected === character.id ? " selected" : "")} onClick={() => choose(character.id)} aria-label={"Select " + character.label} aria-pressed={selected === character.id}>
                  <Image src={character.image} alt={character.label} width={160} height={160} unoptimized className="character-option-image" />
                </button>
              ))}
              {[1, 2, 3].map((number) => (
                <div key={number} className="character-option locked" aria-label="Locked character" title="Coming soon"><Image src="/lock.png" alt="" width={160} height={160} unoptimized className="character-option-image" /></div>
              ))}
            </div>
          </section>
        </div>
        {notice && <p className="character-notice" role="status">{notice}</p>}
        <p className="character-tagline">Your calendar knows when you&apos;re free. FairTime knows what&apos;s fair.</p>
      </main>
    </div>
  );
}
