import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import type { Lang } from "@/data/types";

export class AdviceError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

const LANG_NAME: Record<Lang, string> = { az: "Azerbaijani", en: "English", ru: "Russian" };

export interface AdviceInput {
  destination: string;
  city: string;
  preference: string;
  lang: Lang;
  options: { mode: string; durationMinutes: number; price: number; currency: string; walkingMeters: number; transferCount: number }[];
}

export async function getRouteAdvice(input: AdviceInput): Promise<{ mode: string; summary: string; tip: string }> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new AdviceError(401, "AI is not configured.");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const modes = input.options.map((o) => o.mode);
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system:
      "You are EasyGo AI, a city travel assistant. Choose the single best transport option ONLY from the provided list for the user's priority. " +
      `Return strictly JSON (no markdown): {"mode": one of ${JSON.stringify(modes)}, "summary": string, "tip": string}. ` +
      `summary: 1-2 short sentences (max 220 chars) explaining why, citing time/price. tip: one practical local tip (max 140 chars). Write in ${LANG_NAME[input.lang]}. ` +
      "Numbers are demo estimates; do not invent other data.",
    prompt: `City: ${input.city}\nDestination: ${input.destination}\nPriority: ${input.preference}\nOptions:\n${JSON.stringify(input.options)}`,
    providerOptions: {
      openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] },
    },
  });
  let text: string;
  try {
    text = await result.text;
  } catch (error) {
    const status = (error as { statusCode?: number }).statusCode ?? 500;
    if (status === 429) throw new AdviceError(429, "Too many requests. Please try again shortly.");
    if (status === 402) throw new AdviceError(402, "AI credits are exhausted.");
    if (status === 403) throw new AdviceError(403, "AI access is currently unavailable.");
    throw new AdviceError(status, "AI advice failed. Please try again.");
  }
  const m = text.match(/\{[\s\S]*\}/);
  let parsed: { mode?: unknown; summary?: unknown; tip?: unknown } = {};
  try { parsed = m ? JSON.parse(m[0]) : {}; } catch { parsed = {}; }
  if (typeof parsed.mode !== "string" || !modes.includes(parsed.mode) || typeof parsed.summary !== "string") {
    throw new AdviceError(500, "AI advice failed. Please try again.");
  }
  return { mode: parsed.mode, summary: parsed.summary.slice(0, 300), tip: typeof parsed.tip === "string" ? parsed.tip.slice(0, 200) : "" };
}
