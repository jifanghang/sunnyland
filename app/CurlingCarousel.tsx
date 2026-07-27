"use client";

import { useRef } from "react";

const curlingProducts = [
  {
    code: "SSC003B",
    title: "Curling & shuffleboard 2-in-1",
    copy: "Two target sports, one full-length playing surface and a set made for all-season play.",
    image: "/curling-2in1.jpg",
    badge: "Signature set",
  },
  {
    code: "SSC001",
    title: "Portable floor curling",
    copy: "Smooth-rolling stones bring the tactics and teamwork of curling to any flat indoor floor.",
    image: "/curling-floor.jpg",
    badge: "Team favourite",
  },
  {
    code: "SSC010",
    title: "Air-cushioned curling stones",
    copy: "A compact stone set engineered for low-friction play in schools, clubs and family spaces.",
    image: "/curling-air.jpg",
    badge: "Indoor play",
  },
  {
    code: "SSC007",
    title: "Curling, shuffleboard & bowling",
    copy: "Three familiar games combine in a flexible set designed to keep every group involved.",
    image: "/curling-3in1.jpg",
    badge: "3 games in 1",
  },
  {
    code: "SSC003A",
    title: "Shuffleboard & curling set",
    copy: "A simple, portable two-game format with clear scoring zones and satisfying stone action.",
    image: "/curling-shuffle.jpg",
    badge: "2 games in 1",
  },
  {
    code: "SSC002",
    title: "Tabletop curling",
    copy: "The strategy of the rink in an easy-to-pack tabletop game for adults, children and families.",
    image: "/curling-tabletop.jpg",
    badge: "Tabletop",
  },
];

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
            schools, clubs, homes and activity spaces—with formats for every age.
          </p>
          <div className="carousel-controls" aria-label="Curling carousel controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous curling products">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next curling products">→</button>
          </div>
        </div>
      </div>
      <div className="curling-track" ref={track} tabIndex={0} aria-label="Sunnyland curling products">
        {curlingProducts.map((product, index) => (
          <article className="curling-card" key={product.code}>
            <div className="curling-image">
              <img src={product.image} alt={product.title} />
              <span>{product.badge}</span>
              <b>{String(index + 1).padStart(2, "0")}</b>
            </div>
            <div className="curling-card-copy">
              <div><span>{product.code}</span><span>Curling collection</span></div>
              <h3>{product.title}</h3>
              <p>{product.copy}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-hint"><span /> Drag or use the arrows to explore the range</div>
    </section>
  );
}
