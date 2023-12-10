import { useRef, useState } from 'react';

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

  const [_values, setValues] = useState(initialValues);

  const triggerPressHandler = () => {
    bottomSheetRef.current?.present();
    setValues(initialValues);
  };

  const dismisHandler = () => {
    onChange(_values);
  };

  return (
    <>
      {renderTrigger({ onPress: triggerPressHandler })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['50%', '100%']}
        onDismiss={dismisHandler}
      >
        <List options={options} values={_values} onChange={setValues} />
      </PaperBottomSheetModal>
    </>
  );
}

export default MultiSelect;
