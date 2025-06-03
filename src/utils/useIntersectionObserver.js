import { useEffect, useRef, useState } from "react";

/* Performance: Reusable intersection observer hook for lazy loading */
export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        // Unobserve after intersection if once is true
        if (entry.isIntersecting && options.once) {
          observer.unobserve(entry.target);
        }
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || "0px",
        threshold: options.threshold || 0,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options.root, options.rootMargin, options.threshold, options.once]);

  return [targetRef, isIntersecting];
}
