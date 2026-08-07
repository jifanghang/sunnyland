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
  { code: "SSC001-B", image: "/curling-ssc001-b.jpg", name: "19 cm floor curling set" },
  { code: "SSC001-C", image: "/curling-ssc001-c.jpg", name: "19.5 cm floor curling set" },
  { code: "SSC001-D", image: "/curling-ssc001-d.jpg", name: "8 cm mini floor curling set" },
  { code: "SSC001-E", image: "/curling-ssc001-e.jpg", name: "11 cm floor curling set" },
  { code: "SSC001-F", image: "/curling-ssc001-f.jpg", name: "20 cm floor curling set" },
  { code: "SSG011", image: "/product-ssg011.jpg", name: "Golf pong game set" },
  { code: "SSB002", image: "/product-ssb002.jpg", name: "Fast sling puck game" },
  { code: "SSB001", image: "/product-ssb001.jpg", name: "Three-in-one giant checkers" },
  { code: "SSO020", image: "/product-sso020.jpg", name: "Tabletop air hockey game" },
  { code: "SSO001", image: "/product-sso001.jpg", name: "Mini tabletop basketball" },
  { code: "SSO014", image: "/product-sso014.jpg", name: "Four-player magnetic skill game" },
  { code: "SSO009", image: "/product-sso009.jpg", name: "Portable table tennis set" },
  { code: "SSO004", image: "/product-sso004.jpg", name: "Spike ball game set" },
  { code: "SSDT005", image: "/product-ssdt005.jpg", name: "Roll-up magnetic dartboard" },
  { code: "SSDT003", image: "/product-ssdt003.jpg", name: "Magnetic dartboard game" },
  { code: "SSG001", image: "/product-ssg001.jpg", name: "Golf chipping practice net" },
  { code: "SSL008", image: "/product-ssl008.jpg", name: "Premium kubb game set" },
  { code: "SSL006", image: "/product-ssl006.jpg", name: "Giant wooden dice set" },
  { code: "SSL001", image: "/product-ssl001.jpg", name: "French boules set" },
  { code: "SSL002", image: "/product-ssl002.jpg", name: "Ladder ball toss game" },
  { code: "SSL003", image: "/product-ssl003.jpg", name: "Wooden number block toss" },
  { code: "SSD002", image: "/product-ssd002.jpg", name: "Shot glass roulette" },
  { code: "SSD001", image: "/product-ssd001.jpg", name: "Shot glass drop game" },
  { code: "SSD007", image: "/product-ssd007.jpg", name: "Wheel of shots" },
  { code: "SSD008", image: "/product-ssd008.jpg", name: "Spin the shot" },
  { code: "SSD009", image: "/product-ssd009.jpg", name: "Roulette shots game" },
  { code: "SSO021", image: "/product-sso021.jpg", name: "Hook and ring toss game" },
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
            <span>Curling game</span><span>Other indoor sports</span><span>Outdoor leisure sports</span><span>Indoor game</span>
          </div>
        </div>
        <div className="range-visual" aria-label="All Sunnyland product designs">
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
