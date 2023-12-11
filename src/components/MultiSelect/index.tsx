import { useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

import PaperBottomSheetModal from '../PaperBottomSheetModal';
import List from './List';
import { MultiSelectItem } from './types';

type MultiSelectTriggerProps = {
  onPress?: () => void;
};

type Props = {
  options: MultiSelectItem[];
  initialValues: string[];
  onChange: (values: string[]) => void;
  renderTrigger: (props: MultiSelectTriggerProps) => React.ReactNode;
};

function MultiSelect({
  options,
  initialValues,
  onChange,
  renderTrigger,
}: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const values = useRef(initialValues);

  const triggerPressHandler = () => {
    bottomSheetRef.current?.present();
    values.current = initialValues;
  };

  const dismisHandler = () => {
    onChange(values.current);
  };

  return (
    <>
      {renderTrigger({ onPress: triggerPressHandler })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['50%', '100%']}
        onDismiss={dismisHandler}
      >
        <List
          options={options}
          initialValues={initialValues}
          onChange={(newValues) => {
            values.current = newValues;
          }}
        />
      </PaperBottomSheetModal>
    </>
  );
}

export default MultiSelect;
