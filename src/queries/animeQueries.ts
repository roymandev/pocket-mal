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

      return res.data?.data;
    },
  });
