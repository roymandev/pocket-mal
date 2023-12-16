import { DEFAULT_ANIME_SFW } from '@/constant';
import { components, operations } from '@/schema';
import { jikanRest } from '@/utils/jikanApi';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

export const seasonsKeys = {
  all: ['seasons', 'all'] as const,
  now: ['seasons', 'now'] as const,
};

export const useSeasonNow = (
  queryParams?: operations['getSeason']['parameters']['query']
) =>
  useQuery({
    queryKey: [...seasonsKeys.now, queryParams],
    queryFn: async () => {
      const res = await jikanRest.GET('/seasons/now', {
        params: {
          query: {
            limit: 8,
            ...queryParams,
          },
        },
      });

      return res.data;
    },
  });

export const useInfiniteSeason = (
  path: operations['getSeason']['parameters']['path'],
  queryParams?: operations['getSeason']['parameters']['query']
): UseInfiniteQueryResult<
  InfiniteData<components['schemas']['anime_search']>
> =>
  useInfiniteQuery({
    queryKey: [...seasonsKeys.all, path, queryParams],
    queryFn: async ({ pageParam }) => {
      const res = await jikanRest.GET('/seasons/{year}/{season}', {
        params: {
          path,
          query: {
            page: pageParam,
            ...queryParams,
            sfw: DEFAULT_ANIME_SFW,
          },
        },
      });

      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage?.pagination?.has_next_page) return null;
      const nextPage = Number(lastPageParam) + 1;
      return nextPage;
    },
  });
