import { ApiResList } from '.';

export type AnimeSeasons = 'winter' | 'spring' | 'summer' | 'fall';

type BaseAnimeFields = {
  id: number;
  title: string;
  main_picture?: {
    large?: string;
    medium?: string;
  };
};

export type AnimeFields = BaseAnimeFields & {
  alternative_titles?: {
    synonyms?: string[];
    en?: string;
    ja?: string;
  };
  start_date?: string;
  end_date?: string;
  synopsis?: string;
  mean?: number;
  rank?: number;
  popularity?: number;
  num_list_users?: number;
  num_scoring_users?: number;
  nsfw?: 'white' | 'gray' | 'black';
  genres: {
    id: number;
    name: string;
  }[];
  created_at: string;
  updated_at: string;
  media_type: 'unknown' | 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
  status: 'finished_airing' | 'currently_airing' | 'not_yet_aired';
  // my_list_status
  num_episodes: number;
  start_season?: {
    year: number;
    season: AnimeSeasons;
  };
  broadcast?: {
    day_of_the_week: string;
    start_time?: string;
  };
  source?:
    | 'other'
    | 'original'
    | 'manga'
    | '4_koma_manga'
    | 'web_manga'
    | 'digital_manga'
    | 'novel'
    | 'light_novel'
    | 'visual_novel'
    | 'game'
    | 'card_game'
    | 'book'
    | 'picture_book'
    | 'radio'
    | 'music';
  average_episode_duration?: number;
  rating?: 'g' | 'pg' | 'pg_13' | 'r' | 'r+' | 'rx';
  studios: {
    id: number;
    name: string;
  }[];
};

export type ResAnimeList<
  Fields extends keyof Omit<AnimeFields, keyof BaseAnimeFields> = never,
> = ApiResList<Pick<AnimeFields, keyof BaseAnimeFields | Fields>>;
