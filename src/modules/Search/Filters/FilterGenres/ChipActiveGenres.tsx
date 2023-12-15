import { ActivityIndicator, Chip } from 'react-native-paper';

import { useAnimeGenres } from '@/queries/genresQueries';

import FilterGenres from '.';

type Values = {
  genres?: string;
  genres_exclude?: string;
};

function SingleGenreChip({
  genreId,
  onPress,
}: {
  genreId: string;
  onPress: () => void;
}) {
  const { data: genres, isLoading } = useAnimeGenres();

  const genre =
    genres?.find((g) => {
      if (!g.mal_id) return false;

      return g.mal_id === Number(genreId);
    })?.name || 'Invalid Genre';

  return (
    <Chip onPress={onPress}>
      {isLoading ? <ActivityIndicator size={16} /> : genre}
    </Chip>
  );
}

type Props = {
  value: Values;
  onChange: (values: Values) => void;
};

function ChipActiveGenres({ value, onChange }: Props) {
  return (
    <FilterGenres
      initialValues={value}
      onApply={onChange}
      renderTrigger={({ initialValues, initialValuesLength, openFilter }) => {
        const genreId = initialValues?.genres?.[0];

        if (initialValuesLength === 1 && genreId)
          return <SingleGenreChip genreId={genreId} onPress={openFilter} />;

        return <Chip onPress={openFilter}>Genres ({initialValuesLength})</Chip>;
      }}
    />
  );
}

export default ChipActiveGenres;
