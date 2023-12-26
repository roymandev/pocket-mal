import { ComponentPropsWithoutRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Chip, List as PaperList } from 'react-native-paper';

import FilterGenres from '@/modules/Filters/Items/FilterGenres';
import { AnimeSearchParams } from '@/types/api.types';

import FilterOrder from '../../Filters/Items/FilterOrder';

const ITEM_STYLE: StyleProp<ViewStyle> = {
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
};

function Item({
  style,
  ...rest
}: ComponentPropsWithoutRef<typeof PaperList.Item>) {
  return <PaperList.Item style={[ITEM_STYLE, style]} {...rest} />;
}

type Props = {
  filters: AnimeSearchParams;
  onUpdateFilter: (filters: AnimeSearchParams) => void;
};

function List({ filters, onUpdateFilter }: Props) {
  return (
    <PaperList.Section>
      <FilterOrder
        initialValues={filters}
        onApply={onUpdateFilter}
        renderTrigger={({ openFilter }) => (
          <Item
            title="Order & Sort"
            onPress={openFilter}
            right={() =>
              !!filters.order_by && (
                <Chip
                  icon={filters.sort ? 'sort-descending' : 'sort-ascending'}
                  textStyle={{ textTransform: 'capitalize' }}
                >
                  {filters.order_by}
                </Chip>
              )
            }
          />
        )}
      />

      <FilterGenres
        initialValues={filters}
        onApply={onUpdateFilter}
        renderTrigger={({ initialValuesLength, openFilter }) => (
          <Item
            title="Genres"
            onPress={openFilter}
            right={() =>
              !!initialValuesLength && <Chip>{initialValuesLength}</Chip>
            }
          />
        )}
      />
    </PaperList.Section>
  );
}

export default List;
