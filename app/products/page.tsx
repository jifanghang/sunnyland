import type { Metadata } from "next";
import { getContentItems } from "../../db/content";
import { curlingProducts } from "../data/curling";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import { productCategories } from "../../lib/product-categories";
import { galleryFor } from "../data/product-galleries";
import ProductCard from "./ProductCard";
import ExpandableProductGrid from "./ExpandableProductGrid";
import "./products.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Sunnyland curling games, indoor sports, outdoor leisure sports and indoor games for retail, private-label and OEM programmes.",
};

function sectionId(category: string) {
  return category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const catalogueComicStrips = [
  [
    { src: "/curling-ssc001-a.jpg", code: "SSC001-A" },
    { src: "/product-sso014.jpg", code: "SSO014" },
    { src: "/product-ssl008.jpg", code: "SSL008" },
    { src: "/product-ssd002.jpg", code: "SSD002" },
  ],
  [
    { src: "/product-ssg011.jpg", code: "SSG011" },
    { src: "/product-sso020.jpg", code: "SSO020" },
    { src: "/product-ssb001.jpg", code: "SSB001" },
    { src: "/product-ssl003.jpg", code: "SSL003" },
  ],
  [
    { src: "/curling-ssc001-f.jpg", code: "SSC001-F" },
    { src: "/product-sso009.jpg", code: "SSO009" },
    { src: "/product-ssl001.jpg", code: "SSL001" },
    { src: "/product-ssd007.jpg", code: "SSD007" },
  ],
] as const;

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
            Curling games, indoor sports, outdoor favourites and game-night originals, built
            for retailers, importers and brands that want play people return to.
          </p>
          <a className="button" href="/#contact">Discuss your range <span aria-hidden="true">↗</span></a>
        </div>
        <div className="catalog-hero-collage">
          <img src="/curling-ssc001-a.jpg" alt="SSC001-A floor curling stone set" />
          <img src="/product-ssg011.jpg" alt="Golf pong game set" />
          <img src="/product-ssb001.jpg" alt="Giant checkers set" />
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
        <ExpandableProductGrid itemCount={curlingProducts.length} category="Curling game">
          {curlingProducts.map((product) => (
            <ProductCard product={{
              code: product.code,
              title: product.title,
              summary: product.copy,
              body: product.details,
              category: "Curling game",
              images: [product.image],
              badge: product.badge,
            }} key={product.code} />
          ))}
        </ExpandableProductGrid>
      </section>

      <section className="catalog-groups">
        {groups.map(({ category, products: categoryProducts }, groupIndex) => (
          <div className={`catalog-group catalog-group-${groupIndex % 3}`} id={sectionId(category)} key={category}>
            <div className="catalog-group-heading">
              <span>{String(groupIndex + 2).padStart(2, "0")}</span>
              <h2>{category}</h2>
              <p>{categoryProducts.length} products in this collection</p>
            </div>
            <ExpandableProductGrid itemCount={categoryProducts.length} category={category}>
              {categoryProducts.map((product) => (
                <ProductCard product={{
                  code: product.slug.toUpperCase(),
                  title: product.title,
                  summary: product.summary,
                  body: product.body,
                  category: product.category,
                  images: galleryFor(product.slug, product.imageUrl),
                  featured: product.featured,
                }} key={product.id} />
              ))}
            </ExpandableProductGrid>
          </div>
        ))}
      </section>

      <section className="catalog-cta">
        <div className="catalog-cta-comics" aria-hidden="true">
          {catalogueComicStrips.map((strip, stripIndex) => (
            <div className={`catalog-comic-strip catalog-comic-strip-${stripIndex + 1}`} key={stripIndex}>
              <div className="catalog-comic-track">
                {[0, 1].flatMap((copy) => strip.map((product) => (
                  <figure key={`${copy}-${product.code}`}>
                    <img src={product.src} alt="" loading="lazy" />
                    <figcaption>{product.code}</figcaption>
                  </figure>
                )))}
              </div>
            </div>
          ))}
        </div>
        <span className="kicker">Need the complete range?</span>
        <h2>There’s more<br />in the catalogue.</h2>
        <div className="catalog-cta-copy">
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
