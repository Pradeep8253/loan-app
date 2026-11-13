/**
 * IconTile — solid icon tile used on cards and feature rows.
 */
import "./IconTile.css";

export default function IconTile({ children, tone = "navy", size = "md" }) {
  return <span className={`icon-tile icon-tile--${tone} icon-tile--${size}`} aria-hidden="true">{children}</span>;
}
