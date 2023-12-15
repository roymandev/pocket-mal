import { jikanRest } from '@/utils/jikanApi';
import { useQuery } from '@tanstack/react-query';

export const useAnimeGenres = (props?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ['genres', 'anime'],
    queryFn: async () => {
      const explicitGenreRes = await jikanRest.GET('/genres/anime', {
        params: {
          query: {
            filter: 'explicit_genres',
          },
        },
      });
      const genreRes = await jikanRest.GET('/genres/anime');

      return (
        genreRes.data?.data?.filter(
          (genre) =>
            !explicitGenreRes.data?.data?.some(
              (expGenre) => expGenre.mal_id === genre.mal_id
            )
        ) || []
      );
    },
    enabled: props?.enabled,
  });
