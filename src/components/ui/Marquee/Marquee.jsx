/**
 * Marquee — infinite solid-colour ticker that pauses on hover/focus and touch.
 */
import "./Marquee.css";

export default function Marquee({ items, tone = "navy", label = "Trust signals" }) {
  const loop = [...items, ...items];
  return (
    <div className={`marquee marquee--${tone}`} aria-label={label}>
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`} aria-hidden={i >= items.length ? "true" : undefined}>
            <span className="marquee__dot" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
