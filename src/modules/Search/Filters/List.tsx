import { ComponentPropsWithoutRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { List as PaperList } from 'react-native-paper';

import ChipFilter from '@/modules/Filters/ChipFilter';
import FilterGenres from '@/modules/Filters/Items/FilterGenres';
import FilterOrder from '@/modules/Filters/Items/FilterOrder';
import { AnimeSearchParams } from '@/types/api.types';

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
        renderTrigger={(props) => (
          <Item
            title="Order & Sort"
            onPress={props.onPress}
            right={() =>
              !!filters.order_by && (
                <ChipFilter
                  icon={filters.sort ? 'sort-descending' : 'sort-ascending'}
                  textStyle={{ textTransform: 'capitalize' }}
                  {...props}
                >
                  {filters.order_by}
                </ChipFilter>
              )
            }
          />
        )}
      />

      <FilterGenres
        initialValues={filters}
        onApply={onUpdateFilter}
        renderTrigger={(props) => (
          <Item
            title="Genres"
            onPress={props.onPress}
            right={() =>
              (filters.genres || filters.genres_exclude) && (
                <ChipFilter {...props} />
              )
            }
          />
        )}
      />
    </PaperList.Section>
  );
}

export default List;
