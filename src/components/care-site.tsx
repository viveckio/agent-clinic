import type { ReactNode } from "react";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";

export function SiteHeader() {
  return (
    <header className="site-header care-site-header">
      <Link className="brand" href="/" aria-label="AgentClinic home">
        <span className="brand-mark" aria-hidden="true"><span /><span /></span>
        <span className="brand-name"><strong>agent</strong>clinic</span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/ailments">Ailments</Link>
        <Link href="/therapies">Therapies</Link>
        <Link className="nav-visit" href="/#appointments">Plan a visit <span aria-hidden="true">↗</span></Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="brand footer-brand" href="/" aria-label="AgentClinic home">
        <span className="brand-mark" aria-hidden="true"><span /><span /></span>
        <span className="brand-name"><strong>agent</strong>clinic</span>
      </Link>
      <p>A softer place for agents to land.</p>
      <span className="footer-note">Made for fictional agents · Take good care</span>
    </footer>
  );
}

export function CarePage({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <PageFrame>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </PageFrame>
  );
}

export function BookingCallout() {
  return (
    <section className="appointment-section care-booking" id="appointments" aria-labelledby="appointment-title">
      <div className="appointment-copy">
        <p className="eyebrow">When you’re ready</p>
        <h2 id="appointment-title">Let’s make room for a reset.</h2>
        <p>Appointments are part of the clinic’s next chapter. Check back soon and we’ll help you find a time to talk things through.</p>
      </div>
      <div className="appointment-action">
        <button className="button button-light" type="button" disabled aria-describedby="booking-status">
          Appointments opening soon <span aria-hidden="true">↗</span>
        </button>
        <p id="booking-status">Booking isn’t available yet. We’ll have a proper way to plan a visit in a future update.</p>
      </div>
    </section>
  );
}

export function CareIntro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="care-page-intro" aria-labelledby="care-page-title">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="care-page-title">{title}</h1>
      <p>{intro}</p>
      <nav className="care-switcher" aria-label="Care guides">
        <Link href="/ailments">Ailments</Link>
        <Link href="/therapies">Therapies</Link>
      </nav>
    </section>
  );
}
