"use client";

import { useEffect, useState } from "react";

type HeroNews = {
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
  slug: string;
};

const comicProducts = [
  { code: "SSC001-A", image: "/curling-ssc001-a.jpg", name: "17 cm floor curling set" },
  { code: "TENNIS", image: "/catalogue/outdoor/27-inch-aluminum-tennis-racket.png", name: "27 inch aluminium tennis racket" },
  { code: "SSB001", image: "/catalogue/indoor-sports/ssb001-badminton-steel.jpg", name: "Badminton set with four steel rackets" },
  { code: "AIR HOCKEY", image: "/catalogue/indoor-game/20-inch-led-air-hockey.png", name: "20 inch LED air hockey" },
  { code: "SSC001-D", image: "/curling-ssc001-d.jpg", name: "8 cm mini floor curling set" },
  { code: "PICKLEBALL", image: "/catalogue/outdoor/pickleball-carbon-fiber-racket.jpg", name: "Carbon fibre pickleball paddle set" },
  { code: "SSD003", image: "/catalogue/indoor-sports/ssd003-sisal-dartboard.jpg", name: "Professional sisal dartboard with mat" },
  { code: "2 IN 1", image: "/catalogue/indoor-game/tabletop-2-in-1-soccer-basketball.png", name: "Tabletop soccer and basketball game" },
  { code: "SSC001-F", image: "/curling-ssc001-f.jpg", name: "20 cm floor curling set" },
  { code: "DISC GOLF", image: "/catalogue/outdoor/golf-disc-baskets.png", name: "Golf disc basket set" },
  { code: "SSG001", image: "/catalogue/indoor-sports/ssg001-golf-putting-mat.jpg", name: "Indoor golf putting mat" },
  { code: "SLING PUCK", image: "/catalogue/indoor-game/wooden-sling-puck.jpg", name: "Wooden sling puck game" },
];

const productComicStrips = Array.from(
  { length: Math.ceil(comicProducts.length / 4) },
  (_, index) => comicProducts.slice(index * 4, index * 4 + 4),
);

export default function HeroCarousel({ topNews }: { topNews: HeroNews }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = 3;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % total), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  function move(direction: -1 | 1) {
    setActive((current) => (current + direction + total) % total);
  }

  return (
    <section
      className="hero-carousel"
      id="top"
      aria-label="Sunnyland highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={`hero-slide hero-slide-curling ${active === 0 ? "is-active" : ""}`} aria-hidden={active !== 0} inert={active !== 0 ? true : undefined}>
        <div className="hero-copy">
          <div className="eyebrow"><span /> Signature collection</div>
          <h1>Bring curling<br /><em>anywhere.</em></h1>
          <p>
            Sunnyland’s signature curling sets bring the strategy of the ice to
            any smooth floor, alongside a full range of original games made for global brands.
          </p>
          <div className="hero-actions">
            <a className="button" href="#curling">Explore curling <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="/about">Meet Sunnyland <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-proof" aria-label="Company highlights">
            <div><strong>16+</strong><span>years making play</span></div>
            <div><strong>30+</strong><span>markets supplied</span></div>
            <div><strong>24h</strong><span>inquiry response</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Sunnyland curling products">
          <div className="hero-burst" />
          <div className="sticker sticker-one">PLAY<br />MORE</div>
          <div className="sticker sticker-two">ICE<br />OPTIONAL!</div>
          <figure className="product-shot shot-main">
            <img src="/curling-ssc001-a.jpg" alt="SSC001-A floor curling stone set with 17 cm stones" />
          </figure>
          <figure className="product-shot shot-top">
            <img src="/curling-ssc001-d.jpg" alt="SSC001-D mini floor curling set with 8 cm stones" />
          </figure>
          <figure className="product-shot shot-bottom">
            <img src="/curling-ssc001-f.jpg" alt="SSC001-F floor curling stone set with 20 cm stones" />
          </figure>
          <span className="scribble">OUR SIGNATURE GAME →</span>
        </div>
      </div>

      <div className={`hero-slide hero-slide-range ${active === 1 ? "is-active" : ""}`} aria-hidden={active !== 1} inert={active !== 1 ? true : undefined}>
        <div className="hero-copy">
          <div className="eyebrow"><span /> For brands &amp; distributors</div>
          <h1>Your brand.<br /><em>Our production line.</em></h1>
          <p>
            15 years making game products in Ningbo. Private label, custom pack-outs,
            and orders that scale from a 500-unit sample run to full container loads.
          </p>
          <div className="hero-actions">
            <a className="button" href="/products">Browse products <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="/#contact">Start an inquiry <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-range-tags" aria-label="Product categories">
            <span>Curling game</span><span>Outdoor Leisure Sports</span><span>Indoor Sports</span><span>Indoor Game</span>
          </div>
        </div>
        <div className="range-visual" aria-label="Sunnyland product range highlights">
          <div className="comic-strips">
            {productComicStrips.map((strip, stripIndex) => (
              <div className="comic-strip" key={stripIndex}>
                {strip.map((product) => (
                  <figure className="comic-panel" key={product.code}>
                    <img src={product.image} alt={product.name} />
                    <figcaption>{product.code}</figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
          <div className="range-callout"><strong>4</strong><span>product<br />categories</span></div>
        </div>
      </div>

      <div className={`hero-slide hero-slide-news ${active === 2 ? "is-active" : ""}`} aria-hidden={active !== 2} inert={active !== 2 ? true : undefined}>
        <div className="hero-news-image">
          <img src={topNews.imageUrl} alt="" />
          <span>Latest story</span>
        </div>
        <div className="hero-copy">
          <div className="eyebrow"><span /> {topNews.category}</div>
          <h1 className="hero-news-title">{topNews.title}</h1>
          <p>{topNews.summary}</p>
          {topNews.slug === "sunnyland-hk-toy-fair-2027" && (
            <div className="hero-news-facts" aria-label="Exhibition details">
              <div><span>Booth</span><strong>5E-G18</strong></div>
              <div><span>Dates</span><strong>11–14 Jan 2027</strong></div>
            </div>
          )}
          <div className="hero-actions">
            <a className="button" href={`/news/${encodeURIComponent(topNews.slug)}`}>
              Read the story <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="/news">All news <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>

      <div className="hero-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous highlight">←</button>
        <div className="hero-dots" aria-label="Choose a highlight">
          {["Curling", "Product range", "Latest news"].map((label, index) => (
            <button
              type="button"
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show ${label}`}
              aria-current={active === index ? "true" : undefined}
              key={label}
            />
          ))}
        </div>
        <span>{String(active + 1).padStart(2, "0")} / 03</span>
        <button type="button" onClick={() => move(1)} aria-label="Next highlight">→</button>
      </div>
    </section>
  );
}
