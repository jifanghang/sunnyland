import type { Metadata } from "next";
import { getContentItems } from "../db/content";
import CurlingCarousel from "./CurlingCarousel";
import HeroCarousel from "./HeroCarousel";
import { SiteFooter, SiteHeader } from "./SiteChrome";

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
  const products = items.filter((item) => item.type === "product").slice(0, 3);
  const news = items.filter((item) => item.type === "news").slice(0, 3);
  const topNews = news.find((item) => item.featured) || news[0];

  return (
    <main>
      <SiteHeader />
      {topNews && <HeroCarousel topNews={topNews} />}

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
              <a className="product-image" href="/products">
                <img src={product.imageUrl} alt={product.title} />
                {product.featured && <span className="card-badge">Popular pick</span>}
                <span className="card-arrow" aria-hidden="true">↗</span>
              </a>
              <div className="product-meta">
                <span>{product.category}</span>
                <span>{product.slug.toUpperCase()}</span>
              </div>
              <h3>{product.title}</h3>
              <p>{product.summary}</p>
            </article>
          ))}
        </div>
        <div className="product-actions">
          <a className="button" href="/products">View all products <span aria-hidden="true">↗</span></a>
          <a className="outline-button" href="mailto:info@chinasunnyland.com?subject=Sunnyland%20catalogue%20request">
            Request the full catalogue <span aria-hidden="true">↗</span>
          </a>
        </div>
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

      <section className="partnership-section">
        <div className="partnership-visual">
          <img src="/about-production.jpg" alt="Sunnyland team preparing products in the Ningbo factory" />
          <div className="partnership-stamp"><strong>OEM</strong><span>+ ODM</span></div>
          <div className="partnership-proof">
            <span>Product engineering</span>
            <span>Sampling</span>
            <span>Quality control</span>
            <span>Export coordination</span>
          </div>
        </div>
        <div className="partnership-copy">
          <span className="kicker kicker-light">A clearer way to create</span>
          <h2>Bring the spark.<br /><em>We’ll build the play.</em></h2>
          <p className="partnership-lead">
            Start with a finished brief, a rough sketch or simply the experience
            you want customers to have. We turn it into a product ready for the shelf.
          </p>
          <div className="partnership-path">
          {[
            ["01", "Define the win", "Market, target price, players and the moment of fun."],
            ["02", "Make it tangible", "Materials, mechanics and packaging become a working sample."],
            ["03", "Scale with confidence", "Approved details move into controlled production and export."],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
          </div>
          <a className="button button-cream" href="#contact">Start a product brief <span aria-hidden="true">→</span></a>
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
                <a href={`/news/${encodeURIComponent(article.slug)}`}>
                  Read the story <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <a className="news-more-link" href="/news">View all news <span aria-hidden="true">↗</span></a>
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

      <SiteFooter />
    </main>
  );
}
