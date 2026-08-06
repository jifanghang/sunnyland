"use client";

import { useRef } from "react";
import { curlingProducts } from "./data/curling";

export default function CurlingCarousel() {
  const track = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({
      left: direction * Math.min(element.clientWidth * 0.82, 620),
      behavior: "smooth",
    });
  }

  return (
    <section className="curling-section" aria-labelledby="curling-title">
      <div className="curling-heading">
        <div>
          <span className="kicker">Our signature collection</span>
          <h2 id="curling-title">Curling,<br /><em>anywhere.</em></h2>
        </div>
        <div className="curling-intro">
          <p>
            Sunnyland’s specialist range takes curling off the ice and into
            schools, clubs, homes and activity spaces for every age.
          </p>
          <div className="carousel-controls" aria-label="Curling carousel controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous curling products">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next curling products">→</button>
          </div>
        </div>
      </div>
      <div className="curling-track" ref={track} tabIndex={0} aria-label="Sunnyland curling products">
        {curlingProducts.map((product, index) => (
          <a className="curling-card" href="/products#curling-game" key={product.code}>
            <div className="curling-image">
              <img src={product.image} alt={product.title} />
              <span>{product.badge}</span>
              <b>{String(index + 1).padStart(2, "0")}</b>
            </div>
            <div className="curling-card-copy">
              <div><span>{product.code}</span><span>Curling game</span></div>
              <h3>{product.title}</h3>
              <p>{product.copy}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="curling-footer">
        <div className="carousel-hint"><span /> Drag or use the arrows to explore the range</div>
        <a className="curling-more-link" href="/products#curling-game">
          View all curling products <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
