
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';

export default combineReducers({

  drawer,
  user,
  cardNavigation,

});
