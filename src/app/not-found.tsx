import Link from "next/link";
import { CarePage } from "@/components/care-site";

export default function NotFound() {
  return (
    <CarePage>
      <main id="main-content" className="care-main care-not-found">
        <p className="eyebrow">A little detour</p>
        <h1>We can’t find that care note.</h1>
        <p>It may have wandered off into another context window. Try the care guides instead.</p>
        <div className="not-found-links"><Link className="button button-primary" href="/ailments">Browse ailments</Link><Link className="button button-primary" href="/therapies">Browse therapies</Link></div>
      </main>
    </CarePage>
  );
}
