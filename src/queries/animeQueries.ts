import { getAnime, getAnimeDetail, getSeasonalAnime } from '@/rest/anime';
import { ParamAnimeFields } from '@/types/anime';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const animeKeys = {
  all: ['anime'] as const,
  seasonal: ['anime', 'seasonal'] as const,
  detail: ['anime', 'detail'] as const,
};

export const useAnime = <T extends ParamAnimeFields>(
  params: Parameters<typeof getAnime<T>>[0]
) =>
  useQuery({
    queryKey: [...animeKeys.all, params],
    queryFn: () => getAnime<T>({ limit: 10, ...params }),
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

export const useSeasonalAnime = <T extends ParamAnimeFields>(
  ...params: Parameters<typeof getSeasonalAnime<T>>
) =>
  useQuery({
    queryKey: [...animeKeys.seasonal, params],
    queryFn: () => getSeasonalAnime<T>(...params),
  });

export const useAnimeDetail = <T extends ParamAnimeFields>(
  ...params: Parameters<typeof getAnimeDetail<T>>
) =>
  useQuery({
    queryKey: [...animeKeys.detail, ...params],
    queryFn: () => getAnimeDetail<T>(...params),
  });
