/**
 * Route template — the 220ms fade + 8px rise page transition, CSS-only.
 */
import "./template.css";

export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}
