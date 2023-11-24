import { getAnime } from '@/rest/anime';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const animeKeys = {
  all: ['anime'] as const,
};

export const useAnime = (
  params: Pick<Parameters<typeof getAnime>[0], 'q' | 'fields'>
) =>
  useQuery({
    queryKey: [...animeKeys.all, params],
    queryFn: () => getAnime({ limit: 10, ...params }),
    enabled: params.q.length >= 3,
  });

export const useInfiniteAnime = (
  params: Pick<Parameters<typeof getAnime>[0], 'q' | 'fields'>
) =>
  useInfiniteQuery({
    queryKey: [...animeKeys.all, params],
    queryFn: ({ pageParam }) =>
      getAnime({ limit: 10, offset: pageParam, ...params }),
    initialPageParam: '0',
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 10) return null;
      return lastPage.paging.next?.match(/offset=(\d+)/)?.[1];
    },
    enabled: params.q.length >= 3,
  });
