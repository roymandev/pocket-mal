import { useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  Badge,
  Button,
  Chip,
  IconButton,
  List,
  Portal,
  Text,
} from 'react-native-paper';

import AnimeOrderSelect, {
  AnimeOrderSelectTriggerProps,
} from '@/components/AnimeOrderSelect';
import PaperBottomSheetModal from '@/components/PaperBottomSheetModal';
import { AnimeSearchParams } from '@/types/api.types';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const LIST_STYLE: StyleProp<ViewStyle> = {
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
};

const renderOrderTrigger = ({
  current,
  onPress,
}: AnimeOrderSelectTriggerProps) => (
  <List.Item
    style={LIST_STYLE}
    title="Order & Sort"
    onPress={onPress}
    right={() =>
      current.text && (
        <Chip
          icon={
            current.value.sort === 'asc' ? 'sort-ascending' : 'sort-descending'
          }
        >
          {current.text}
        </Chip>
      )
    }
  />
);

type Values = Omit<AnimeSearchParams, 'q'>;

type Props = {
  values: Values;
  onSubmit: (values: Values) => void;
  onClear: () => void;
};

function Filters({ values, onSubmit, onClear }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const activeFilters = Object.keys(values).filter(
    (key) => values[key as keyof Values] !== undefined
  );

  const onSubmitHandler: typeof onSubmit = (filter) => {
    onSubmit(filter);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <View>
        <IconButton
          icon="tune-variant"
          onPress={() => bottomSheetRef.current?.present()}
        />
        {Object.keys(activeFilters).length > 0 && (
          <Badge style={{ position: 'absolute', top: 0, right: 0 }}>
            {Object.keys(activeFilters).length}
          </Badge>
        )}
      </View>

      <Portal>
        <BottomSheetModalProvider>
          <PaperBottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['50%', '100%']}
            index={0}
          >
            <BottomSheetScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 16,
                }}
              >
                <Text variant="titleMedium">Search settings</Text>
                <Button
                  onPress={() => {
                    onClear();
                    bottomSheetRef.current?.close();
                  }}
                  disabled={activeFilters.length === 0}
                >
                  Clear All
                </Button>
              </View>
              <List.Section>
                <AnimeOrderSelect
                  value={values}
                  onChange={onSubmitHandler}
                  trigger={renderOrderTrigger}
                />
              </List.Section>
            </BottomSheetScrollView>
          </PaperBottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    </>
  );
}

export default Filters;