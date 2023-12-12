export type AnimeGenresSelectValues = {
  genres?: string;
  genres_exclude?: string;
};

export type ParsedValues = {
  genres: string[];
  genres_exclude: string[];
};

export type AnimeGenresSelectTriggerProps = {
  initialValuesLength: number;
  onPress: () => void;
};
