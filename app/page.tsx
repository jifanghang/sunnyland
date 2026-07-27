import type { Metadata } from "next";
import { getContentItems } from "../db/content";
import CurlingCarousel from "./CurlingCarousel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sunnyland Sports — Play, made better",
  description:
    "Signature floor curling sets and original sports and games from an experienced Ningbo manufacturer.",
};

const categories = [
  "Curling & shuffleboard",
  "Golf",
  "Lawn games",
  "Board games",
  "Party games",
  "Darts",
];

export default async function Home() {
  const items = await getContentItems();
  const products = items.filter((item) => item.type === "product").slice(0, 6);
  const news = items.filter((item) => item.type === "news").slice(0, 3);

  return (
    <main>
      <div className="announcement">
        <span>Designing fun since 2008</span>
        <span className="announcement-detail">OEM &amp; ODM · Global supply · Fast response</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sunnyland home">
          <img className="brand-logo" src="/logo.png" alt="Sunnyland" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#products">Products</a>
          <a href="/about">About</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="button button-small" href="mailto:info@chinasunnyland.com?subject=Sunnyland%20product%20inquiry">
          Start an inquiry <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Sports &amp; games manufacturer</div>
          <h1>Bring curling<br /><em>anywhere.</em></h1>
          <p>
            Sunnyland’s signature curling sets bring the strategy of the ice to
            any smooth floor—alongside a full range of original games made for global brands.
          </p>
          <div className="hero-actions">
            <a className="button" href="#curling-title">Explore curling <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="/about">Meet Sunnyland <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-proof" aria-label="Company highlights">
            <div><strong>16+</strong><span>years making play</span></div>
            <div><strong>30+</strong><span>markets supplied</span></div>
            <div><strong>24h</strong><span>inquiry response</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Sunnyland products">
          <div className="hero-burst" />
          <div className="sticker sticker-one">PLAY<br />MORE</div>
          <div className="sticker sticker-two">ICE<br />OPTIONAL!</div>
          <figure className="product-shot shot-main">
            <img src="/curling-2in1.jpg" alt="Sunnyland curling and shuffleboard two-in-one set" />
          </figure>
          <figure className="product-shot shot-top">
            <img src="/curling-air.jpg" alt="Sunnyland air-cushioned curling stone set" />
          </figure>
          <figure className="product-shot shot-bottom">
            <img src="/curling-floor.jpg" alt="Sunnyland portable floor curling stone set" />
          </figure>
          <span className="scribble">OUR SIGNATURE GAME →</span>
        </div>
      </section>

      <section className="category-strip" aria-label="Product categories">
        {categories.map((category, index) => (
          <span key={category}>{category}<i>{index % 2 ? "✦" : "●"}</i></span>
        ))}
      </section>

      <CurlingCarousel />

      <section className="section products-section" id="products">
        <div className="section-heading">
          <div>
            <span className="kicker">Made to move</span>
            <h2>Products worth<br />playing again.</h2>
          </div>
          <p>
            From the garden to the games room, each collection is designed for
            intuitive play, easy setup and one more round.
          </p>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className={`product-card product-card-${index + 1}`} key={product.id}>
              <div className="product-image">
                <img src={product.imageUrl} alt={product.title} />
                {product.featured && <span className="card-badge">Popular pick</span>}
                <span className="card-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="product-meta">
                <span>{product.category}</span>
                <span>{product.slug.toUpperCase()}</span>
              </div>
              <h3>{product.title}</h3>
              <p>{product.summary}</p>
            </article>
          ))}
        </div>
        <a className="outline-button" href="mailto:info@chinasunnyland.com?subject=Sunnyland%20catalogue%20request">
          Request the full catalogue <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="about-section" id="about">
        <div className="about-image">
          <img src="/about.jpg" alt="Sunnyland sports products displayed in a showroom" />
          <div className="about-seal"><strong>2008</strong><span>NINGBO<br />CHINA</span></div>
        </div>
        <div className="about-copy">
          <span className="kicker kicker-light">The people behind play</span>
          <h2>Built here.<br /><em>Played everywhere.</em></h2>
          <p className="about-lead">
            Sunnyland is a Ningbo-based team making novel sports and games for
            retailers, importers and playful brands around the world.
          </p>
          <p>
            Close to Ningbo and Shanghai ports, we pair responsive product
            development with dependable manufacturing and export experience.
          </p>
          <div className="capabilities">
            <span>Product design</span><span>OEM / ODM</span>
            <span>Quality control</span><span>Global logistics</span>
          </div>
          <a className="button button-cream" href="#contact">Build with us <span aria-hidden="true">→</span></a>
          <a className="about-more-link" href="/about">Discover our full story <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="section process-section">
        <div className="section-heading compact-heading">
          <div>
            <span className="kicker">From sketch to shelf</span>
            <h2>Your idea.<br />Our playground.</h2>
          </div>
          <p>A practical, collaborative path from the first conversation to repeat orders.</p>
        </div>
        <div className="process-grid">
          {[
            ["01", "Share the idea", "Tell us the market, price point and play experience you have in mind."],
            ["02", "Shape the product", "We refine materials, mechanics, packaging and samples with your team."],
            ["03", "Make it reliable", "Production and quality checks keep every order consistent."],
            ["04", "Ship with confidence", "Export-ready coordination from Ningbo to your destination."],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section news-section" id="news">
        <div className="section-heading news-heading">
          <div>
            <span className="kicker">Fresh from Sunnyland</span>
            <h2>Notes from<br />the field.</h2>
          </div>
          <p>New products, play guides and a closer look at the games inspiring our team.</p>
        </div>
        <div className="news-grid">
          {news.map((article, index) => (
            <article className={index === 0 ? "news-card featured-news" : "news-card"} key={article.id}>
              <div className="news-image">
                <img src={article.imageUrl} alt="" />
                <span>{article.category}</span>
              </div>
              <div className="news-body">
                <time>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</time>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <a href={`mailto:info@chinasunnyland.com?subject=${encodeURIComponent(article.title)}`}>
                  Read the story <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro">
          <span className="kicker">Let’s make something fun</span>
          <h2>Ready<br />to play?</h2>
          <p>Tell us what you’re building. Our team will be back to you within one business day.</p>
          <div className="contact-details">
            <div>
              <span>Email</span>
              <a href="mailto:info@chinasunnyland.com">info@chinasunnyland.com</a>
            </div>
            <div>
              <span>Phone</span>
              <a href="tel:+8613003751301">+86 130 0375 1301</a>
            </div>
            <div>
              <span>Visit us</span>
              <address>
                2-28/2F, King Intl Mansion, No. 345 South Part,<br />
                Huanchengxi Road, Haishu District, Ningbo, China
              </address>
            </div>
          </div>
        </div>
        <form
          className="contact-form"
          action="https://formsubmit.co/info@chinasunnyland.com"
          method="POST"
        >
          <input type="hidden" name="_subject" value="New inquiry from the Sunnyland website" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <div className="form-title"><span>Start an inquiry</span><b>01</b></div>
          <label>
            Your name
            <input type="text" name="name" autoComplete="name" required placeholder="Name or company" />
          </label>
          <div className="contact-form-row">
            <label>
              Email address
              <input type="email" name="email" autoComplete="email" required placeholder="you@company.com" />
            </label>
            <label>
              Phone <small>Optional</small>
              <input type="tel" name="phone" autoComplete="tel" placeholder="+00 000 000 000" />
            </label>
          </div>
          <label>
            I’m interested in
            <select name="interest" defaultValue="">
              <option value="" disabled>Select a product or service</option>
              <option>Curling &amp; shuffleboard sets</option>
              <option>Golf and lawn games</option>
              <option>Board and party games</option>
              <option>OEM / ODM development</option>
              <option>Full product catalogue</option>
            </select>
          </label>
          <label>
            Tell us about your project
            <textarea name="message" rows={5} required placeholder="Market, quantities, timing, or the idea you have in mind…" />
          </label>
          <button type="submit" className="button button-dark">
            Send inquiry <span aria-hidden="true">↗</span>
          </button>
          <p className="form-note">Your message will be sent directly to our Ningbo team.</p>
        </form>
      </section>

      <footer>
        <div className="footer-brand">
          <a className="brand brand-light" href="#top">
            <img className="brand-logo" src="/logo.png" alt="Sunnyland" />
          </a>
          <p>Novel sports and games, made in Ningbo and played around the world.</p>
        </div>
        <div><strong>Explore</strong><a href="#products">Products</a><a href="/about">About us</a><a href="#news">News</a></div>
        <div><strong>Contact</strong><a href="tel:+8613003751301">+86 130 0375 1301</a><a href="mailto:info@chinasunnyland.com">Email us</a><span>King Intl Mansion, Haishu District,<br />Ningbo, China</span></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Sunnyland. All rights reserved.</span><a href="/admin">Content manager</a></div>
      </footer>
    </main>
  );
}
