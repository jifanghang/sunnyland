import MobileNav from "./MobileNav";

type Section = "home" | "products" | "about" | "news";

export function SiteHeader({ active }: { active?: Section }) {
  return (
    <>
      <div className="announcement">
        <span>Designing fun since 2008</span>
        <span className="announcement-detail">OEM &amp; ODM · Global supply · Fast response</span>
      </div>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Sunnyland home">
          <img className="brand-logo" src="/logo.png" alt="Sunnyland" />
        </a>
        <nav aria-label="Main navigation">
          <a href="/" aria-current={active === "home" ? "page" : undefined}>Home</a>
          <a href="/products" aria-current={active === "products" ? "page" : undefined}>Products</a>
          <a href="/about" aria-current={active === "about" ? "page" : undefined}>About</a>
          <a href="/news" aria-current={active === "news" ? "page" : undefined}>News</a>
          <a href="/#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="button button-small" href="/#contact">
            Start an inquiry <span aria-hidden="true">↗</span>
          </a>
          <MobileNav />
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer>
      {showCta && (
        <div className="footer-cta">
          <div>
            <span className="footer-kicker">Ready when you are</span>
            <p className="footer-headline">Play, made<br />better.</p>
          </div>
          <a className="button" href="/#contact">Start an inquiry <span aria-hidden="true">↗</span></a>
        </div>
      )}
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="brand brand-light" href="/">
            <img className="brand-logo" src="/logo.png" alt="Sunnyland" />
          </a>
          <p>Novel sports and games, made in Ningbo and played around the world.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <a href="/products">Products</a>
          <a href="/about">About us</a>
          <a href="/news">News</a>
        </div>
        <div>
          <strong>Contact</strong>
          <a href="tel:+8613003751301">+86 130 0375 1301</a>
          <a href="mailto:info@chinasunnyland.com">info@chinasunnyland.com</a>
          <span>King Intl Mansion, Haishu District,<br />Ningbo, China</span>
        </div>
        <div>
          <strong>Visit</strong>
          <span>Mon–Fri, 9:00–18:00 CST</span>
          <span>Hong Kong Toys &amp; Games Fair<br />11–14 Jan 2027 · Booth 5E-G18</span>
        </div>
      </div>
      <div className="footer-watermark" aria-hidden="true">Sunnyland</div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sunnyland. All rights reserved.</span>
        <a href="/admin">Content manager</a>
      </div>
    </footer>
  );
}
