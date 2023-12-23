import { useRef, useState } from 'react';
import { Text } from 'react-native-paper';

import ChipSelect from '@/components/ChipSelect';
import FilterFooter from '@/components/FilterFooter';
import PaperBottomSheetModal from '@/components/PaperBottomSheetModal';
import { ANIME_TYPES, AnimeType } from '@/constant';
import {
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { FilterBaseTriggerProps } from './types';

type Props = {
  value?: AnimeType;
  onChange: (value?: AnimeType) => void;
  renderTrigger: (props: FilterBaseTriggerProps) => React.ReactNode;
};

function FilterType({ value, onChange, renderTrigger }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [_value, setValue] = useState(value);

  const openFilterHandler = () => {
    bottomSheetRef.current?.present();
  };

  const onChangeHandler = () => {
    onChange(_value);
    bottomSheetRef.current?.dismiss();
  };

  // render
  const renderFooter = (props: BottomSheetFooterProps) => (
    <FilterFooter
      {...props}
      clearButtonProps={{
        disabled: !_value,
        onPress: () => setValue(undefined),
      }}
      applyButtonProps={{
        onPress: onChangeHandler,
      }}
    />
  );

  return (
    <>
      {renderTrigger({
        children: value ? ANIME_TYPES[value] : 'Type',
        onPress: openFilterHandler,
      })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={[300]}
        index={0}
        footerComponent={renderFooter}
      >
        <BottomSheetView style={{ paddingHorizontal: 16, gap: 8 }}>
          <Text variant="titleMedium">Filter Type</Text>

          <ChipSelect
            data={Object.keys(ANIME_TYPES)}
            mapItem={(key) => ({
              value: key as AnimeType,
              text: ANIME_TYPES[key as AnimeType],
            })}
            selected={_value}
            setSelected={(key) => setValue(key as AnimeType)}
          />
        </BottomSheetView>
      </PaperBottomSheetModal>
    </>
  );
}

export default FilterType;
