import type { Metadata } from "next";
import { getContentItems } from "../../db/content";
import { SiteFooter, SiteHeader } from "../SiteChrome";
import "./news.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News",
  description: "Sunnyland product launches, play guides and stories from our Ningbo team.",
};

export default async function NewsPage() {
  const items = await getContentItems();
  const news = items.filter((item) => item.type === "news");

  return (
    <main className="news-index-page">
      <SiteHeader active="news" />
      <section className="news-index-hero">
        <span className="kicker">Fresh from Sunnyland</span>
        <h1>Ideas in play.<br /><em>Stories in motion.</em></h1>
        <p>New products, practical play guides and a closer look inside the team that turns ideas into games.</p>
      </section>
      <section className="news-index-grid">
        {news.map((article, index) => (
          <article className={index === 0 ? "news-index-card news-index-featured" : "news-index-card"} key={article.id}>
            <a className="news-index-image" href={`/news/${encodeURIComponent(article.slug)}`}>
              <img src={article.imageUrl} alt="" />
              <span>{article.category}</span>
            </a>
            <div>
              <time>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</time>
              <h2><a href={`/news/${encodeURIComponent(article.slug)}`}>{article.title}</a></h2>
              <p>{article.summary}</p>
              <a className="story-link" href={`/news/${encodeURIComponent(article.slug)}`}>Read the story <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
