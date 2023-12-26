import { ComponentPropsWithoutRef } from 'react';
import { ActivityIndicator, Chip } from 'react-native-paper';

import { useAnimeGenres } from '@/queries/genresQueries';

import FilterGenres from '.';

function SingleGenreChip({
  genreId,
  onPress,
}: {
  genreId: string;
  onPress: () => void;
}) {
  const { data: genres, isLoading } = useAnimeGenres();

  const genre = genres?.find((g) => {
    if (!g.mal_id) return false;

    return g.mal_id === Number(genreId);
  })?.name;

  return (
    <Chip onPress={onPress}>
      {isLoading ? <ActivityIndicator size={16} /> : genre}
    </Chip>
  );
}

type Props = Omit<
  ComponentPropsWithoutRef<typeof FilterGenres>,
  'renderTrigger'
>;

function FilterGenresChip(props: Props) {
  return (
    <FilterGenres
      {...props}
      renderTrigger={({ initialValues, initialValuesLength, openFilter }) => {
        const genreId = initialValues?.genres?.[0];

        if (initialValuesLength === 1 && genreId)
          return <SingleGenreChip genreId={genreId} onPress={openFilter} />;

        return <Chip onPress={openFilter}>Genres ({initialValuesLength})</Chip>;
      }}
    />
  );
}

export default FilterGenresChip;
