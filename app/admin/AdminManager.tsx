"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ContentItem, ContentInput, ContentType } from "../../db/content";
import { productCategories } from "../../lib/product-categories";
import "./admin.css";

const blankItem: ContentInput = {
  type: "product",
  title: "",
  slug: "",
  summary: "",
  body: "",
  category: "",
  imageUrl: "/product-ssg011.jpg",
  publishedAt: new Date().toISOString().slice(0, 10),
  featured: false,
  sortOrder: 0,
};

export default function AdminManager({ initialItems, userName }: { initialItems: ContentItem[]; userName: string }) {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState<ContentType>("product");
  const [draft, setDraft] = useState<ContentInput>(blankItem);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const visibleItems = useMemo(() => items.filter((item) => item.type === filter), [items, filter]);

  function beginNew(type: ContentType) {
    setFilter(type);
    setEditingId(null);
    setDraft({ ...blankItem, type, imageUrl: type === "product" ? "/product-ssg011.jpg" : "/about.jpg" });
    setMessage("");
    document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" });
  }

  function beginEdit(item: ContentItem) {
    const { id: _id, ...input } = item;
    setEditingId(item.id);
    setDraft(input);
    setMessage("");
    document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" });
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const url = editingId ? `/api/content/${editingId}` : "/api/content";
    const response = await fetch(url, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const result: unknown = await response.json();
    if (response.ok) {
      const savedItem = result as ContentItem;
      setItems((current) => editingId
        ? current.map((item) => item.id === editingId ? savedItem : item)
        : [...current, savedItem]);
      setMessage(editingId ? "Changes published." : "New item published.");
      setEditingId(null);
      setDraft({ ...blankItem, type: filter, imageUrl: filter === "product" ? "/product-ssg011.jpg" : "/about.jpg" });
    } else {
      const error =
        result && typeof result === "object" && "error" in result
          ? String(result.error)
          : "Something went wrong.";
      setMessage(error);
    }
    setSaving(false);
  }

  async function remove(item: ContentItem) {
    if (!window.confirm(`Delete “${item.title}”?`)) return;
    const response = await fetch(`/api/content/${item.id}`, { method: "DELETE" });
    if (response.ok) {
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setMessage("Item removed.");
    } else {
      setMessage("Could not remove this item.");
    }
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">
          <img className="admin-brand-logo" src="/logo.png" alt="Sunnyland" />
        </a>
        <nav>
          <button className={filter === "product" ? "active" : ""} onClick={() => setFilter("product")}>
            <span>□</span> Products <b>{items.filter((item) => item.type === "product").length}</b>
          </button>
          <button className={filter === "news" ? "active" : ""} onClick={() => setFilter("news")}>
            <span>≡</span> News <b>{items.filter((item) => item.type === "news").length}</b>
          </button>
        </nav>
        <a className="view-site" href="/">View live site <span>↗</span></a>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div>
            <span>Content workspace</span>
            <h1>{filter === "product" ? "Products" : "News"}</h1>
          </div>
          <div className="admin-user"><span>{userName.slice(0, 1).toUpperCase()}</span><div><strong>{userName}</strong><small>Site editor</small></div></div>
        </header>

        <section className="admin-toolbar">
          <p>Manage Sunnyland’s product catalogue, homepage features and news pages.</p>
          <button onClick={() => beginNew(filter)}>+ Add {filter}</button>
        </section>

        <section className="content-table" aria-label={`${filter} items`}>
          <div className="table-row table-head"><span>Item</span><span>Category</span><span>Date</span><span>Order</span><span>Actions</span></div>
          {visibleItems.map((item) => (
            <article className="table-row" key={item.id}>
              <div className="item-cell"><img src={item.imageUrl} alt="" /><div><strong>{item.title}</strong><small>{item.slug}</small></div></div>
              <span>{item.category}</span>
              <time>{new Date(item.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</time>
              <span>{item.sortOrder}</span>
              <div className="row-actions"><button onClick={() => beginEdit(item)}>Edit</button><button className="delete-button" onClick={() => remove(item)}>Delete</button></div>
            </article>
          ))}
        </section>

        <section className="editor-card" id="editor">
          <div className="editor-heading">
            <div><span>{editingId ? "Editing item" : "New item"}</span><h2>{editingId ? draft.title : `Add ${filter}`}</h2></div>
            {editingId && <button onClick={() => { setEditingId(null); setDraft({ ...blankItem, type: filter }); }}>Cancel</button>}
          </div>
          <form onSubmit={save}>
            <div className="form-grid">
              <label>Content type<select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as ContentType })}><option value="product">Product</option><option value="news">News</option></select></label>
              <label>Category{draft.type === "product" ? (
                <select required value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>
                  <option value="" disabled>Select a product category</option>
                  {productCategories.map((category) => <option value={category} key={category}>{category}</option>)}
                </select>
              ) : (
                <input required value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} placeholder="e.g. New product" />
              )}</label>
              <label className="wide">Title<input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="A clear, customer-friendly title" /></label>
              <label>Product code / slug<input required value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} placeholder="e.g. SSL004" /></label>
              <label>Publish date<input required type="date" value={draft.publishedAt} onChange={(event) => setDraft({ ...draft, publishedAt: event.target.value })} /></label>
              <label className="wide">Summary<textarea required rows={4} value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} placeholder="One or two concise sentences" /></label>
              <label className="wide">Page content<textarea required rows={8} value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} placeholder="Write the full product description or article. Separate paragraphs with a blank line." /></label>
              <label className="wide">Image path or URL<input required value={draft.imageUrl} onChange={(event) => setDraft({ ...draft, imageUrl: event.target.value })} placeholder="/product-photo.jpg or https://…" /></label>
              <label>Display order<input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) })} /></label>
              <label className="checkbox-label"><input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} /> Mark as featured</label>
            </div>
            <div className="form-footer">
              <span role="status">{message}</span>
              <button type="submit" disabled={saving}>{saving ? "Saving…" : editingId ? "Publish changes" : "Publish item"} <span>→</span></button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
