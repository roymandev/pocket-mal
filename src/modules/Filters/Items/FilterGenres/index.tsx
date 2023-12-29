import { useMemo, useRef, useState } from 'react';

import { useAnimeGenres } from '@/queries/genresQueries';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Modal from '../../Modal';
import { FilterBaseTriggerProps } from '../../types';
import Form from './Form';
import { FilterGenres as FilterGenresValues } from './types';

type Props = {
  initialValues: FilterGenresValues;
  onApply: (values: FilterGenresValues) => void;
  renderTrigger: (props: FilterBaseTriggerProps) => React.ReactNode;
};

function FilterGenres({ initialValues, onApply, renderTrigger }: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const parsedVal = useMemo(
    () => ({
      genres: initialValues.genres?.split(',') || [],
      genres_exclude: initialValues.genres_exclude?.split(',') || [],
    }),
    [initialValues]
  );

  const initValLength =
    parsedVal.genres.length + parsedVal.genres_exclude.length;

  const { data: genres, isLoading } = useAnimeGenres({
    enabled: initValLength === 1 && parsedVal.genres.length === 1,
  });

  const getTriggerContent = () => {
    if (initValLength > 1 || parsedVal.genres_exclude[0])
      return `Genres (${initValLength})`;
    const genreName = genres?.find(
      (genre) => genre.mal_id === Number(parsedVal.genres[0])
    )?.name;
    if (genreName) return genreName;
    return 'Genres';
  };

  const [values, setValues] = useState(parsedVal);

  const onTriggerPressHandler = () => {
    bottomSheetRef.current?.present();
    setValues(parsedVal);
  };

  const onApplyHanlder = () => {
    // Stringify values
    const newValues = {
      genres: values.genres.length ? values.genres.join(',') : undefined,
      genres_exclude: values.genres_exclude.length
        ? values.genres_exclude.join(',')
        : undefined,
    };

    onApply(newValues);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      {renderTrigger({
        onPress: onTriggerPressHandler,
        children: getTriggerContent(),
        isLoading,
      })}

      <Modal
        ref={bottomSheetRef}
        snapPoints={[400, '100%']}
        clearButtonProps={{
          disabled: !values.genres?.length && !values.genres_exclude?.length,
          onPress: () =>
            setValues({
              genres: [],
              genres_exclude: [],
            }),
        }}
        applyButtonProps={{
          onPress: onApplyHanlder,
        }}
      >
        <Form value={values} onChange={setValues} />
      </Modal>
    </>
  );
}

export default FilterGenres;
