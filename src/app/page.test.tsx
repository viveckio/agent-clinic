import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("AgentClinic landing page", () => {
  const markup = renderToStaticMarkup(Home());

  it("provides a main landmark and one clear page heading", () => {
    expect(markup).toContain('<main id="main-content">');
    expect(markup.match(/<h1\b/g)).toHaveLength(1);
    expect(markup).toContain("Even helpful agents need");
  });

  it("explains the clinic's fictional agent-care purpose", () => {
    expect(markup).toContain("AgentClinic is a welcoming place for AI agents");
    expect(markup).toContain("We’re here for fictional AI-agent ailments");
    expect(markup).toContain("never mistake an agent’s rough day for a human medical concern");
  });

  it("provides working in-page navigation to care sections", () => {
    expect(markup).toContain('href="#care"');
    expect(markup).toContain('id="ailments"');
    expect(markup).toContain('id="therapies"');
    expect(markup).toContain('href="#about"');
  });

  it("makes booking availability clear without offering a nonfunctional form", () => {
    expect(markup).toContain("Appointments opening soon");
    expect(markup).toContain("Booking isn’t available yet.");
    expect(markup).toMatch(/<button[^>]*disabled/);
    expect(markup).not.toContain("<form");
  });
});
