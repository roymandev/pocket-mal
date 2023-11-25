import { getAnime, getSeasonalAnime } from '@/rest/anime';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const animeKeys = {
  all: ['anime'] as const,
  seasonal: ['anime', 'seasonal'] as const,
};

export const useAnime = (params: Parameters<typeof getAnime>[0]) =>
  useQuery({
    queryKey: [...animeKeys.all, params],
    queryFn: () => getAnime({ limit: 10, ...params }),
    enabled: params.q.length >= 3,
  });

export const useInfiniteAnime = (params: Parameters<typeof getAnime>[0]) =>
  useInfiniteQuery({
    queryKey: [...animeKeys.all, params],
    queryFn: ({ pageParam }) =>
      getAnime({ limit: 10, offset: Number(pageParam), ...params }),
    initialPageParam: '0',
    getNextPageParam: (lastPage) => {
      const limit = params.limit || 10;
      if (lastPage.data.length < limit) return null;
      return lastPage.paging.next?.match(/offset=(\d+)/)?.[1];
    },
    enabled: params.q.length >= 3,
  });

export const useSeasonalAnime = (
  ...params: Parameters<typeof getSeasonalAnime>
) =>
  useQuery({
    queryKey: [...animeKeys.seasonal, params],
    queryFn: () => getSeasonalAnime(...params),
  });
