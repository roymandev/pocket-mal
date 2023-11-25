import { ApiResList } from '.';

export type BaseAnimeObject = {
  id: number;
  title: string;
  main_picture?: {
    large?: string;
    medium?: string;
  };
};

export type AnimeObject = BaseAnimeObject & {
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
  start_season?: SeasonObject;
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

export type SeasonObject = {
  year: number;
  season: 'winter' | 'spring' | 'summer' | 'fall';
};

export type ResAnimeList<Fields extends keyof AnimeObject = never> = ApiResList<
  Pick<AnimeObject, keyof BaseAnimeObject | Fields>
>;
