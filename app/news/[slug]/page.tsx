import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentItems } from "../../../db/content";
import { SiteFooter, SiteHeader } from "../../SiteChrome";
import "../news.css";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = (await getContentItems()).find((item) => item.type === "news" && item.slug === decodeURIComponent(slug));
  if (!article) return { title: "Story not found" };
  return { title: article.title, description: article.summary };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const news = (await getContentItems()).filter((item) => item.type === "news");
  const article = news.find((item) => item.slug === decodeURIComponent(slug));
  if (!article) notFound();
  const paragraphs = (article.body || article.summary).split(/\n\s*\n/).filter(Boolean);
  const related = news.filter((item) => item.id !== article.id).slice(0, 2);

  return (
    <main className="article-page">
      <SiteHeader active="news" />
      <article>
        <header className="article-header">
          <div>
            <a className="article-back" href="/news">← All news</a>
            <span className="kicker">{article.category}</span>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
            <time>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</time>
          </div>
          <img src={article.imageUrl} alt="" />
        </header>
        <div className="article-content">
          <aside><span>Sunnyland notes</span><strong>Play, product and production from Ningbo.</strong></aside>
          <div>
            {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <div className="article-inquiry">
              <span>Want to know more?</span>
              <h2>Bring this idea into your range.</h2>
              <a className="button" href={`mailto:info@chinasunnyland.com?subject=${encodeURIComponent(article.title)}`}>Talk to our team <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="related-stories">
          <span className="kicker">Keep reading</span>
          <h2>More from Sunnyland</h2>
          <div>
            {related.map((item) => (
              <a href={`/news/${encodeURIComponent(item.slug)}`} key={item.id}>
                <img src={item.imageUrl} alt="" />
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <b>Read story ↗</b>
              </a>
            ))}
          </div>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
