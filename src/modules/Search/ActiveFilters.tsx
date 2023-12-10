import { Chip } from 'react-native-paper';

import { FlatList } from 'react-native-gesture-handler';

import AnimeGenresSelect from '@/components/AnimeGenresSelect';
import ChipAnimeOrder from '@/components/ChipAnimeOrder';
import { AnimeSearchParams } from '@/types/api.types';

type Props = {
  values: AnimeSearchParams;
  onChange: (values: AnimeSearchParams) => void;
};

const renderItem = (
  item: keyof AnimeSearchParams,
  values: AnimeSearchParams,
  onChange: Props['onChange']
) => {
  switch (item) {
    case 'order_by':
      return <ChipAnimeOrder values={values} onChange={onChange} />;

    case 'genres':
    case 'genres_exclude':
      if (item === 'genres_exclude' && values.genres) return null;
      return (
        <AnimeGenresSelect
          initialValues={{
            genres: values.genres?.split(','),
            genres_exclude: values.genres_exclude?.split(','),
          }}
          onApply={(newValues) => {
            onChange({
              genres: newValues.genres?.join(','),
              genres_exclude: newValues.genres_exclude?.join(','),
            });
          }}
          renderTrigger={({ initialValuesLength: valuesLength, onPress }) => (
            <Chip onPress={onPress}>Genres: {valuesLength}</Chip>
          )}
        />
      );

    default:
      return null;
  }
};

function ActiveFilters({ values, onChange }: Props) {
  const activeFilters = Object.keys(values).filter(
    (key) => values[key as keyof AnimeSearchParams] !== undefined
  );

  return (
    <FlatList
      horizontal
      data={activeFilters}
      renderItem={({ item }) => {
        const itemKey = item as keyof AnimeSearchParams;
        if (values[itemKey] === undefined) return null;

        return renderItem(itemKey, values, onChange);
      }}
      style={{ marginTop: activeFilters.length > 0 ? 16 : 0 }}
      contentContainerStyle={{
        gap: 8,
      }}
    />
  );
}

export default ActiveFilters;
