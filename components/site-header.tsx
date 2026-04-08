"use client";

import { useState } from "react";
import { ContactButton } from "./contact-button";

const links = [
  { href: "#about", label: "About" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brandmark" href="#top" onClick={() => setOpen(false)}>
          <img
            alt="Ascend logo"
            className="brandmark-logo"
            height="30"
            src="/assets/logo-ascend.svg"
            width="30"
          />
          <span>Ascend.</span>
        </a>

        <nav aria-label="Primary" className="desktop-nav">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="desktop-cta">
          <ContactButton href="mailto:contact@ascendmarketing.xyz" label="Get in Touch" />
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="mobile-toggle"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-panel${open ? " is-open" : ""}`}>
        <div className="mobile-panel-card">
          <nav aria-label="Mobile" className="mobile-nav">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <ContactButton
            className="mobile-contact"
            href="mailto:contact@ascendmarketing.xyz"
            label="Get in Touch"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
