"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const links = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/#contact", label: "Contact" },
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
              {links.map((link, index) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
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
