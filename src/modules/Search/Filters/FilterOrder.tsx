import React, { useCallback, useRef } from 'react';
import { Keyboard, View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';

import ChipSelect from '@/components/ChipSelect';
import FilterFooter from '@/components/FilterFooter';
import PaperBottomSheetModal from '@/components/PaperBottomSheetModal';
import {
  ANIME_ORDERBY,
  ANIME_SORT,
  AnimeOrderby,
  DEFAULT_ANIME_SORT,
} from '@/constant';
import { useSetState } from '@/hooks/useSetState';
import {
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

type Values = {
  order_by?: AnimeOrderby;
  sort?: typeof DEFAULT_ANIME_SORT;
};

export type FilterOrderTriggerProps = {
  openFilter: () => void;
};

type Props = {
  initialValues: Values;
  onApply: (values: Values) => void;
  renderTrigger: (props: FilterOrderTriggerProps) => JSX.Element;
};

function FilterOrder({ initialValues, onApply, renderTrigger }: Props) {
  const [order, setOrder, overrideOrder] = useSetState(initialValues);

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
    setOrder(initialValues);
  };

  const onSelectHanlder = (orderby?: AnimeOrderby) => {
    setOrder({
      order_by: orderby,
    });
    if (!orderby) setOrder({ sort: undefined });

    // set sort to default
    if (orderby && !order.sort) setOrder({ sort: DEFAULT_ANIME_SORT });
  };

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <FilterFooter
        {...props}
        clearButtonProps={{
          onPress: () =>
            overrideOrder({ order_by: undefined, sort: undefined }),
          disabled: !order.order_by,
        }}
        applyButtonProps={{
          onPress: () => {
            onApply(order);
            bottomSheetRef.current?.close();
          },
        }}
      />
    ),
    [order, onApply, bottomSheetRef.current]
  );

  return (
    <>
      {renderTrigger({ openFilter: handlePresentModalPress })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={[350]}
        footerComponent={renderFooter}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ gap: 24, paddingHorizontal: 16 }}
        >
          <View style={{ gap: 8 }}>
            <Text variant="titleMedium">Order by</Text>
            <ChipSelect
              data={Object.keys(ANIME_ORDERBY)}
              mapItem={(key) => ({
                value: key,
                text: ANIME_ORDERBY[key as AnimeOrderby],
              })}
              selected={order.order_by}
              setSelected={(key) => onSelectHanlder(key as AnimeOrderby)}
            />
          </View>

          {order.order_by && order.sort && (
            <View style={{ gap: 8 }}>
              <Text variant="titleMedium">Sort</Text>
              <SegmentedButtons
                value={order.sort}
                onValueChange={(sort) =>
                  setOrder({
                    sort: sort as typeof DEFAULT_ANIME_SORT,
                  })
                }
                buttons={ANIME_SORT.map((status) => ({
                  value: status,
                  label: status === 'asc' ? 'Ascending' : 'Descending',
                }))}
              />
            </View>
          )}
        </BottomSheetScrollView>
      </PaperBottomSheetModal>
    </>
  );
}

export default FilterOrder;
