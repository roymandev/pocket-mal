import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import { withLayoutContext } from 'expo-router';

const { Navigator } = createStackNavigator();

export type PaperStackOptions = Omit<StackNavigationOptions, 'title'> & {
  title?: React.ReactNode;
};

const PaperStack = withLayoutContext<
  PaperStackOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);

export default PaperStack;
