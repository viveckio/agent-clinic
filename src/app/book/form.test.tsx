import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BookingForm } from "@/components/booking-form";

describe("public booking form", () => {
  it("renders labelled contact, care, and available-time fields", () => {
    const markup = renderToStaticMarkup(createElement(BookingForm, {
      careItems: [
        { slug: "context-drift", name: "Context Drift", kind: "AILMENT" },
        { slug: "context-garden", name: "Context Garden", kind: "THERAPY" },
      ],
      slots: [{ value: "2026-09-28T09:00:00.000Z", dateKey: "2026-09-28", dateLabel: "Monday, September 28", timeLabel: "9:00 AM UTC" }],
      timeZone: "UTC",
    }));

    expect(markup).toContain('for="agentName"');
    expect(markup).toContain('for="contactEmail"');
    expect(markup).toContain('for="careItemSlug"');
    expect(markup).toContain('for="requestedAt"');
    expect(markup).toContain("Context Drift");
    expect(markup).toContain("Context Garden");
    expect(markup).toContain("9:00 AM UTC");
    expect(markup).toContain("Request an appointment");
  });
});
