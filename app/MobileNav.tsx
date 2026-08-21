"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
];

const productCategories = [
  { href: "/products#curling-game", label: "Curling" },
  { href: "/products#other-indoor-sports", label: "Indoor Sports" },
  { href: "/products#outdoor-leisure-sports", label: "Outdoor Leisure Sports" },
  { href: "/products#indoor-game", label: "Indoor Game" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Close" : "Menu"}
        <span className="menu-toggle-icon" aria-hidden="true"><i /><i /><i /></span>
      </button>
      {mounted &&
        createPortal(
          <div className="mobile-nav" id="mobile-nav" hidden={!open}>
            <nav aria-label="Mobile navigation">
              <a href={links[0].href} onClick={() => setOpen(false)}>
                <span>01</span>{links[0].label}<b aria-hidden="true">↗</b>
              </a>
              <a href={links[1].href} onClick={() => setOpen(false)}>
                <span>02</span>{links[1].label}<b aria-hidden="true">↗</b>
              </a>
              <details className="mobile-nav-products">
                <summary><span>03</span>Products<b aria-hidden="true">+</b></summary>
                <div className="mobile-product-links">
                  {productCategories.map((category) => (
                    <a key={category.href} href={category.href} onClick={() => setOpen(false)}>
                      {category.label}<b aria-hidden="true">↗</b>
                    </a>
                  ))}
                </div>
              </details>
              <a href={links[2].href} onClick={() => setOpen(false)}>
                <span>04</span>{links[2].label}<b aria-hidden="true">↗</b>
              </a>
            </nav>
            <div className="mobile-nav-footer">
              <a className="button" href="/#contact" onClick={() => setOpen(false)}>
                Start an inquiry <span aria-hidden="true">↗</span>
              </a>
              <a href="mailto:info@chinasunnyland.com">info@chinasunnyland.com</a>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
