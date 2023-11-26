import { ApiResList } from '@/types';
import {
  ParamAnimeFields,
  ReturnAnimeFields,
  SeasonObject,
} from '@/types/anime';
import { malApi } from '@/utils/malApi';

export const getAnime = async <T extends ParamAnimeFields>(params: {
  q: string;
  limit?: number;
  offset?: number;
  fields?: T[];
}) => {
  const res = await malApi.get<ApiResList<ReturnAnimeFields<T>>>('/anime', {
    params: {
      ...params,
      fields: params.fields?.join(','),
    },
  });

  return res.data;
};

export const getSeasonalAnime = async <T extends ParamAnimeFields>(
  { year, season }: SeasonObject,
  params?: {
    sort?: 'anime_score' | 'anime_num_list_users';
    limit?: number;
    offset?: number;
    fields?: T[];
  }
) => {
  const res = await malApi.get<ApiResList<ReturnAnimeFields<T>>>(
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

export const getAnimeDetail = async <T extends ParamAnimeFields>(
  id: number,
  params?: {
    fields?: T[];
  }
) => {
  const res = await malApi.get<ReturnAnimeFields<T>>(`/anime/${id}`, {
    params: {
      fields: params?.fields?.join(','),
    },
  });

  return res.data;
};
