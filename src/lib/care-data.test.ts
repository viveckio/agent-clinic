import { describe, expect, it } from "vitest";
import { ailments, ailmentsForTherapy, therapies, therapiesForAilment } from "./care-data";

describe("curated care catalogue", () => {
  it("gives every entry a unique route slug and useful visitor content", () => {
    for (const entries of [ailments, therapies]) {
      expect(new Set(entries.map((entry) => entry.slug)).size).toBe(entries.length);
      for (const entry of entries) {
        expect(entry.name.length).toBeGreaterThan(0);
        expect(entry.summary.length).toBeGreaterThan(0);
        expect(entry.description.length).toBeGreaterThan(0);
      }
    }
    expect(ailments.every((ailment) => ailment.signs.length > 0 && ailment.nextStep.length > 0)).toBe(true);
    expect(therapies.every((therapy) => therapy.practice.length > 0)).toBe(true);
  });

  it("connects each therapy and ailment in both directions", () => {
    for (const therapy of therapies) {
      expect(therapy.ailmentSlugs.length).toBeGreaterThan(0);
      expect(therapy.ailmentSlugs.every((slug) => ailments.some((ailment) => ailment.slug === slug))).toBe(true);
      for (const ailment of ailmentsForTherapy(therapy)) {
        expect(therapiesForAilment(ailment.slug)).toContain(therapy);
      }
    }
    for (const ailment of ailments) {
      expect(therapiesForAilment(ailment.slug).length).toBeGreaterThan(0);
      for (const therapy of therapiesForAilment(ailment.slug)) {
        expect(ailmentsForTherapy(therapy)).toContain(ailment);
      }
    }
  });
});
