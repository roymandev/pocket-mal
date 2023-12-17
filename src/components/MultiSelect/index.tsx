import { useRef, useState } from 'react';
import { View } from 'react-native';
import { Chip, Text } from 'react-native-paper';

import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet';

import PaperBottomSheetModal from '../PaperBottomSheetModal';
import List from './List';
import { MultiSelectItem } from './types';

type MultiSelectTriggerProps = {
  onPress?: () => void;
};

type Props = {
  title?: string;
  options: MultiSelectItem[];
  initialValues: string[];
  unavailableValues?: string[];
  onChange: (values: string[]) => void;
  renderTrigger: (props: MultiSelectTriggerProps) => React.ReactNode;
  snapPoints?: BottomSheetProps['snapPoints'];
};

function MultiSelect({
  initialValues,
  onChange,
  renderTrigger,
  title,
  snapPoints,
  ...rest
}: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [values, setValues] = useState(initialValues);

  const triggerPressHandler = () => {
    bottomSheetRef.current?.present();
    setValues(initialValues);
  };

  const dismisHandler = () => {
    onChange(values);
  };

  return (
    <>
      {renderTrigger({ onPress: triggerPressHandler })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints || ['50%', '100%']}
        onDismiss={dismisHandler}
      >
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text variant="titleMedium">{title || 'Select'}</Text>

          <Chip>{values.length}</Chip>
        </View>
        <List initialValues={initialValues} onChange={setValues} {...rest} />
      </PaperBottomSheetModal>
    </>
  );
}

export default MultiSelect;
