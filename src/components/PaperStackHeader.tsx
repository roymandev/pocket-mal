import { Appbar, useTheme } from 'react-native-paper';

import { StackHeaderProps } from '@react-navigation/stack';

import { router } from 'expo-router';

import { PaperStackOptions } from './utils/PaperStack';

type Props = StackHeaderProps & {
  options: PaperStackOptions;
  children?: React.ReactNode;
  mode?: 'small' | 'medium' | 'large' | 'center-aligned';
};

function PaperStackHeader({ children, options, back, mode = 'small' }: Props) {
  const theme = useTheme();

  return (
    <Appbar.Header mode={mode} style={{ backgroundColor: 'transparent' }}>
      {back ? <Appbar.BackAction onPress={router.back} /> : null}
      <Appbar.Content
        title={options.title || ''}
        titleStyle={theme.fonts.titleMedium}
      />
      {children}
    </Appbar.Header>
  );
}

export default PaperStackHeader;
