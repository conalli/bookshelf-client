export const createQueryKey = (cacheKey: string, userKey = "user"): string => {
  return `${cacheKey}:${userKey}`;
};

export const exponentialBackoff = (attempt: number) =>
  Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000);
