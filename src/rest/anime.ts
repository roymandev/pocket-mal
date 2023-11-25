import { AnimeObject, ResAnimeList, SeasonObject } from '@/types/anime';
import { malApi } from '@/utils/malApi';

export const getAnime = async <T extends keyof AnimeObject>(params: {
  q: string;
  limit?: number;
  offset?: number;
  fields?: T[];
}) => {
  const res = await malApi.get<ResAnimeList>('/anime', {
    params: {
      ...params,
      fields: params.fields?.join(','),
    },
  });

  return res.data;
};

export const getSeasonalAnime = async <T extends keyof AnimeObject>(
  { year, season }: SeasonObject,
  params?: {
    sort?: 'anime_score' | 'anime_num_list_users';
    limit?: number;
    offset?: number;
    fields?: T[];
  }
) => {
  const res = await malApi.get<ResAnimeList<T>>(
    `/anime/season/${year}/${season}`,
    {
      params: {
        sort: 'anime_num_list_users',
        ...params,
        fields: params?.fields?.join(','),
      },
    }
  );

  return res.data;
};
