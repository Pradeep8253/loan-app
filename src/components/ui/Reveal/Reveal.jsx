"use client";
/**
 * Reveal — marks a block for the shared IntersectionObserver reveal.
 * Starts visible when JS has not applied the `.js` html class (progressive enhancement).
 */
export default function Reveal({ children, variant = "up", delay = 0, as = "div", className = "", ...rest }) {
  const Tag = as;
  return (
    <Tag
      className={`reveal ${className}`.trim()}
      data-reveal=""
      data-variant={variant}
      style={delay ? { "--delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
