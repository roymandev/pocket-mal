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
  unavailableValues?: string[];
  onChange: (values: string[]) => void;
  renderTrigger: (props: MultiSelectTriggerProps) => React.ReactNode;
};

function MultiSelect({
  initialValues,
  onChange,
  renderTrigger,
  ...rest
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
          initialValues={initialValues}
          onChange={(newValues) => {
            values.current = newValues;
          }}
          {...rest}
        />
      </PaperBottomSheetModal>
    </>
  );
}

export default MultiSelect;
