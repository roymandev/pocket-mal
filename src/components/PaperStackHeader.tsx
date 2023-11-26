import { StyleProp, TextStyle } from 'react-native';
import { Appbar } from 'react-native-paper';

import { StackHeaderProps } from '@react-navigation/stack';

import { router } from 'expo-router';

import { PaperStackOptions } from './utils/PaperStack';

type Props = StackHeaderProps & {
  options: PaperStackOptions;
  children?: React.ReactNode;
  sx?: {
    title?: StyleProp<TextStyle>;
  };
  mode?: 'small' | 'medium' | 'large' | 'center-aligned';
};

function PaperStackHeader({
  children,
  options,
  back,
  sx,
  mode = 'small',
}: Props) {
  return (
    <Appbar.Header mode={mode} style={{ backgroundColor: 'transparent' }}>
      {back ? <Appbar.BackAction onPress={router.back} /> : null}
      <Appbar.Content title={options.title || ''} titleStyle={sx?.title} />
      {children}
    </Appbar.Header>
  );
}

export default PaperStackHeader;
