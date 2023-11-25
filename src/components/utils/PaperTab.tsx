import { ParamListBase, TabNavigationState } from '@react-navigation/native';

import { withLayoutContext } from 'expo-router';
import {
  MaterialBottomTabNavigationEventMap,
  MaterialBottomTabNavigationOptions,
  createMaterialBottomTabNavigator,
} from 'react-native-paper/react-navigation';

const { Navigator } = createMaterialBottomTabNavigator();

export const PaperTab = withLayoutContext<
  MaterialBottomTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(Navigator);
