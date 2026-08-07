"use client";

import { useRef } from "react";
import { curlingProducts } from "./data/curling";

const credentials = [
  { value: "2008", label: "Founded in Ningbo" },
  { value: "5,000 m²", label: "Production base" },
  { value: "100+", label: "Team members" },
  { value: "5", label: "Assembly lines" },
  { value: "ISO 9001", label: "Quality management" },
  { value: "BSCI", label: "Audited production" },
];

const partners = [
  { name: "Target", logo: "/partners/target.svg", slug: "target" },
  { name: "Disney", logo: "/partners/disney.svg", slug: "disney" },
  { name: "Lidl", logo: "/partners/lidl.svg", slug: "lidl" },
  { name: "myToys", logo: "/partners/mytoys.svg", slug: "mytoys" },
  { name: "Nanu-Nana", logo: "/partners/nanu-nana.svg", slug: "nanu-nana" },
  { name: "Smyths Toys", logo: "/partners/smyths.svg", slug: "smyths" },
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
    <>
      <section className="curling-section" id="curling" aria-labelledby="curling-title">
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

      <section className="company-proof-section" aria-labelledby="company-proof-title">
        <div className="company-proof-intro">
          <div>
            <span className="kicker">One partner, end to end</span>
            <h2 id="company-proof-title">Made in Ningbo.<br /><em>Ready for your market.</em></h2>
          </div>
          <div className="company-proof-copy">
            <p>
              Since 2008, Sunnyland has brought design, tooling, production,
              quality control and export coordination together for brands and
              distributors around the world.
            </p>
            <a className="button button-cream" href="/about">Meet Sunnyland <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="company-credentials" aria-label="Sunnyland credentials">
          {credentials.map((credential) => (
            <div className="company-credential" key={credential.label}>
              <strong>{credential.value}</strong>
              <span>{credential.label}</span>
            </div>
          ))}
        </div>

        <div className="company-partners">
          <span className="company-partners-label">Selected customers</span>
          <div className="company-logo-row" aria-label="Selected Sunnyland customers">
            {partners.map((partner) => (
              <div className="company-logo-card" key={partner.name}>
                <img className={`company-logo company-logo-${partner.slug}`} src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
