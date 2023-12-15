import { useRef } from 'react';
import { Chip } from 'react-native-paper';

import { useAnimeGenres } from '@/queries/genresQueries';

import FilterGenres from '.';

type Values = {
  genres?: string;
  genres_exclude?: string;
};

type Props = {
  value: Values;
  onChange: (values: Values) => void;
};

function ChipActiveGenres({ value, onChange }: Props) {
  const isSingle = useRef(false);

  const { data: genres } = useAnimeGenres({
    enabled: isSingle.current,
  });

  return (
    <FilterGenres
      initialValues={value}
      onApply={onChange}
      renderTrigger={({
        initialValues,
        initialValuesLength: valuesLength,
        openFilter,
      }) => {
        const genreId = initialValues?.genres?.[0];

        if (valuesLength === 1 && genreId) {
          isSingle.current = true;

          const genre = genres?.find((g) => {
            if (!g.mal_id) return false;

            return g.mal_id === Number(genreId);
          })?.name;

          return <Chip onPress={openFilter}>{genre}</Chip>;
        }

        return <Chip onPress={openFilter}>Genres ({valuesLength})</Chip>;
      }}
    />
  );
}

export default ChipActiveGenres;
