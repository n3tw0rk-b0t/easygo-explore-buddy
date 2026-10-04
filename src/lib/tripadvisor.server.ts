// Tripadvisor Terra API client (server-only).
// Docs: https://docs.terra.tripadvisor.com — auth via X-API-KEY header,
// catalog search is allowlist-free, content endpoints require the allowlist.
const TERRA_BASE = "https://terra.tripadvisor.com/api";

export interface TerraTranslation {
  language: string;
  primary?: boolean;
  value: string;
}

export interface TerraCatalogLocation {
  id: number;
  names?: TerraTranslation[];
  addresses?: { formatted?: string }[];
  geo?: string;
  overall_rating?: { rating?: number; count?: number };
  urls?: { official?: string };
}

export interface TerraReview {
  id: number;
  rating: number;
  title?: TerraTranslation[];
  text?: TerraTranslation[];
  publish_ts?: string;
  trip_type?: string;
  url?: string;
}

export class TerraError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function terraRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const key = process.env["TRIPADVISOR_API_KEY"];
  if (!key) throw new TerraError("TRIPADVISOR_API_KEY is not configured", 500);
  const response = await fetch(`${TERRA_BASE}${path}`, {
    ...init,
    headers: {
      "X-API-KEY": key,
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
    signal: AbortSignal.timeout(15_000),
  });
  if (response.status === 401) throw new TerraError("TRIPADVISOR_KEY_REJECTED: check the Terra API key", 401);
  if (response.status === 403)
    throw new TerraError("TRIPADVISOR_ENDPOINT_NOT_ALLOWED: your Terra package does not include this endpoint", 403);
  if (response.status === 429)
    throw new TerraError("TRIPADVISOR_RATE_LIMITED: Terra quota or QPS exceeded, retry later", 429);
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new TerraError(`TRIPADVISOR_HTTP_${response.status}: ${detail.slice(0, 300)}`, response.status);
  }
  return (await response.json()) as T;
}

function pickText(list?: TerraTranslation[]): string | undefined {
  if (!list?.length) return undefined;
  return list.find((t) => t.primary)?.value ?? list[0]?.value;
}

export interface TerraSearchResult {
  location: TerraCatalogLocation;
  matched_value?: string;
}

export async function searchTerraCatalog(params: {
  query: string;
  geoName?: string;
  category?: "HOTEL" | "RESTAURANT" | "ATTRACTION";
  locale?: string;
}): Promise<TerraSearchResult[]> {
  const q = new URLSearchParams({ version: "1", query: params.query.slice(0, 500), size: "5" });
  if (params.geoName) q.set("geo_name", params.geoName.slice(0, 100));
  if (params.category) q.set("category", params.category);
  if (params.locale) q.set("locale", params.locale);
  const page = await terraRequest<{ data?: TerraSearchResult[] }>(`/catalog/locations/search?${q}`);
  return page.data ?? [];
}

export async function appendTerraAllowlist(ids: number[]): Promise<void> {
  await terraRequest(`/allowlist?version=1`, {
    method: "POST",
    body: JSON.stringify({ operation_type: "APPEND", allowlist: ids }),
  });
}

// Terra reviews change infrequently; Terra's caching policy encourages caching.
// 30-minute in-memory cache keeps quota use low without storing snapshots long-term.
const reviewsCache = new Map<string, { at: number; value: unknown }>();
const REVIEWS_TTL_MS = 30 * 60 * 1000;

export interface TerraReviewsResult {
  locationId: number;
  name?: string;
  rating?: number;
  ratingCount?: number;
  tripadvisorUrl?: string;
  reviews: {
    id: number;
    rating: number;
    title?: string;
    text?: string;
    publishedOn?: string;
    tripadvisorUrl?: string;
  }[];
}

export async function getTerraReviews(
  locationId: number,
  lang: "az" | "en" | "ru",
): Promise<TerraReviewsResult> {
  // az is not a supported UGC language; "primary" returns the original language.
  const language = lang === "az" ? "primary" : lang;
  const cacheKey = `${locationId}:${language}`;
  const cached = reviewsCache.get(cacheKey);
  if (cached && Date.now() - cached.at < REVIEWS_TTL_MS) return cached.value as TerraReviewsResult;
  const q = new URLSearchParams({ version: "1", language, size: "5" });
  const page = await terraRequest<{ data?: TerraReview[] }>(`/locations/${locationId}/reviews?${q}`);
  const reviews = (page.data ?? []).slice(0, 5).map((r) => {
    const title = pickText(r.title);
    const text = pickText(r.text);
    const publishedOn = r.publish_ts?.slice(0, 10);
    const tripadvisorUrl = r.url;
    return {
      id: r.id,
      rating: r.rating,
      ...(title ? { title } : {}),
      ...(text ? { text } : {}),
      ...(publishedOn ? { publishedOn } : {}),
      ...(tripadvisorUrl ? { tripadvisorUrl } : {}),
    };
  });
  const result: TerraReviewsResult = { locationId, reviews };
  reviewsCache.set(cacheKey, { at: Date.now(), value: result });
  return result;
}
