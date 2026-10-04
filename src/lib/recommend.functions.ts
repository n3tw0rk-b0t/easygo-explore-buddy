import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getRecommendations = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        interests: z.string().trim().min(3).max(500),
        cityId: z.enum(["baku", "istanbul", "bratislava", "vienna"]),
        lang: z.enum(["az", "en", "ru"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { recommendPlaces, GatewayError } = await import("./recommend.server");
    try {
      return { ok: true as const, items: await recommendPlaces(data) };
    } catch (error) {
      if (error instanceof GatewayError) {
        return { ok: false as const, status: error.status, message: error.message };
      }
      return { ok: false as const, status: 500, message: "Unexpected error." };
    }
  });
