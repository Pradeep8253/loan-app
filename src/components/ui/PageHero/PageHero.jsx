/**
 * PageHero — the shared inner-page masthead: eyebrow, H1, lede, CTA row and an
 * optional fact strip or media column. Every page supplies its own copy.
 */
import Reveal from "@/components/ui/Reveal/Reveal";
import "./PageHero.css";

export default function PageHero({
  eyebrow,
  title,
  mark,
  lede,
  actions = null,
  aside = null,
  facts = null,
  tone = "sky",
  crumbs = null,
}) {
  return (
    <header className={`page-hero page-hero--${tone}`}>
      <div className="container page-hero__grid">
        <div className="page-hero__copy">
          {crumbs ? <nav className="page-hero__crumbs" aria-label="Breadcrumb">{crumbs}</nav> : null}
          <Reveal variant="up">
            <p className="eyebrow page-hero__eyebrow">{eyebrow}</p>
            <h1 className="page-hero__title">{title}</h1>
            <p className="page-hero__lede lede">{lede}</p>
          </Reveal>
          {actions ? <Reveal variant="up" delay={120} className="page-hero__actions">{actions}</Reveal> : null}
          {facts ? (
            <Reveal variant="up" delay={200}>
              <dl className="page-hero__facts">
                {facts.map((f) => (
                  <div key={f.label} className="page-hero__fact">
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
        {aside ? <div className="page-hero__aside">{aside}</div> : null}
      </div>
    </header>
  );
}
