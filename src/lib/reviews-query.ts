import { queryOptions } from "@tanstack/react-query";
import { listPlaceReviews } from "./reviews.functions";

export const placeReviewsQuery = (slug: string) => queryOptions({
  queryKey: ["place-reviews", slug],
  queryFn: () => listPlaceReviews({ data: { slug } }),
  staleTime: 0,
  refetchInterval: 15_000,
});