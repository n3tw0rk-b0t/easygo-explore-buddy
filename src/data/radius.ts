export const RADIUS_OPTIONS = [1, 3, 5, 10, 25, 50, 100] as const;

export type RadiusOption = (typeof RADIUS_OPTIONS)[number];

export const DEFAULT_RADIUS: RadiusOption = 5;
