export type FilterGenres = {
  genres?: string;
  genres_exclude?: string;
};

export type ParsedValues = {
  genres: string[];
  genres_exclude: string[];
};

export type FilterGenresTriggerProps = {
  initialValuesLength: number;
  openFilter: () => void;
};
