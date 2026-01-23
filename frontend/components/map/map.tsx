"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useYandexMap } from "@/hooks/useYandexMap";

import { MapInfoDesktop } from "./mapInfoDesktop";
import { MapInfoMobile } from "./mapInfoMobile";
import { MapSkeleton } from "./mapSkeleton";


export function ReviewsAndMap() {
  const isMobile = useIsMobile();
  const [infoOpen, setInfoOpen] = useState(false);

  const { mapRef, loaded } = useYandexMap(
    "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A970f69c5e51cef70bfbf75436a387d370cd2a920ece840b8b81bf3f81e02f707&width=100%25&height=600&lang=ru_RU&scroll=false"
  );

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {!loaded && <MapSkeleton />}

      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ visibility: loaded ? "visible" : "hidden" }}
      />

      {!isMobile ? (
        <MapInfoDesktop />
      ) : (
        <MapInfoMobile
          open={infoOpen}
          onToggle={() => setInfoOpen(v => !v)}
        />
      )}
    </section>
  );
}
