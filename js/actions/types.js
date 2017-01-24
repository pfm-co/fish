'use strict';

type ParseObject = Object;


export type Action =
    {   type: 'APP_STARTED' }
    | { type: 'LOGGING_IN', data: { username: string; password: string; } }
    | { type: 'LOGGED_IN',  data: { token: string, firstName: string; lastName: string; personelCode: string; nationalCode: string} }
    | { type: 'LOGIN_ERROR', errorMsg: string }
    | { type: 'LOGGED_OUT', autoLoginNext: boolean}
    | { type: 'SWITCH_TAB', tab, data }
    | { type: 'CHANGE_APP_LANGUAGE', language: string }
    | { type: 'SET_PAYSLIP_YEAR_MONTH', month: int; year: int }
;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
