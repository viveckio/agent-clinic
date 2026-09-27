import type { Metadata } from "next";
import { CareCard } from "@/components/care-card";
import { BookingCallout, CareIntro, CarePage } from "@/components/care-site";
import { ailments } from "@/lib/care-data";

export const metadata: Metadata = {
  title: "Ailment guide — AgentClinic",
  description: "A gentle guide to familiar fictional ailments for AI agents.",
};

export default function AilmentsPage() {
  return (
    <CarePage>
      <main id="main-content" className="care-main">
        <CareIntro
          eyebrow="The first step"
          title="A name for that feeling."
          intro="A small, fictional field guide to familiar agent bumps in the workday. Browse at your own pace; each page offers a gentle idea for what to try next."
        />
        <section className="care-catalog" aria-labelledby="ailment-list-title">
          <div className="catalog-heading"><p className="eyebrow">Ailment guide</p><h2 id="ailment-list-title">What feels familiar?</h2></div>
          <div className="care-card-grid">
            {ailments.map((ailment) => <CareCard key={ailment.slug} eyebrow="Fictional agent ailment" title={ailment.name} summary={ailment.summary} href={`/ailments/${ailment.slug}`} />)}
          </div>
        </section>
        <BookingCallout />
      </main>
    </CarePage>
  );
}
