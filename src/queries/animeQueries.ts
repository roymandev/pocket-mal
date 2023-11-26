import { operations } from '@/schema';
import { jikanRest } from '@/utils/jikanApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const animeKeys = {
  infiniteSearch: ['anime', 'infiniteSearch'] as const,
  byId: ['anime', 'byId'] as const,
};

export const useInfiniteAnime = (
  params?: operations['getAnimeSearch']['parameters']['query']
) =>
  useInfiniteQuery({
    queryKey: [...animeKeys.infiniteSearch, params],
    queryFn: async ({ pageParam }) => {
      const res = await jikanRest.GET('/anime', {
        params: {
          query: {
            page: pageParam,
            ...params,
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
    enabled: !!params?.q?.length,
  });

export const useAnimeById = (id: number) =>
  useQuery({
    queryKey: [...animeKeys.byId, id],
    queryFn: async () => {
      const res = await jikanRest.GET('/anime/{id}', {
        params: {
          path: {
            id,
          },
        },
      });

      return res.data?.data;
    },
  });
