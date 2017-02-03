
import type { Action } from './types';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

import { actions } from 'react-native-navigation-redux-helpers';
const {
  replaceAt,
  popRoute,
  pushRoute,
} = actions;

export function openDrawer():Action {
  return {
    type: OPEN_DRAWER,
  };
}

export function closeDrawer():Action {
  return {
    type: CLOSE_DRAWER,
  };
}


export function navigateTo(route, homeRoute) {
  return (dispatch, getState) => {
    const navigation = getState().cardNavigation;
    const currentRouteKey = navigation.routes[navigation.routes.length - 1].key;

    dispatch(closeDrawer());

    if (currentRouteKey !== homeRoute && route !== homeRoute) {
      dispatch(replaceAt(currentRouteKey, { key: route, index: 1 }, navigation.key));
    } else if (currentRouteKey !== homeRoute && route === homeRoute) {
      dispatch(popRoute(navigation.key));
    } else if (currentRouteKey === homeRoute && route !== homeRoute) {
      dispatch(pushRoute({ key: route, index: 1 }, navigation.key));
    }
  };
}
