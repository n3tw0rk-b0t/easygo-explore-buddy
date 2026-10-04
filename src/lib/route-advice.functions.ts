import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const mode = z.enum(["taxi", "bus", "metro", "scooter", "bicycle", "walking"]);

export const fetchRouteAdvice = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        destination: z.string().trim().min(1).max(200),
        city: z.string().trim().min(1).max(80),
        preference: z.enum(["balanced", "fastest", "cheapest", "leastWalking"]),
        lang: z.enum(["az", "en", "ru"]),
        options: z
          .array(z.object({ mode, durationMinutes: z.number().min(0).max(1000), price: z.number().min(0).max(100000), currency: z.string().max(5), walkingMeters: z.number().min(0).max(50000), transferCount: z.number().int().min(0).max(10) }))
          .min(1)
          .max(6),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { getRouteAdvice, AdviceError } = await import("./route-advice.server");
    try {
      return { ok: true as const, advice: await getRouteAdvice(data) };
    } catch (error) {
      if (error instanceof AdviceError) return { ok: false as const, status: error.status, message: error.message };
      return { ok: false as const, status: 500, message: "Unexpected error." };
    }
  });
