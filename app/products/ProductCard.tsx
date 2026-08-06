"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ProductCardData = {
  code: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  images: readonly string[];
  badge?: string;
  featured?: boolean;
};

export default function ProductCard({ product }: { product: ProductCardData }) {
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
      triggerRef.current?.focus();
    };
  }, [open]);

  function openDetails() {
    setActiveImage(0);
    setOpen(true);
  }

  function moveImage(direction: -1 | 1) {
    setActiveImage((current) => (current + direction + product.images.length) % product.images.length);
  }

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <article className="catalog-card">
      <button className="catalog-card-open" type="button" onClick={openDetails} ref={triggerRef} aria-haspopup="dialog">
        <div className="catalog-card-image">
          <img src={product.images[0]} alt={product.title} />
          {(product.badge || product.featured) && <span>{product.badge || "Featured"}</span>}
          {product.images.length > 1 && <b>{product.images.length} photos</b>}
        </div>
        <div className="catalog-card-meta"><span>{product.category}</span><span>{product.code}</span></div>
        <h3>{product.title}</h3>
        <p>{product.summary}</p>
        <span className="catalog-card-link">View product details <i aria-hidden="true">↗</i></span>
      </button>

      {open && createPortal(
        <div className="product-modal-backdrop" onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`product-${product.code}-title`}
            ref={dialogRef}
            onKeyDown={trapFocus}
          >
            <button className="product-modal-close" type="button" onClick={() => setOpen(false)} ref={closeButtonRef} aria-label="Close product details">×</button>

            <div className="product-modal-gallery">
              <div className="product-modal-main-image">
                <img src={product.images[activeImage]} alt={`${product.title}, photo ${activeImage + 1} of ${product.images.length}`} />
                {product.images.length > 1 && (
                  <div className="product-modal-image-controls">
                    <button type="button" onClick={() => moveImage(-1)} aria-label="Previous product photo">←</button>
                    <span aria-live="polite">{activeImage + 1} / {product.images.length}</span>
                    <button type="button" onClick={() => moveImage(1)} aria-label="Next product photo">→</button>
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="product-modal-thumbnails" aria-label="Product photos">
                  {product.images.map((image, index) => (
                    <button
                      type="button"
                      className={index === activeImage ? "active" : ""}
                      onClick={() => setActiveImage(index)}
                      aria-label={`Show product photo ${index + 1}`}
                      aria-current={index === activeImage ? "true" : undefined}
                      key={image}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-modal-copy">
              <span className="kicker">{product.category}</span>
              <div className="product-modal-code">{product.code}</div>
              <h2 id={`product-${product.code}-title`}>{product.title}</h2>
              <p className="product-modal-summary">{product.summary}</p>
              <div className="product-modal-description">
                {product.body.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <a className="button button-dark" href={`mailto:info@chinasunnyland.com?subject=${encodeURIComponent(`Inquiry about ${product.code} ${product.title}`)}`}>
                Enquire about this product <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </article>
  );
}
