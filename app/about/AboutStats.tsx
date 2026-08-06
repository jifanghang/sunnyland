"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutStats({ stats }: { stats: string[][] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`capacity-strip${isVisible ? " is-visible" : ""}`}
      aria-label="Sunnyland production capacity"
    >
      {stats.map(([number, label], index) => (
        <div key={label} style={{ "--stat-delay": `${index * 90}ms` } as React.CSSProperties}>
          <strong>{number}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
