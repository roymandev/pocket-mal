import { components } from './schema';

export const ANIME_TYPES = {
  tv: 'TV',
  movie: 'Movie',
  special: 'Special',
  ova: 'OVA',
  ona: 'ONA',
  music: 'Music',
} satisfies Partial<
  Record<components['schemas']['anime_search_query_type'], string>
>;
export type AnimeType = keyof typeof ANIME_TYPES;

export const ANIME_SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const ANIME_STATUS = ['airing', 'complete', 'upcoming'] as const;

export const ANIME_SEASON = ['summer', 'winter', 'spring', 'fall'] as const;
export type AnimeSeason = (typeof ANIME_SEASON)[number];

export const ANIME_ORDERBY = {
  members: 'Members',
  score: 'Score',
  start_date: 'Start Date',
  end_date: 'End Date',
} satisfies Partial<
  Record<components['schemas']['anime_search_query_orderby'], string>
>;
export type AnimeOrderby = keyof typeof ANIME_ORDERBY;

export const ANIME_SORT: components['schemas']['search_query_sort'][] = [
  'asc',
  'desc',
];
export type AnimeSort = (typeof ANIME_SORT)[number];

export const DEFAULT_ANIME_ORDERBY: keyof typeof ANIME_ORDERBY = 'members';

export const DEFAULT_ANIME_SORT: (typeof ANIME_SORT)[number] = 'desc';

export const DEFAULT_ANIME_SFW: boolean = true;
