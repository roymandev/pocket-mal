import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import FilterFooter, { FILTER_FOOTER_HEIGHT } from '@/components/FilterFooter';
import PaperBottomSheetModal from '@/components/PaperBottomSheetModal';
import RadioList from '@/components/RadioList';
import { RadioItem } from '@/components/RadioList/type';
import { AnimeSeason } from '@/constant';
import { useSeasonsList } from '@/modules/Seasons/query';
import { capitalize } from '@/utils/formatter';
import { BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';

import { FilterSeasonTriggerProps, FilterSeasonValue } from './types';

type Props = {
  initialValues?: FilterSeasonValue;
  onApply: (values?: FilterSeasonValue) => void;
  renderTrigger: (props: FilterSeasonTriggerProps) => React.ReactNode;
  required?: boolean;
};

function FilterSeason({
  initialValues,
  onApply,
  renderTrigger,
  required,
}: Props) {
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

  // render
  const renderFooter = (props: BottomSheetFooterProps) => (
    <FilterFooter
      {...props}
      clearButtonProps={
        required
          ? undefined
          : {
              disabled: isLoading || !value,
              onPress: () => {
                onApply(undefined);
                bottomSheetRef.current?.dismiss();
              },
            }
      }
      applyButtonProps={{
        disabled: isLoading || (required && !value),
        onPress: () => {
          onApply(value);
          bottomSheetRef.current?.dismiss();
        },
      }}
    />
  );

  return (
    <>
      {renderTrigger({ openFilter: onOpenHandler })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['100%']}
        footerComponent={renderFooter}
        onDismiss={() => setOpen(false)}
      >
        <View
          style={{
            flex: 1,
            marginBottom: FILTER_FOOTER_HEIGHT,
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
        </View>
      </PaperBottomSheetModal>
    </>
  );
}

export default FilterSeason;
