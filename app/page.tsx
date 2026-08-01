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

      <section className="faq-section" id="about" aria-labelledby="faq-title">
        <div className="faq-intro">
          <span className="kicker">Before we make it</span>
          <h2 id="faq-title">Questions,<br /><em>answered.</em></h2>
          <p>
            The practical details buyers ask before placing an order—from
            samples and lead times to documentation and delivery.
          </p>
          <a className="button" href="#contact">Ask us anything <span aria-hidden="true">↗</span></a>
        </div>
        <div className="faq-list">
          {[
            ["01", "What are your prices?", "Pricing changes with materials, specifications and market conditions. Send us your requirements and we’ll prepare an up-to-date quotation."],
            ["02", "Do you have a minimum order quantity?", "Yes. International orders have minimum quantities that vary by product and customisation. Contact us for the MOQ that applies to your range."],
            ["03", "Can you supply the relevant documentation?", "Yes. We can provide Certificates of Analysis or Conformance, origin documents, insurance information and other export documentation where required."],
            ["04", "What is the average lead time?", "Samples usually take about 7 days. Mass production normally takes 20–30 days after deposit and final product approval; we’ll always discuss your deadline before confirming."],
            ["05", "Which payment methods do you accept?", "Payment can be made by bank transfer, Western Union or PayPal. Standard terms are a 30% deposit, with the 70% balance paid against the copy of the bill of lading."],
            ["06", "What is the product warranty?", "We stand behind our materials and workmanship. If an issue arises, our team will work with you to reach a practical and satisfactory resolution."],
            ["07", "Do you guarantee safe delivery?", "Yes. We use export-quality packaging, with specialised packing available when required. Non-standard or specialist packaging may carry an additional charge."],
            ["08", "How are shipping fees calculated?", "Freight depends on quantity, weight and delivery method. Sea freight is usually best for larger orders, while express is faster. We’ll quote the exact cost once we know your shipment details."],
          ].map(([number, question, answer], index) => (
            <details key={number} open={index === 0}>
              <summary><span>{number}</span><strong>{question}</strong><i aria-hidden="true">+</i></summary>
              <p>{answer}</p>
            </details>
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
