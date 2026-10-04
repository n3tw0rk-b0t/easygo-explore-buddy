import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getCity } from "@/data/cities";
import { PLACES } from "@/data/places";
import type { Place } from "@/data/types";
import { listCommunityPlaces } from "@/lib/community.functions";

export const communityPlacesQuery = {
  queryKey: ["community-places"],
  queryFn: () => listCommunityPlaces(),
  staleTime: 60_000,
};

/** Demo places + places added by the community, in one list. */
export function useAllPlaces(): Place[] {
  const { data } = useQuery(communityPlacesQuery);
  return useMemo(() => {
    const community: Place[] = (data ?? []).map((c) => {
      const city = getCity(c.cityId);
      const same = (v: string) => ({ az: v, en: v, ru: v });
      return {
        id: `c-${c.slug}`,
        slug: c.slug,
        cityId: c.cityId,
        name: same(c.name),
        description: same(c.description),
        country: city.country,
        city: city.name,
        categories: [c.category],
        image: c.imageUrl,
        rating: 0,
        reviewCount: 0,
        distanceKm: 0.5,
        coordinates: { lat: null, lng: null },
        isFavoriteByDefault: false,
        isCommunity: true,
        address: c.address,
        openingHours: c.openingHours,
      };
    });
    return [...community, ...PLACES];
  }, [data]);
}
