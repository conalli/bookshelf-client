export const createQueryKey = (cacheKey: string, userKey = "user"): string => {
  return `${cacheKey}:${userKey}`;
};
