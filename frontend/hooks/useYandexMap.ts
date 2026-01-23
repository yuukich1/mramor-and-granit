"use client";
import { useEffect, useRef, useState } from "react";

export function useYandexMap(scriptSrc: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.childNodes.length > 0) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.type = "text/javascript";

    script.onload = () => {
      setLoaded(true);
    };

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current?.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, [scriptSrc]);

  return { mapRef: containerRef, loaded };
}
