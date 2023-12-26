import { Chip } from 'react-native-paper';

import { FlatList } from 'react-native-gesture-handler';

import { AnimeSearchParams } from '@/types/api.types';

import FilterGenresChip from '../../Filters/Items/FilterGenres/FilterGenresChip';
import FilterOrder from '../../Filters/Items/FilterOrder';

type Props = {
  filters: AnimeSearchParams;
  onUpdateFilter: (values: AnimeSearchParams) => void;
};

const renderItem = (
  item: keyof AnimeSearchParams,
  filters: AnimeSearchParams,
  onUpdateFilter: Props['onUpdateFilter']
) => {
  switch (item) {
    case 'order_by':
      return (
        <FilterOrder
          initialValues={filters}
          onApply={onUpdateFilter}
          renderTrigger={({ openFilter }) => (
            <Chip
              icon={filters.sort ? 'sort-descending' : 'sort-ascending'}
              textStyle={{ textTransform: 'capitalize' }}
              onPress={openFilter}
            >
              {filters.order_by}
            </Chip>
          )}
        />
      );

    case 'genres':
    case 'genres_exclude':
      if (item === 'genres_exclude' && filters.genres) return null;
      return (
        <FilterGenresChip initialValues={filters} onApply={onUpdateFilter} />
      );

    default:
      return null;
  }
};

function ActiveFilters({ filters, onUpdateFilter }: Props) {
  const activeFilters = Object.keys(filters).filter(
    (key) => filters[key as keyof AnimeSearchParams] !== undefined
  );

  if (!activeFilters.length) return null;

  return (
    <FlatList
      horizontal
      data={activeFilters}
      renderItem={({ item }) => {
        const itemKey = item as keyof AnimeSearchParams;
        if (filters[itemKey] === undefined) return null;

        return renderItem(itemKey, filters, onUpdateFilter);
      }}
      contentContainerStyle={{
        gap: 8,
      }}
    />
  );
}

export default ActiveFilters;
