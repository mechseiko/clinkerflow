/**
 * MathFormula — KaTeX-powered LaTeX renderer (CDN global build)
 * KaTeX is loaded from jsDelivr CDN in index.html and exposed as window.katex.
 * No npm package required.
 */

import { useEffect, useRef } from 'react';

// Type declaration for the globally available katex object (from CDN script)
declare global {
  interface Window {
    katex?: {
      render: (
        expression: string,
        element: HTMLElement,
        options?: {
          displayMode?: boolean;
          throwOnError?: boolean;
          strict?: boolean | string;
        }
      ) => void;
    };
  }
}

interface MathFormulaProps {
  /** A LaTeX string, e.g. "q_1 = Q_{kln} \\times (1 - \\eta_{cool})" */
  math: string;
  /** When true, renders in display (block/centred) mode. Default: false (inline) */
  block?: boolean;
  className?: string;
}

export function MathFormula({ math, block = false, className = '' }: MathFormulaProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const render = () => {
      if (!containerRef.current) return;

      // window.katex is loaded via CDN script tag (deferred)
      if (typeof window.katex !== 'undefined') {
        try {
          window.katex.render(math, containerRef.current, {
            displayMode: block,
            throwOnError: false,
            strict: false,
          });
        } catch {
          // Graceful fallback: show the raw LaTeX string
          if (containerRef.current) {
            containerRef.current.textContent = math;
          }
        }
      } else {
        // KaTeX hasn't loaded from CDN yet — show raw formula as fallback
        if (containerRef.current) {
          containerRef.current.textContent = math;
        }
      }
    };

    // If KaTeX is already loaded, render immediately.
    // Otherwise wait for the CDN script to fire the load event.
    if (typeof window.katex !== 'undefined') {
      render();
    } else {
      window.addEventListener('katex-loaded', render, { once: true });
      // Also retry after a short delay in case the event already fired
      const timeout = setTimeout(render, 500);
      return () => {
        window.removeEventListener('katex-loaded', render);
        clearTimeout(timeout);
      };
    }
  }, [math, block]);

  return <span ref={containerRef} className={className} />;
}
