import type { Metadata } from "next";
import "./about.css";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet Sunnyland: a Ningbo sports and games manufacturer combining product development, manufacturing, quality control and global supply since 2008.",
};

const capabilities = [
  ["5,000 m²", "Production base"],
  ["100+", "Team members"],
  ["8", "Injection machines"],
  ["5", "Assembly lines"],
  ["1", "UV printing line"],
];

const standards = [
  ["BSCI", "Social responsibility", "Our production base has passed BSCI social-responsibility auditing."],
  ["ISO 9001", "Quality management", "Documented quality processes support consistent production and improvement."],
  ["EN71", "European toy safety", "Products are developed to conform with relevant European toy-safety requirements."],
  ["ASTM F963", "US toy safety", "Materials and finished products are prepared for applicable US market standards."],
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="announcement">
        <span>Designing fun since 2008</span>
        <span className="announcement-detail">Ningbo · China · Global supply</span>
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="Sunnyland home">
          <span className="sun-mark" aria-hidden="true"><i /></span>
          <span>SUNNYLAND</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/#products">Products</a>
          <a href="/about" aria-current="page">About</a>
          <a href="#factory">Factory tour</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="button button-small" href="/#contact">
          Start an inquiry <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="about-hero">
        <div className="about-hero-copy">
          <span className="eyebrow"><span /> About Sunnyland</span>
          <h1>Made for play.<br /><em>Built to last.</em></h1>
          <p>
            We are a team of designers, technicians, makers and export
            specialists turning playful ideas into dependable products for
            customers around the world.
          </p>
          <a className="text-link" href="#story">Our story <span aria-hidden="true">↓</span></a>
        </div>
        <div className="about-hero-media">
          <img src="/about-production.jpg" alt="Sunnyland production base in Ningbo" />
          <div className="about-year"><strong>2008</strong><span>Founded in<br />Ningbo, China</span></div>
          <div className="about-photo-card">
            <img src="/curling-2in1.jpg" alt="Sunnyland signature curling and shuffleboard set" />
            <span>Signature collection · Curling</span>
          </div>
        </div>
      </section>

      <section className="about-story" id="story">
        <div className="about-story-heading">
          <span className="kicker">Who we are</span>
          <h2>One team.<br />A world of <em>play.</em></h2>
        </div>
        <div className="about-story-copy">
          <p className="story-lead">
            Ningbo Haishu Advancing &amp; Rising Trading Co., Ltd. was founded
            in 2008, close to both Ningbo and Shanghai ports.
          </p>
          <p>
            What began as a specialist supplier of novel sporting goods has
            grown into an integrated product-development, manufacturing and
            export business. Sunnyland now makes curling and shuffleboard sets,
            golf products, darts, board games, lawn games and party games.
          </p>
          <p>
            Our signature floor-curling range reflects the way we work: start
            with an accessible idea, refine the mechanics and materials, then
            build it reliably at scale. That focus has earned Sunnyland a
            strong reputation with retailers and sporting-goods customers in
            Europe, North America and Asia.
          </p>
        </div>
      </section>

      <section className="capacity-strip" aria-label="Sunnyland production capacity">
        {capabilities.map(([number, label]) => (
          <div key={label}><strong>{number}</strong><span>{label}</span></div>
        ))}
      </section>

      <section className="about-video-section">
        <div className="about-section-heading">
          <div><span className="kicker kicker-light">See Sunnyland in motion</span><h2>Inside the<br /><em>company.</em></h2></div>
          <p>Meet the products, people and production environment behind the Sunnyland name.</p>
        </div>
        <div className="video-grid">
          <article className="video-card video-card-main">
            <video controls preload="metadata" poster="/about-production.jpg">
              <source src="/about-company.mp4" type="video/mp4" />
            </video>
            <div><span>01 · Company</span><h3>Meet Sunnyland</h3><p>A concise introduction to our team and the games we bring to market.</p></div>
          </article>
          <article className="video-card">
            <video controls preload="metadata" poster="/curling-floor.jpg">
              <source src="/about-products.mp4" type="video/mp4" />
            </video>
            <div><span>02 · Products</span><h3>Play in action</h3><p>A closer look at Sunnyland sports and game concepts.</p></div>
          </article>
          <article className="video-card">
            <video controls preload="metadata" poster="/about-assembly.jpg">
              <source src="/about-factory.mp4" type="video/mp4" />
            </video>
            <div><span>03 · Factory</span><h3>Where ideas are made</h3><p>A view inside our Ningbo manufacturing operation.</p></div>
          </article>
        </div>
      </section>

      <section className="factory-section" id="factory">
        <div className="factory-intro">
          <div>
            <span className="kicker">Factory tour</span>
            <h2>From raw material<br />to <em>ready to ship.</em></h2>
          </div>
          <p>
            Our 5,000 m² production base brings moulding, assembly, printing,
            inspection and packing into one coordinated workflow.
          </p>
        </div>
        <div className="factory-gallery">
          <figure className="factory-photo factory-photo-wide">
            <img src="/about-production.jpg" alt="Exterior of the Sunnyland production base" />
            <figcaption><span>01</span><strong>Production base</strong><small>Ningbo, China</small></figcaption>
          </figure>
          <figure className="factory-photo">
            <img src="/about-assembly.jpg" alt="Injection moulding equipment inside the Sunnyland factory" />
            <figcaption><span>02</span><strong>Injection moulding</strong><small>Eight machines</small></figcaption>
          </figure>
          <figure className="factory-photo">
            <img src="/about-printing.jpg" alt="Packed Sunnyland products ready for shipping" />
            <figcaption><span>03</span><strong>Packing &amp; dispatch</strong><small>Global delivery</small></figcaption>
          </figure>
        </div>
        <div className="factory-steps">
          {[
            ["01", "Develop", "Designers and technicians refine gameplay, form, materials and target cost."],
            ["02", "Prototype", "Samples are tested for intuitive play, durability and manufacturability."],
            ["03", "Produce", "Moulding, assembly and UV printing turn approved ideas into repeatable products."],
            ["04", "Inspect", "In-process and finished-goods checks support consistent quality."],
            ["05", "Deliver", "Products are packed and coordinated for global export from Ningbo."],
          ].map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="quality-section">
        <div className="quality-heading">
          <span className="kicker">Quality with proof</span>
          <h2>Responsibility<br />at every <em>step.</em></h2>
          <p>
            Our systems are built around social responsibility, quality
            management and the safety expectations of international toy and
            sporting-goods markets.
          </p>
        </div>
        <div className="standards-grid">
          {standards.map(([standard, title, copy]) => (
            <article key={standard}><strong>{standard}</strong><span>{title}</span><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="custom-section">
        <div className="custom-image">
          <img src="/about.jpg" alt="Sunnyland product showroom" />
          <span>OEM &amp; ODM welcomed</span>
        </div>
        <div className="custom-copy">
          <span className="kicker kicker-light">Your idea, made real</span>
          <h2>Built around<br /><em>your market.</em></h2>
          <p>
            Customized sizes, shapes, materials, colours and packaging are
            available. Our team works with buyers from the first brief through
            sampling, production and delivery.
          </p>
          <ul>
            <li>Original product development</li>
            <li>Private-label and branded packaging</li>
            <li>Material and colour customization</li>
            <li>Sampling and production engineering</li>
          </ul>
          <a className="button button-cream" href="/#contact">Share your idea <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="global-section">
        <div className="global-heading">
          <span className="kicker">Global relationships</span>
          <h2>From Ningbo<br />to the <em>world.</em></h2>
          <p>
            Sunnyland products are sold primarily across Europe, the United
            States, Canada, Japan and South Korea. Our company has supplied
            customers including:
          </p>
        </div>
        <div className="partner-names" aria-label="Selected Sunnyland customers">
          {["Target", "Disney", "Lidl", "MyToys", "Nanu-Nana", "Smyths"].map((partner, index) => (
            <span key={partner}><i>{String(index + 1).padStart(2, "0")}</i>{partner}</span>
          ))}
        </div>
      </section>

      <section className="exhibition-section">
        <div className="exhibition-copy">
          <span className="kicker kicker-light">Meet us in person</span>
          <h2>Showing up<br /><em>for play.</em></h2>
          <p>
            We regularly attend international fairs to share new products,
            learn from buyers and build lasting relationships.
          </p>
          <div className="show-list">
            <span>Canton Fair</span><span>Hong Kong Toy Fair</span>
            <span>Tokyo Toy Fair</span><span>Nuremberg Toy Fair</span>
            <span>ISPO Munich</span>
          </div>
        </div>
        <div className="exhibition-gallery">
          <img src="/about-exhibition-1.jpg" alt="Sunnyland team with a customer" />
          <img src="/about-exhibition-2.jpg" alt="Sunnyland representative at an international exhibition" />
          <img src="/about-exhibition-3.jpg" alt="Sunnyland team at a trade show" />
        </div>
      </section>

      <section className="innovation-section">
        <div className="innovation-heading">
          <div><span className="kicker">Original ideas, protected</span><h2>Innovation<br />with <em>intent.</em></h2></div>
          <p>We invest in original product thinking and protect the distinctive ideas that move play forward.</p>
        </div>
        <div className="innovation-grid">
          <article>
            <img src="/about-trademark.jpg" alt="Curland trademark registration certificate" />
            <div><span>2020</span><h3>Curland trademark</h3><p>A dedicated identity for Sunnyland’s curling innovation.</p></div>
          </article>
          <article>
            <img src="/about-patent.jpg" alt="Hover curling design patent certificate" />
            <div><span>2021</span><h3>Hover curling patent</h3><p>Protection for an original approach to accessible, off-ice curling.</p></div>
          </article>
        </div>
      </section>

      <section className="about-cta">
        <span className="kicker">Let’s develop together</span>
        <h2>Discover the next<br /><em>great game.</em></h2>
        <p>Tell us about your market, your customers and the idea you want to bring to life.</p>
        <a className="button button-dark" href="/#contact">Start a conversation <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <div className="footer-brand">
          <a className="brand brand-light" href="/">
            <span className="sun-mark" aria-hidden="true"><i /></span><span>SUNNYLAND</span>
          </a>
          <p>Novel sports and games, made in Ningbo and played around the world.</p>
        </div>
        <div><strong>Explore</strong><a href="/#products">Products</a><a href="/about">About us</a><a href="#factory">Factory tour</a></div>
        <div><strong>Contact</strong><a href="tel:+8613003751301">+86 130 0375 1301</a><a href="mailto:info@chinasunnyland.com">Email us</a><span>King Intl Mansion, Haishu District,<br />Ningbo, China</span></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Sunnyland. All rights reserved.</span><a href="/admin">Content manager</a></div>
      </footer>
    </main>
  );
}
