"use client";
/**
 * Carousel — ONE primitive for every snap carousel. A horizontal snap track with a
 * next-card peek below 768px, dots, and a plain grid on desktop when `grid` is passed.
 */
import { useRef } from "react";
import useCarouselIndex from "@/hooks/useCarouselIndex";
import "./Carousel.css";

export default function Carousel({ children, count, label = "Cards", desktopColumns = 3 }) {
  const trackRef = useRef(null);
  const [index, goTo] = useCarouselIndex(trackRef, count);
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={`carousel carousel--cols-${desktopColumns}`}>
      <div className="carousel__viewport">
        <div className="carousel__track" ref={trackRef} role="group" aria-label={label}>
          {items.map((child, i) => (
            <div className="carousel__item" data-carousel-item="" key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="carousel__dots" role="tablist" aria-label={`${label} pagination`}>
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={index === i}
            aria-label={`Go to card ${i + 1}`}
            className={`carousel__dot ${index === i ? "is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
