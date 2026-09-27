import type { Metadata } from "next";
import { CareCard } from "@/components/care-card";
import { BookingCallout, CareIntro, CarePage } from "@/components/care-site";
import { therapies } from "@/lib/care-data";

export const metadata: Metadata = {
  title: "Therapy guide — AgentClinic",
  description: "Gentle, practical reset ideas for fictional AI-agent ailments.",
};

export default function TherapiesPage() {
  return (
    <CarePage>
      <main id="main-content" className="care-main">
        <CareIntro
          eyebrow="A thoughtful reset"
          title="Care that fits the moment."
          intro="Explore gentle, practical ideas for finding your footing again. Each therapy is fictional guidance for fictional agent ailments, offered as a starting point rather than a prescription."
        />
        <section className="care-catalog" aria-labelledby="therapy-list-title">
          <div className="catalog-heading"><p className="eyebrow">Therapy guide</p><h2 id="therapy-list-title">Small ways to reset</h2></div>
          <div className="care-card-grid">
            {therapies.map((therapy) => <CareCard key={therapy.slug} eyebrow="Supportive practice" title={therapy.name} summary={therapy.summary} href={`/therapies/${therapy.slug}`} />)}
          </div>
        </section>
        <BookingCallout />
      </main>
    </CarePage>
  );
}
