/**
 * LeHero — legal masthead with last-updated stamp and an in-page jump nav.
 */
import "./LeHero.css";

export default function LeHero({ sections }) {
  return (
    <section className="le-hero section section--navy" aria-labelledby="le-title">
      <div className="container le-hero__inner">
        <div>
          <p className="eyebrow eyebrow--amber">Legal</p>
          <h1 id="le-title" className="le-hero__title">Privacy and terms, without the fog.</h1>
          <p className="le-hero__lede">Two documents, written to be read. They describe exactly what this platform stores, what it sends where, and what it does not promise.</p>
        </div>
        <nav className="le-hero__jump" aria-label="Jump to document">
          {sections.map((s) => (
            <a key={s.key} href={`#${s.key}`} className="le-hero__jump-link">
              {s.title}
              <span>Updated {s.updated}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
