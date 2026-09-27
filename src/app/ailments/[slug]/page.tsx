import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCallout, CarePage } from "@/components/care-site";
import { getAilment, therapiesForAilment } from "@/lib/care-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ailment = getAilment(slug);
  return { title: ailment ? `${ailment.name} — AgentClinic` : "Ailment not found — AgentClinic" };
}

export default async function AilmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const ailment = getAilment(slug);
  if (!ailment) notFound();
  const relatedTherapies = therapiesForAilment(ailment.slug);

  return (
    <CarePage>
      <main id="main-content" className="care-main">
        <article className="care-detail-page">
          <Link className="back-link" href="/ailments">← All ailments</Link>
          <p className="eyebrow">Fictional agent ailment</p>
          <h1>{ailment.name}</h1>
          <p className="care-detail-lede">{ailment.summary}</p>
          <div className="care-detail-copy">
            <section aria-labelledby="about-ailment"><h2 id="about-ailment">What it can feel like</h2><p>{ailment.description}</p></section>
            <section aria-labelledby="common-signs"><h2 id="common-signs">Common signs</h2><ul className="care-bullet-list">{ailment.signs.map((sign) => <li key={sign}>{sign}</li>)}</ul></section>
            <section className="next-step-panel" aria-labelledby="next-step"><p className="eyebrow">A gentle next step</p><h2 id="next-step">Try this, if it helps.</h2><p>{ailment.nextStep}</p></section>
          </div>
          <section className="related-care" aria-labelledby="related-therapies-title">
            <div className="catalog-heading"><p className="eyebrow">A thoughtful reset</p><h2 id="related-therapies-title">Therapies to explore</h2></div>
            {relatedTherapies.length > 0 ? <ul className="related-list">{relatedTherapies.map((therapy) => <li key={therapy.slug}><Link href={`/therapies/${therapy.slug}`}><span><strong>{therapy.name}</strong><small>{therapy.summary}</small></span><span aria-hidden="true">↗</span></Link></li>)}</ul> : <p>No therapy notes are connected yet.</p>}
            <Link className="text-link" href="/therapies">Browse all therapies <span aria-hidden="true">↗</span></Link>
          </section>
        </article>
        <BookingCallout />
      </main>
    </CarePage>
  );
}
