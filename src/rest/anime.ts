import { AnimeFields, ResAnimeList } from '@/types/anime';
import { malApi } from '@/utils/malApi';

export const getAnime = async (params: {
  q: string;
  limit?: number;
  offset?: number;
  fields?: keyof AnimeFields;
}) => {
  const res = await malApi.get<ResAnimeList>('/anime', {
    params,
  });

  return res.data;
};
