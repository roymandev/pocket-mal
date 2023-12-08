import React, { useCallback, useRef } from 'react';
import { Keyboard, View } from 'react-native';
import { Button, SegmentedButtons, Text, useTheme } from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChipSelect from '@/components/ChipSelect';
import {
  ANIME_ORDERBY,
  ANIME_SORT,
  AnimeOrderby,
  DEFAULT_ANIME_SORT,
} from '@/constant';
import { useSetState } from '@/hooks/useSetState';
import { capitalize } from '@/utils/formatter';
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import PaperBottomSheetModal from './PaperBottomSheetModal';

type Value = {
  order_by?: AnimeOrderby;
  sort?: typeof DEFAULT_ANIME_SORT;
};

export type AnimeOrderSelectTriggerProps = {
  current: {
    value: Value;
    text: string;
  };
  onPress: () => void;
};

type Props = {
  value: Value;
  onChange: (value: Value) => void;
  trigger: (props: AnimeOrderSelectTriggerProps) => React.ReactNode;
};

function AnimeOrderSelect({ value, onChange, trigger }: Props) {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const [order, setOrder, overrideOrder] = useSetState(value);

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
    setOrder(value);
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
      <BottomSheetFooter
        {...props}
        style={{
          padding: 16,
          backgroundColor: theme.colors.surface,
          flexDirection: 'row',
          gap: 8,
        }}
      >
        <Button
          mode="text"
          onPress={() =>
            overrideOrder({ order_by: undefined, sort: undefined })
          }
          disabled={!order.order_by}
        >
          Clear
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            onChange(order);
            bottomSheetRef.current?.close();
          }}
          style={{
            flex: 1,
          }}
        >
          Apply
        </Button>
      </BottomSheetFooter>
    ),
    [order, onChange, bottomSheetRef.current]
  );

  return (
    <>
      {trigger({
        current: {
          value,
          text: capitalize(ANIME_ORDERBY[value.order_by as AnimeOrderby]),
        },
        onPress: handlePresentModalPress,
      })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={[350]}
        topInset={top}
        index={0}
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

export default AnimeOrderSelect;
