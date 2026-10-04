import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lang } from "@/data/types";

export function PlaceMiniMap({ query, label, href, lang, placeId }: { query: string; label: string; href: string; lang: Lang; placeId?: string }) {
  const [canRender, setCanRender] = useState(false);
  const key = import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY'];
  useEffect(() => {
    const host = window.location.hostname;
    // Never expose an access-key-bearing preview hostname to Google.
    setCanRender(!host.includes("-devserver-") && (host.endsWith(".lovable.app") || host.endsWith(".lovableproject.com")));
  }, []);
  const title = lang === "az" ? `${label} — xəritə` : lang === "ru" ? `${label} — карта` : `${label} — map`;
  const cta = lang === "az" ? "Google Maps-də aç" : lang === "ru" ? "Открыть в Google Maps" : "Open in Google Maps";
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-border bg-secondary">
      {canRender && key ? (
        <iframe title={title} src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodeURIComponent(placeId ? `place_id:${placeId}` : query)}&language=${lang}&zoom=16`} className="h-[220px] w-full border-0 sm:h-[260px]" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      ) : (
        <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 p-4 text-center">
          <MapPin className="h-8 w-8 text-primary" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">{lang === "az" ? "Xəritəni Google Maps-də açın." : lang === "ru" ? "Откройте карту в Google Maps." : "Open the map in Google Maps."}</p>
          <Button asChild variant="outline"><a href={href} target="_blank" rel="noopener noreferrer">{cta}</a></Button>
        </div>
      )}
    </div>
  );
}