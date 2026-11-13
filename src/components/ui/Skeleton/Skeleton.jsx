/**
 * Skeleton — solid pulsing blocks (no gradients) for loading states.
 */
import "./Skeleton.css";

export function SkeletonBlock({ h = 16, w = "100%", r = 8, className = "" }) {
  const style = { "--skel-h": typeof h === "number" ? `${h}px` : h, "--skel-w": typeof w === "number" ? `${w}px` : w, "--skel-r": typeof r === "number" ? `${r}px` : r };
  return <span className={`skel ${className}`.trim()} style={style} aria-hidden="true" />;
}

export function SkeletonCard() {
  return (
    <div className="skel-card">
      <SkeletonBlock h={120} r={14} />
      <SkeletonBlock h={20} w="70%" />
      <SkeletonBlock h={14} w="100%" />
      <SkeletonBlock h={14} w="84%" />
      <SkeletonBlock h={44} w="48%" r={999} />
    </div>
  );
}

export default function Skeleton({ rows = 3 }) {
  return (
    <div className="skel-stack" role="status" aria-live="polite">
      <span className="sr-only">Loading content</span>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBlock key={i} h={i === 0 ? 32 : 16} w={i === 0 ? "60%" : "100%"} />
      ))}
    </div>
  );
}
