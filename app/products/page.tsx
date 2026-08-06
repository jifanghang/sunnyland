import type { Metadata } from "next";
import { getContentItems } from "../../db/content";
import { curlingProducts } from "../data/curling";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import { productCategories } from "../../lib/product-categories";
import "./products.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Sunnyland curling games, indoor sports, outdoor leisure sports and indoor games for retail, private-label and OEM programmes.",
};

function sectionId(category: string) {
  return category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default async function ProductsPage() {
  const items = await getContentItems();
  const products = items.filter((item) => item.type === "product");
  const groups = productCategories.slice(1).map((category) => ({
    category,
    products: products.filter((product) => product.category === category),
  }));

  return (
    <main className="catalog-page">
      <SiteHeader active="products" />

      <section className="catalog-hero">
        <div>
          <span className="kicker">The Sunnyland range</span>
          <h1>Games made<br />to move.</h1>
          <p>
            Curling games, indoor sports, outdoor favourites and game-night originals—built
            for retailers, importers and brands that want play people return to.
          </p>
          <a className="button" href="/#contact">Discuss your range <span aria-hidden="true">↗</span></a>
        </div>
        <div className="catalog-hero-collage">
          <img src="/curling-ssc001-a.jpg" alt="SSC001-A floor curling stone set" />
          <img src="/golf.jpg" alt="Pop-up golf game" />
          <img src="/checkers.jpg" alt="Giant checkers set" />
          <span>4 categories<br /><strong>One playful partner</strong></span>
        </div>
      </section>

      <nav className="catalog-categories" aria-label="Product categories">
        <a href="#curling-game">Curling game</a>
        {groups.map(({ category }) => <a href={`#${sectionId(category)}`} key={category}>{category}</a>)}
      </nav>

      <section className="catalog-signature" id="curling-game">
        <div className="catalog-section-heading">
          <div><span className="kicker">Signature collection</span><h2>Curling,<br /><em>off the ice.</em></h2></div>
          <p>Portable formats for schools, clubs, activity spaces, families and every smooth floor between.</p>
        </div>
        <div className="catalog-grid">
          {curlingProducts.map((product) => (
            <article className="catalog-card" key={product.code}>
              <div className="catalog-card-image">
                <img src={product.image} alt={product.title} />
                <span>{product.badge}</span>
              </div>
              <div className="catalog-card-meta"><span>Curling game</span><span>{product.code}</span></div>
              <h3>{product.title}</h3>
              <p>{product.copy}</p>
              <a href={`mailto:info@chinasunnyland.com?subject=${encodeURIComponent(`Inquiry about ${product.code} ${product.title}`)}`}>
                Enquire about this set <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-groups">
        {groups.map(({ category, products: categoryProducts }, groupIndex) => (
          <div className={`catalog-group catalog-group-${groupIndex % 3}`} id={sectionId(category)} key={category}>
            <div className="catalog-group-heading">
              <span>{String(groupIndex + 2).padStart(2, "0")}</span>
              <h2>{category}</h2>
              <p>{categoryProducts.length} products in this collection</p>
            </div>
            <div className="catalog-grid">
              {categoryProducts.map((product) => (
                <article className="catalog-card" key={product.id}>
                  <div className="catalog-card-image">
                    <img src={product.imageUrl} alt={product.title} />
                    {product.featured && <span>Featured</span>}
                  </div>
                  <div className="catalog-card-meta"><span>{product.category}</span><span>{product.slug.toUpperCase()}</span></div>
                  <h3>{product.title}</h3>
                  <p>{product.summary}</p>
                  <a href={`mailto:info@chinasunnyland.com?subject=${encodeURIComponent(`Inquiry about ${product.slug} ${product.title}`)}`}>
                    Product inquiry <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="catalog-cta">
        <span className="kicker">Need the complete range?</span>
        <h2>There’s more<br />in the catalogue.</h2>
        <div>
          <p>Ask for current product options, specifications and private-label possibilities.</p>
          <a className="button button-dark" href="mailto:info@chinasunnyland.com?subject=Sunnyland%20catalogue%20request">
            Request the full catalogue <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
