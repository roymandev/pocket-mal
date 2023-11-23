import { Children, isValidElement } from 'react';

import { ParamListBase, TabNavigationState } from '@react-navigation/native';

import { withLayoutContext } from 'expo-router';
import {
  MaterialBottomTabNavigationEventMap,
  MaterialBottomTabNavigationOptions,
  createMaterialBottomTabNavigator,
} from 'react-native-paper/react-navigation';

const { Navigator } = createMaterialBottomTabNavigator();

// eslint-disable-next-line react/function-component-definition
const FilteredNavigator: typeof Navigator = ({ children, ...rest }) => {
  const filtered = Children.toArray(children).filter((child) => {
    if (!isValidElement(child)) return false;

    if (['_sitemap', '[...404]'].includes(child.props.name)) return false;
    if (child.props.options().href === null) return false;
    return true;
  });

  return <Navigator {...rest}>{filtered}</Navigator>;
};

export const PaperTab = withLayoutContext<
  MaterialBottomTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(FilteredNavigator);
