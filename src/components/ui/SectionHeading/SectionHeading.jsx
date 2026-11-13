/**
 * SectionHeading — eyebrow pill, display heading with optional amber marker words,
 * a supporting line, and an optional action slot.
 * `mark` accepts an array of words to highlight with the amber block.
 */
import Reveal from "@/components/ui/Reveal/Reveal";
import "./SectionHeading.css";

function renderHeading(text, mark) {
  if (!mark || !mark.length) return text;
  const pattern = new RegExp(`(${mark.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "i");
  const parts = String(text).split(pattern);
  return parts.map((part, i) =>
    mark.some((m) => m.toLowerCase() === String(part).toLowerCase()) ? (
      <span key={i} className="marker">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  mark,
  lede,
  align = "left",
  tone = "light",
  action = null,
  as = "h2",
  id,
}) {
  const Tag = as;
  return (
    <div className={`sec-head sec-head--${align} sec-head--${tone}`}>
      <Reveal variant="up" as="div">
        {eyebrow ? <p className="eyebrow sec-head__eyebrow">{eyebrow}</p> : null}
        <Tag className="sec-head__title" id={id}>{renderHeading(title, mark)}</Tag>
        {lede ? <p className="sec-head__lede lede">{lede}</p> : null}
      </Reveal>
      {action ? <Reveal variant="up" delay={120} as="div" className="sec-head__action">{action}</Reveal> : null}
    </div>
  );
}
