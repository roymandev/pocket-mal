import { AnimeObject, ResAnimeList } from '@/types/anime';
import { malApi } from '@/utils/malApi';

export const getAnime = async (params: {
  q: string;
  limit?: number;
  offset?: number | string;
  fields?: (keyof AnimeObject)[];
}) => {
  const res = await malApi.get<ResAnimeList>('/anime', {
    params: {
      ...params,
      fields: params.fields?.join(','),
    },
  });

  return res.data;
};
