import { useRef, useState } from 'react';
import { Text } from 'react-native-paper';

import ChipSelect from '@/components/ChipSelect';
import { ANIME_TYPES, AnimeType } from '@/constant';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import Modal from '../Modal';
import { FilterBaseTriggerProps } from '../types';

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

  return (
    <>
      {renderTrigger({
        children: value ? ANIME_TYPES[value] : 'Type',
        onPress: openFilterHandler,
      })}

      <Modal
        ref={bottomSheetRef}
        snapPoints={[300]}
        clearButtonProps={{
          disabled: !_value,
          onPress: () => setValue(undefined),
        }}
        applyButtonProps={{
          onPress: onChangeHandler,
        }}
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
      </Modal>
    </>
  );
}

export default FilterType;
