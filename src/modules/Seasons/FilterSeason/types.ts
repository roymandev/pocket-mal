import { ANIME_SEASON } from '@/constant';

export type FilterSeasonValue = {
  year: number;
  season: (typeof ANIME_SEASON)[number];
};

export type FilterSeasonTriggerProps = {
  openFilter: () => void;
};
