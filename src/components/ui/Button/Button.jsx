/**
 * Button — the single action primitive. Variants, sizes, loading and press states.
 * Renders an <a>, <button> or Next <Link> depending on props.
 */
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon/WhatsAppIcon";
import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  type = "button",
  icon,
  rightIcon = true,
  loading = false,
  disabled = false,
  block = false,
  className = "",
  ...rest
}) {
  const cls = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    block ? "btn--block" : "",
    loading ? "is-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedIcon = icon !== undefined ? icon : variant === "whatsapp" ? <WhatsAppIcon size={size === "lg" ? 20 : 18} /> : null;

  const content = (
    <>
      {loading ? <Loader2 aria-hidden="true" size={18} className="btn__spinner" /> : resolvedIcon ? <span className="btn__icon">{resolvedIcon}</span> : null}
      <span className="btn__label">{children}</span>
      {rightIcon && !loading ? <ArrowRight aria-hidden="true" size={18} className="btn__arrow" /> : null}
    </>
  );

  if (href) {
    const isExternal = external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a className={cls} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-busy={loading || undefined} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} aria-busy={loading || undefined} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
