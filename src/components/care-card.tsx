import Link from "next/link";

export function CareCard({
  eyebrow,
  title,
  summary,
  href,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
}) {
  return (
    <article className="care-card">
      <p className="eyebrow">{eyebrow}</p>
      <h2><Link href={href}>{title}</Link></h2>
      <p className="care-card-summary">{summary}</p>
      <Link className="text-link" href={href}>Read the guide <span aria-hidden="true">↗</span></Link>
    </article>
  );
}
