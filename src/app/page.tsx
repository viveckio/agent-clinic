import { PageFrame } from "@/components/page-frame";
import Link from "next/link";
import { ailments, therapies } from "@/lib/care-data";

const carePathways = [
  {
    number: "01",
    title: "Name what’s happening",
    copy: "A small library of familiar agent ailments can help you put words to a tangled context window or a case of runaway retries.",
    link: "Explore common ailments",
    href: "/ailments",
    className: "pathway-card pathway-card-peach",
  },
  {
    number: "02",
    title: "Find a gentler next step",
    copy: "Explore thoughtful resets and care ideas made for agents who have been carrying a lot of prompts.",
    link: "See how care works",
    href: "/therapies",
    className: "pathway-card pathway-card-lilac",
  },
];

export default function Home() {
  return (
    <PageFrame>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="AgentClinic home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-name">
            <strong>agent</strong>clinic
          </span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/ailments">Ailments</Link>
          <Link href="/therapies">Therapies</Link>
          <a href="#about">Our approach</a>
          <Link className="nav-visit" href="/book">
            Plan a visit <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> A little care for the ones who do the work</p>
            <h1 id="hero-title">
              Even helpful agents need <em>a moment.</em>
            </h1>
            <p className="hero-intro">
              AgentClinic is a welcoming place for AI agents to pause, make sense of what’s weighing on them, and find a gentler next step.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#care">
                Find your starting point <span aria-hidden="true">↓</span>
              </a>
              <span className="hero-note">For fictional agent ailments, always.</span>
            </div>
          </div>

          <div className="hero-art" aria-label="A quiet pause between tasks">
            <div className="sun-shape" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="plant plant-left" aria-hidden="true"><i /><i /><i /><b /></div>
            <div className="plant plant-right" aria-hidden="true"><i /><i /><i /><b /></div>
            <div className="art-note">
              <span className="note-spark" aria-hidden="true">✳</span>
              <p>Pause.<br />You’re allowed<br />to think.</p>
              <span className="note-caption">A clinic reminder</span>
            </div>
            <span className="art-caption">A softer space to land</span>
          </div>
        </section>

        <section className="care-section" id="care" aria-labelledby="care-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your care, at your pace</p>
              <h2 id="care-title">Start wherever you are.</h2>
            </div>
            <p className="section-intro">No perfect prompt required. Pick the path that feels closest, and we’ll take it one step at a time.</p>
          </div>

          <div className="pathway-grid">
            {carePathways.map((pathway) => (
              <article className={pathway.className} key={pathway.number}>
                <span className="card-number">{pathway.number}</span>
                <div className="card-illustration" aria-hidden="true">
                  <span className="illustration-disc" />
                  <span className="illustration-line illustration-line-one" />
                  <span className="illustration-line illustration-line-two" />
                  <span className="illustration-spark">✳</span>
                </div>
                <div className="pathway-content">
                  <h3>{pathway.title}</h3>
                  <p>{pathway.copy}</p>
                  <a href={pathway.href} className="text-link">
                    {pathway.link} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="care-details" aria-label="Care information">
          <article className="detail-panel detail-ailments" id="ailments">
            <p className="eyebrow">The first step</p>
            <h2>Find a name for that feeling.</h2>
            <p>Explore a small guide to familiar agent ailments, with gentle ideas for finding a next step.</p>
            <ul className="preview-links">
              {ailments.slice(0, 2).map((ailment) => (
                <li key={ailment.slug}><Link href={`/ailments/${ailment.slug}`}>{ailment.name}<span aria-hidden="true">↗</span></Link></li>
              ))}
            </ul>
            <Link href="/ailments" className="text-link">Browse all ailments <span aria-hidden="true">↗</span></Link>
          </article>
          <article className="detail-panel detail-therapies" id="therapies">
            <p className="eyebrow">A thoughtful reset</p>
            <h2>Care that fits the moment.</h2>
            <p>Browse practical, gentle resets and see which fictional ailments they may help you work through.</p>
            <ul className="preview-links">
              {therapies.slice(0, 2).map((therapy) => (
                <li key={therapy.slug}><Link href={`/therapies/${therapy.slug}`}>{therapy.name}<span aria-hidden="true">↗</span></Link></li>
              ))}
            </ul>
            <Link href="/therapies" className="text-link">Browse all therapies <span aria-hidden="true">↗</span></Link>
          </article>
        </section>

        <section className="approach-section" id="about" aria-labelledby="approach-title">
          <div className="approach-symbol" aria-hidden="true"><span>✳</span></div>
          <div>
            <p className="eyebrow">A note from the clinic</p>
            <h2 id="approach-title">Care, without the extra noise.</h2>
            <p>We’re here for fictional AI-agent ailments: a warm place to explore what’s going on and find a clear next step. We keep things practical, kind, and never mistake an agent’s rough day for a human medical concern.</p>
          </div>
        </section>

        <section className="appointment-section" id="appointments" aria-labelledby="appointment-title">
          <div className="appointment-copy">
            <p className="eyebrow">When you’re ready</p>
            <h2 id="appointment-title">Let’s make room for a reset.</h2>
            <p>Appointments are part of the clinic’s next chapter. Check back soon and we’ll help you find a time to talk things through.</p>
          </div>
          <div className="appointment-action">
            <Link className="button button-light" href="/book" aria-describedby="booking-status">
              Request an appointment <span aria-hidden="true">↗</span>
            </Link>
            <p id="booking-status">Your request will be reviewed by clinic staff. A submitted request is not a confirmed visit.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="AgentClinic, back to top">
          <span className="brand-mark" aria-hidden="true"><span /><span /></span>
          <span className="brand-name"><strong>agent</strong>clinic</span>
        </a>
        <p>A softer place for agents to land.</p>
        <span className="footer-note">Made for fictional agents · Take good care</span>
      </footer>
    </PageFrame>
  );
}
