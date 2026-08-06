"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export default function ExpandableProductGrid({
  children,
  itemCount,
  category,
}: {
  children: ReactNode;
  itemCount: number;
  category: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>();
  const [fullHeight, setFullHeight] = useState<number>();
  const [hasMore, setHasMore] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridId = `products-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    function measure() {
      if (!grid) return;
      const cards = Array.from(grid.children) as HTMLElement[];
      const firstCard = cards[0];
      const secondRowCard = cards.find((card) => firstCard && card.offsetTop > firstCard.offsetTop + 2);
      setFullHeight(grid.scrollHeight);
      if (!firstCard || !secondRowCard) {
        setHasMore(false);
        setCollapsedHeight(undefined);
        return;
      }

      const previewHeight = Math.max(110, Math.min(secondRowCard.offsetWidth * 0.5, 240));
      setCollapsedHeight(secondRowCard.offsetTop + previewHeight);
      setHasMore(true);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [itemCount]);

  function toggle() {
    if (expanded) {
      setExpanded(false);
      window.requestAnimationFrame(() => rootRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      }));
    } else {
      setExpanded(true);
    }
  }

  const visibleHeight = hasMore ? (expanded ? fullHeight : collapsedHeight) : fullHeight;

  return (
    <div className={`expandable-products ${expanded ? "expanded" : "collapsed"}`} ref={rootRef}>
      <div
        className="product-grid-window"
        style={visibleHeight ? { maxHeight: `${visibleHeight}px` } : undefined}
      >
        <div className="catalog-grid" id={gridId} ref={gridRef}>{children}</div>
      </div>
      {hasMore && (
        <button className="show-all-products" type="button" onClick={toggle} aria-expanded={expanded} aria-controls={gridId}>
          <span>{expanded ? "Show fewer" : `Show all ${itemCount} products`}</span>
          <i aria-hidden="true">{expanded ? "↑" : "↓"}</i>
        </button>
      )}
    </div>
  );
}
