"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    src: "/about-showroom-1.jpg",
    alt: "Sunnyland showroom shelves displaying curling, bowling and tabletop games",
  },
  {
    src: "/about-showroom-2.jpg",
    alt: "Sunnyland sample room with sports and games arranged on display shelving",
  },
];

export default function ShowroomSlideshow() {
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
  }, [hovered, paused]);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <div
      className="showroom-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Sunnyland showroom"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
      }}
    >
      <div className="showroom-slides" aria-live="polite">
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
      <div className="showroom-controls">
        <button type="button" onClick={showPrevious} aria-label="Previous showroom photo">←</button>
        <span aria-hidden="true">{activeSlide + 1} / {slides.length}</span>
        <button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? "Play showroom slideshow" : "Pause showroom slideshow"}>
          {paused ? "Play" : "Pause"}
        </button>
        <button type="button" onClick={showNext} aria-label="Next showroom photo">→</button>
      </div>
    </div>
  );
}
