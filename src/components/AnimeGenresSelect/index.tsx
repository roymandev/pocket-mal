import { useCallback, useRef } from 'react';

import { useSetState } from '@/hooks/useSetState';
import { BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';

import FilterFooter from '../FilterFooter';
import PaperBottomSheetModal from '../PaperBottomSheetModal';
import Form from './Form';
import { AnimeGenresSelectTriggerProps, AnimeGenresSelectValue } from './types';

type Props = {
  initialValues: AnimeGenresSelectValue;
  onApply: (values: AnimeGenresSelectValue) => void;
  renderTrigger: (props: AnimeGenresSelectTriggerProps) => React.ReactNode;
};

function AnimeGenresSelect({ initialValues, onApply, renderTrigger }: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [values, setValues] = useSetState({
    genres: initialValues.genres,
    genres_exclude: initialValues.genres_exclude,
  });

  const onApplyHanlder = () => {
    onApply(values);
    bottomSheetRef.current?.close();
  };

  // render
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <FilterFooter
        {...props}
        clearButtonProps={{
          disabled: !values.genres?.length && !values.genres_exclude?.length,
          onPress: () => {
            setValues({
              genres: undefined,
              genres_exclude: undefined,
            });
          },
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
        initialValuesLength:
          (initialValues.genres?.length || 0) +
          (initialValues.genres_exclude?.length || 0),
        onPress: () => bottomSheetRef.current?.present(),
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
