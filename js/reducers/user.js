'use strict';

import type { Action } from '../actions/types';
import { LOGGING_IN } from '../actions/user';

export type State = {
    username: string,
    password: string,
}

const initialState = {
  username: '1271324369',
  password: 'Arm@n123',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === LOGGING_IN) {
    return {
      ...state,
      username: action.data.username,
      password: action.data.password,
    };
  }
  return state;
}
