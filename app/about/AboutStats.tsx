"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const numberFormatter = new Intl.NumberFormat("en-GB");

export default function AboutStats({ stats }: { stats: Stat[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

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

  useEffect(() => {
    if (!isVisible) return;

    const finalValues = stats.map((stat) => stat.value);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(finalValues);
      return;
    }

    let animationFrame = 0;
    let startTime: number | undefined;
    const duration = 1500;

    const animate = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(finalValues.map((value) => Math.round(value * easedProgress)));
      if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isVisible, stats]);

  return (
    <div
      ref={sectionRef}
      className={`capacity-strip${isVisible ? " is-visible" : ""}`}
      aria-label="Sunnyland production capacity"
    >
      {stats.map((stat, index) => (
        <div key={stat.label} style={{ "--stat-delay": `${index * 90}ms` } as React.CSSProperties}>
          <strong aria-label={`${numberFormatter.format(stat.value)}${stat.suffix}`}>
            <span aria-hidden="true">{numberFormatter.format(counts[index])}{stat.suffix}</span>
          </strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
