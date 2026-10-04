export async function googlePlacesRequest(path: string, fieldMask: string, body?: object): Promise<unknown> {
  const apiKey = process.env['GOOGLE_MAPS_API_KEY'];
  const lovableKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey || !lovableKey) throw new Error("Google Maps connection is unavailable.");
  const response = await fetch(`https://connector-gateway.lovable.dev/google_maps${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": apiKey, "X-Goog-FieldMask": fieldMask, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15_000),
  });
  if (response.status === 403) {
    const errorBody = await response.text();
    console.error(`Google Maps failed [403]: ${errorBody}`);
    if (errorBody.includes("API_KEY_HTTP_REFERRER_BLOCKED")) throw new Error(`Google Maps [403]: Set the server key application restrictions to None or IP addresses in Google Cloud Console. ${errorBody}`);
    if (errorBody.includes("API_KEY_SERVICE_BLOCKED")) throw new Error(`Google Maps [403]: Add Places API to the server key allowed APIs in Google Cloud Console. ${errorBody}`);
    throw new Error(`Google Maps [403]: Check server key restrictions in Google Cloud Console. ${errorBody}`);
  }
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Google Maps failed [${response.status}]: ${errorBody}`);
    throw new Error(`Google Maps [${response.status}]: ${errorBody}`);
  }
  return response.json();
}