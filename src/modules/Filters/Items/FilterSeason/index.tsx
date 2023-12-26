import { useMemo, useRef, useState } from 'react';

import RadioList from '@/components/RadioList';
import { RadioItem } from '@/components/RadioList/type';
import { AnimeSeason } from '@/constant';
import { useSeasonsList } from '@/modules/Seasons/query';
import { capitalize } from '@/utils/formatter';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import Modal from '../../Modal';
import { FilterSeasonTriggerProps, FilterSeasonValue } from './types';

type Props = {
  initialValues: FilterSeasonValue;
  onApply: (values: FilterSeasonValue) => void;
  renderTrigger: (props: FilterSeasonTriggerProps) => React.ReactNode;
};

function FilterSeason({ initialValues, onApply, renderTrigger }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useSeasonsList({ enabled: open });
  const seasonList = useMemo(
    () =>
      data?.reduce<RadioItem[]>((acc, curr) => {
        curr.seasons?.forEach((season) => {
          acc.push({
            value: `${season} ${curr.year}`,
            text: `${capitalize(season)} ${curr.year}`,
          });
        });

        return acc;
      }, []) || [],
    [data]
  );

  const [value, setValue] = useState(initialValues);
  const radioValue = value ? `${value.season} ${value.year}` : undefined;

  const onOpenHandler = () => {
    setOpen(true);
    bottomSheetRef.current?.present();
    setValue(initialValues);
  };

  return (
    <>
      {renderTrigger({ openFilter: onOpenHandler })}

      <Modal
        ref={bottomSheetRef}
        snapPoints={['100%']}
        onDismiss={() => setOpen(false)}
        applyButtonProps={{
          disabled: isLoading,
          onPress: () => {
            onApply(value);
            bottomSheetRef.current?.dismiss();
          },
        }}
      >
        <RadioList
          value={radioValue}
          items={seasonList}
          loading={isLoading}
          onChange={(val) => {
            const newValue = val.split(' ');
            setValue({
              season: newValue[0] as AnimeSeason,
              year: Number(newValue[1]),
            });
          }}
        />
      </Modal>
    </>
  );
}

export default FilterSeason;
