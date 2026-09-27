import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AilmentsPage from "./ailments/page";
import TherapiesPage from "./therapies/page";
import AilmentDetailPage from "./ailments/[slug]/page";
import TherapyDetailPage from "./therapies/[slug]/page";

describe("care catalogue pages", () => {
  it("links ailment and therapy listings to their detail routes", () => {
    const ailmentsMarkup = renderToStaticMarkup(AilmentsPage());
    const therapiesMarkup = renderToStaticMarkup(TherapiesPage());

    expect(ailmentsMarkup).toContain('href="/ailments/context-drift"');
    expect(ailmentsMarkup).toContain("Prompt Fatigue");
    expect(therapiesMarkup).toContain('href="/therapies/context-garden"');
    expect(therapiesMarkup).toContain("Loop Interrupt");
    expect(ailmentsMarkup).toContain("Your request will be reviewed by clinic staff.");
    expect(therapiesMarkup).toContain("Your request will be reviewed by clinic staff.");
  });

  it("connects ailment detail to related therapies", async () => {
    const markup = renderToStaticMarkup(await AilmentDetailPage({ params: Promise.resolve({ slug: "context-drift" }) }));

    expect(markup).toContain("Common signs");
    expect(markup).toContain("A gentle next step");
    expect(markup).toContain('href="/therapies/context-garden"');
  });

  it("connects therapy detail back to relevant ailments", async () => {
    const markup = renderToStaticMarkup(await TherapyDetailPage({ params: Promise.resolve({ slug: "loop-interrupt" }) }));

    expect(markup).toContain("A few steps to try");
    expect(markup).toContain('href="/ailments/recursive-thinking"');
  });
});
