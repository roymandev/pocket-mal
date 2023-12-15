import { useRef } from 'react';
import { View } from 'react-native';
import { Badge, Button, IconButton, Text } from 'react-native-paper';

import PaperBottomSheetModal from '@/components/PaperBottomSheetModal';
import { AnimeSearchParams } from '@/types/api.types';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import List from './List';

type Values = Omit<AnimeSearchParams, 'q'>;

type Props = {
  filters: Values;
  onUpdateFilter: (values: Values) => void;
  onClear: () => void;
};

function Filters({ filters, onUpdateFilter, onClear }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const activeFilters = Object.keys(filters).filter(
    (key) => filters[key as keyof Values] !== undefined
  );

  const updateFilterHandler: typeof onUpdateFilter = (filter) => {
    onUpdateFilter(filter);
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

          <List filters={filters} onUpdateFilter={updateFilterHandler} />
        </BottomSheetScrollView>
      </PaperBottomSheetModal>
    </>
  );
}

export default Filters;
