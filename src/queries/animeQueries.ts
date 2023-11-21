import { getAnime } from '@/rest/anime';
import { useQuery } from '@tanstack/react-query';

const animeKeys = {
  all: ['anime'] as const,
};

export const useAnime = () =>
  useQuery({
    queryKey: animeKeys.all,
    queryFn: () => getAnime({ q: 'nar', limit: 1 }),
  });
