import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("application placeholder page", () => {
  const markup = renderToStaticMarkup(Home());

  it("provides a main landmark and a single page heading", () => {
    expect(markup).toContain('<main class="page-shell">');
    expect(markup.match(/<h1\b/g)).toHaveLength(1);
    expect(markup).toContain("A new space is taking shape.");
  });

  it("explains that the page is a neutral placeholder", () => {
    expect(markup).toContain("Application workspace");
    expect(markup).toContain(
      "This page is a neutral placeholder while the application foundation is being established.",
    );
  });

  it("does not expose unfinished navigation or actions", () => {
    expect(markup).not.toMatch(/<(?:a|button)\b/);
  });
});
