
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';
import settings from './settings';

module.exports = combineReducers({

  drawer,
  user,
  cardNavigation,
  settings,

});
