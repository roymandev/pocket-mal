import { operations } from '@/schema';
import { jikanRest } from '@/utils/jikanApi';
import { useQuery } from '@tanstack/react-query';

export const seasonsKeys = {
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
            limit: 5,
            ...queryParams,
          },
        },
      });

      return res.data;
    },
  });
