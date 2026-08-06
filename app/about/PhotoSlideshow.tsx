"use client";

import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

export default function PhotoSlideshow({
  slides,
  label,
}: {
  slides: readonly Slide[];
  label: string;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || hovered || prefersReducedMotion) return;

    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [hovered, paused, slides.length]);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <div
      className="photo-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
      }}
    >
      <div className="photo-slides" aria-live="polite">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            className={index === activeSlide ? "is-active" : ""}
            src={slide.src}
            alt={index === activeSlide ? slide.alt : ""}
            aria-hidden={index !== activeSlide}
          />
        ))}
      </div>
      <div className="photo-controls">
        <button type="button" onClick={showPrevious} aria-label={`Previous ${label.toLowerCase()} photo`}>←</button>
        <span aria-hidden="true">{activeSlide + 1} / {slides.length}</span>
        <button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? `Play ${label.toLowerCase()} slideshow` : `Pause ${label.toLowerCase()} slideshow`}>
          {paused ? "Play" : "Pause"}
        </button>
        <button type="button" onClick={showNext} aria-label={`Next ${label.toLowerCase()} photo`}>→</button>
      </div>
    </div>
  );
}
