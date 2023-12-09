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
      return (
        <AnimeGenresSelect
          title="Genres"
          value={values.genres}
          onChange={(value) => onChange({ genres: value })}
          trigger={({ selectedLength, onPress }) => (
            <Chip icon="plus" onPress={onPress}>
              Genres: {selectedLength}
            </Chip>
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
      renderItem={({ item }) =>
        renderItem(item as keyof AnimeSearchParams, values, onChange)
      }
      style={{ marginTop: activeFilters.length > 0 ? 16 : 0 }}
      contentContainerStyle={{
        gap: 8,
      }}
    />
  );
}

export default ActiveFilters;
