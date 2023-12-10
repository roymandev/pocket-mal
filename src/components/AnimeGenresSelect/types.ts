export type AnimeGenresSelectValue = {
  genres?: string[];
  genres_exclude?: string[];
};

export type AnimeGenresSelectTriggerProps = {
  initialValuesLength: number;
  onPress: () => void;
};
