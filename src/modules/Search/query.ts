import { DEFAULT_ANIME_SFW } from '@/constant';
import { components } from '@/schema';
import { AnimeSearchParams } from '@/types/api.types';
import { jikanRest } from '@/utils/jikanApi';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const useInfiniteAnime = (
  params?: AnimeSearchParams
): UseInfiniteQueryResult<
  InfiniteData<components['schemas']['anime_search']>
> => {
  const transformedParams: AnimeSearchParams = {
    ...params,
    q: params?.q?.toLocaleLowerCase(),
  };

  return useInfiniteQuery({
    queryKey: ['anime', 'infiniteSearch', transformedParams],
    queryFn: async ({ pageParam }) => {
      const res = await jikanRest.GET('/anime', {
        params: {
          query: {
            page: pageParam,
            ...transformedParams,
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
    // enabled: !!params?.q?.length,
  });
};
