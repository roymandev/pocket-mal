import { useCallback, useRef } from 'react';

import { useSetState } from '@/hooks/useSetState';
import { BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';

import FilterFooter from '../FilterFooter';
import PaperBottomSheetModal from '../PaperBottomSheetModal';
import Form from './Form';
import { AnimeGenresSelectTriggerProps, AnimeGenresSelectValue } from './types';

const EMPTY_VALUES: AnimeGenresSelectValue = {
  genres: undefined,
  genres_exclude: undefined,
};

type Props = {
  initialValues: AnimeGenresSelectValue;
  onApply: (values: AnimeGenresSelectValue) => void;
  renderTrigger: (props: AnimeGenresSelectTriggerProps) => React.ReactNode;
};

function AnimeGenresSelect({ initialValues, onApply, renderTrigger }: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const initialValuesLength =
    (initialValues.genres?.length || 0) +
    (initialValues.genres_exclude?.length || 0);

  const [values, setValues] = useSetState(EMPTY_VALUES);

  const onTriggerPressHandler = () => {
    bottomSheetRef.current?.present();
    setValues(initialValues);
  };

  const onApplyHanlder = () => {
    onApply(values);
    bottomSheetRef.current?.close();
  };

  const onClearHandler = () => {
    setValues(EMPTY_VALUES);
  };

  // render
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <FilterFooter
        {...props}
        clearButtonProps={{
          disabled: !values.genres?.length && !values.genres_exclude?.length,
          onPress: onClearHandler,
        }}
        applyButtonProps={{
          onPress: onApplyHanlder,
        }}
      />
    ),
    [values, bottomSheetRef.current]
  );

  return (
    <>
      {renderTrigger({
        initialValuesLength,
        onPress: onTriggerPressHandler,
      })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['60%', '100%']}
        footerComponent={renderFooter}
      >
        <Form values={values} onChange={setValues} />
      </PaperBottomSheetModal>
    </>
  );
}

export default AnimeGenresSelect;
