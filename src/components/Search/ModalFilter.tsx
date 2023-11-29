import { View } from 'react-native';
import {
  Appbar,
  Badge,
  Modal,
  Portal,
  SegmentedButtons,
  Text,
  Tooltip,
  useTheme,
} from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';

import { ANIME_SCORES, ANIME_STATUS, ANIME_TYPES } from '@/constant';
import { useSetState } from '@/hooks/useSetState';
import { operations } from '@/schema';
import { capitalize } from '@/utils/formatter';

import BottomBar from '../BottomBar';
import ChipSelect from '../ChipSelect';

type Filters = Omit<
  NonNullable<operations['getAnimeSearch']['parameters']['query']>,
  'q'
>;

type Props = {
  visible: boolean;
  onDismiss: () => void;
  initialValues: Partial<Filters>;
  onApply: (filters: Partial<Filters>) => void;
};

function ModalFilter({ visible, onDismiss, initialValues, onApply }: Props) {
  const theme = useTheme();

  const [filters, setFilter, overrideFilters] = useSetState<Filters>({});

  const onCloseModalHandler = () => {
    overrideFilters(initialValues);
    onDismiss();
  };

  const onApplyHandler = () => {
    onApply({
      ...Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== undefined)
      ),
    });
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCloseModalHandler}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          flex: 1,
          justifyContent: 'flex-start',
        }}
        dismissable={false}
        dismissableBackButton
        style={{
          marginTop: 0,
        }}
      >
        <Appbar.Header>
          <Tooltip title="Go Back">
            <Appbar.BackAction onPress={onCloseModalHandler} />
          </Tooltip>

          <Appbar.Content title="Filter" />
        </Appbar.Header>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text variant="titleMedium">Type</Text>
            <ChipSelect
              data={ANIME_TYPES}
              mapItem={(item) => ({ value: item, text: capitalize(item) })}
              selected={filters.type}
              setSelected={(value) => setFilter({ type: value })}
            />
          </View>

          <View style={{ gap: 8 }}>
            <Text variant="titleMedium">Score</Text>
            <ChipSelect
              data={ANIME_SCORES}
              mapItem={(item) => ({ value: item })}
              selected={filters.score}
              setSelected={(value) => setFilter({ score: value })}
            />
          </View>

          <View style={{ gap: 8 }}>
            <Text variant="titleMedium">Status</Text>
            <SegmentedButtons
              value={filters.status || ''}
              onValueChange={(value) =>
                setFilter({
                  status: filters.status === value ? undefined : value,
                } as any)
              }
              buttons={ANIME_STATUS.map((status) => ({
                value: status,
                label: capitalize(status),
              }))}
            />
          </View>
        </ScrollView>

        <BottomBar
          fabProps={{
            icon: 'check',
            onPress: onApplyHandler,
          }}
        >
          <View>
            <Appbar.Action icon="broom" onPress={() => overrideFilters({})} />
            <Badge style={{ position: 'absolute', top: 0, right: 0 }}>
              {Object.keys(filters).reduce(
                (acc, key) =>
                  filters[key as keyof typeof filters] ? acc + 1 : acc,
                0
              )}
            </Badge>
          </View>
        </BottomBar>
      </Modal>
    </Portal>
  );
}

export default ModalFilter;
