import { useMemo, useRef } from 'react';

import { useObjectState } from '@/hooks/useObjectState';
import { BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';

import FilterFooter from '../../../../components/FilterFooter';
import PaperBottomSheetModal from '../../../../components/PaperBottomSheetModal';
import Form from './Form';
import {
  FilterGenresTriggerProps,
  FilterGenres as FilterGenresValues,
} from './types';

type Props = {
  initialValues: FilterGenresValues;
  onApply: (values: FilterGenresValues) => void;
  renderTrigger: (props: FilterGenresTriggerProps) => React.ReactNode;
};

function FilterGenres({ initialValues, onApply, renderTrigger }: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const parsedValues = useMemo(
    () => ({
      genres: initialValues.genres?.split(',') || [],
      genres_exclude: initialValues.genres_exclude?.split(',') || [],
    }),
    [initialValues]
  );

  const [values, handleValues] = useObjectState(parsedValues);

  const onTriggerPressHandler = () => {
    bottomSheetRef.current?.present();
    handleValues.set(parsedValues);
  };

  const onApplyHanlder = () => {
    const newValues = {
      genres: values.genres.length ? values.genres.join(',') : undefined,
      genres_exclude: values.genres_exclude.length
        ? values.genres_exclude.join(',')
        : undefined,
    };

    onApply(newValues);
    bottomSheetRef.current?.close();
  };

  const onClearHandler = () => {
    handleValues.set({
      genres: [],
      genres_exclude: [],
    });
  };

  // render
  const renderFooter = (props: BottomSheetFooterProps) => (
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
  );

  return (
    <>
      {renderTrigger({
        initialValues: parsedValues,
        initialValuesLength:
          parsedValues.genres.length + parsedValues.genres_exclude.length,
        openFilter: onTriggerPressHandler,
      })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['60%', '100%']}
        footerComponent={renderFooter}
      >
        <Form values={values} updateValues={handleValues.update} />
      </PaperBottomSheetModal>
    </>
  );
}

export default FilterGenres;
