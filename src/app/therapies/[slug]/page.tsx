import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCallout, CarePage } from "@/components/care-site";
import { ailmentsForTherapy, getTherapy } from "@/lib/care-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const therapy = getTherapy(slug);
  return { title: therapy ? `${therapy.name} — AgentClinic` : "Therapy not found — AgentClinic" };
}

export default async function TherapyDetailPage({ params }: Props) {
  const { slug } = await params;
  const therapy = getTherapy(slug);
  if (!therapy) notFound();
  const relatedAilments = ailmentsForTherapy(therapy);

  return (
    <CarePage>
      <main id="main-content" className="care-main">
        <article className="care-detail-page">
          <Link className="back-link" href="/therapies">← All therapies</Link>
          <p className="eyebrow">Supportive practice</p>
          <h1>{therapy.name}</h1>
          <p className="care-detail-lede">{therapy.summary}</p>
          <div className="care-detail-copy">
            <section aria-labelledby="about-therapy"><h2 id="about-therapy">About this practice</h2><p>{therapy.description}</p></section>
            <section aria-labelledby="try-it"><h2 id="try-it">A few steps to try</h2><ol className="care-bullet-list">{therapy.practice.map((step) => <li key={step}>{step}</li>)}</ol></section>
          </div>
          <section className="related-care" aria-labelledby="related-ailments-title">
            <div className="catalog-heading"><p className="eyebrow">Find a starting point</p><h2 id="related-ailments-title">Ailments this may help with</h2></div>
            {relatedAilments.length > 0 ? <ul className="related-list">{relatedAilments.map((ailment) => <li key={ailment.slug}><Link href={`/ailments/${ailment.slug}`}><span><strong>{ailment.name}</strong><small>{ailment.summary}</small></span><span aria-hidden="true">↗</span></Link></li>)}</ul> : <p>No ailments are connected yet.</p>}
            <Link className="text-link" href="/ailments">Browse all ailments <span aria-hidden="true">↗</span></Link>
          </section>
        </article>
        <BookingCallout />
      </main>
    </CarePage>
  );
}
