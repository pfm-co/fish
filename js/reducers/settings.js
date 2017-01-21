'use strict';

import type { Action } from '../actions/types';
import { CHANGE_APP_LANGUAGE } from '../actions/user';

export type State = {
    language: string
}

const initialState = {
  language: 'fa',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === CHANGE_APP_LANGUAGE) {
    return {
      ...state,
      language: action.language,
    };
  }
  return state;
}
