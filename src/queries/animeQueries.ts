import { operations } from '@/schema';
import { jikanRest } from '@/utils/jikanApi';
import { useQuery } from '@tanstack/react-query';

export const useAnimeById = (id: number) =>
  useQuery({
    queryKey: ['anime', 'byId', id],
    queryFn: async () => {
      const res = await jikanRest.GET('/anime/{id}', {
        params: {
          path: {
            id,
          },
        },
      });

      return res.data?.data || null;
    },
  });

export const useAnimeGenres = (
  queryParams?: operations['getAnimeGenres']['parameters']['query'],
  enabled = true
) =>
  useQuery({
    queryKey: ['genres', 'anime', queryParams],
    queryFn: async () => {
      const res = await jikanRest.GET('/genres/anime', {
        params: {
          query: queryParams,
        },
      });

      return res.data?.data || [];
    },
    enabled,
  });
