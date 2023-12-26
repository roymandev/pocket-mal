export type FilterGenres = {
  genres?: string;
  genres_exclude?: string;
};

export type ParsedValues = {
  genres: string[];
  genres_exclude: string[];
};

export type FilterGenresTriggerProps = {
  initialValues?: {
    genres?: string[];
    genres_exclude?: string[];
  };
  initialValuesLength: number;
  openFilter: () => void;
};
