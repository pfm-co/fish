'use strict';

type ParseObject = Object;


export type Action =
    {   type: 'APP_STARTED' }
    | { type: 'LOGGING_IN', source: ?string; data: { username: string; password: string; } }
    | { type: 'LOGGED_IN', source: ?string; data: { id: string; name: string; serverAddress: string} }
    | { type: 'LOGIN_ERROR', errorMsg: string }
    | { type: 'LOGGED_OUT' autoLoginNext: boolean}
    | { type: 'SWITCH_TAB', tab, data }
    | { type: 'CHANGE_APP_LANGUAGE', language: string }
;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
