"use client";

import { useEffect, useState } from "react";

type HeroNews = {
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
  slug: string;
};

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
            <a className="button" href="/products#curling">Explore curling <span aria-hidden="true">↗</span></a>
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
          <div className="eyebrow"><span /> More ways to play</div>
          <h1>One maker.<br /><em>Every game night.</em></h1>
          <p>
            Four focused collections—curling games, indoor sports, outdoor leisure
            sports and indoor games—developed for easy setup and satisfying play.
          </p>
          <div className="hero-actions">
            <a className="button" href="/products">View all products <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="/#contact">Develop your own <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-range-tags" aria-label="Popular product categories">
            <span>Curling game</span><span>Other indoor sports</span><span>Outdoor leisure sports</span><span>Indoor game</span>
          </div>
        </div>
        <div className="range-visual" aria-label="Selection of Sunnyland products">
          <figure className="range-shot range-shot-main"><img src="/golf.jpg" alt="Pop-up golf chipping net" /></figure>
          <figure className="range-shot range-shot-left"><img src="/checkers.jpg" alt="Three-in-one giant checkers" /></figure>
          <figure className="range-shot range-shot-right"><img src="/ladder-ball.jpg" alt="Ladder ball toss game" /></figure>
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
