'use strict';

import type { Action } from './types';


export const CHANGE_APP_LANG = 'CHANGE_APP_LANG';
export const SET_PAYSLIP_YEAR_MONTH = 'SET_PAYSLIP_YEAR_MONTH';
export const APP_STARTED = 'APP_STARTED';

export function changeAppLanguage(language:string):Action {
  return {
    type: CHANGE_APP_LANG,
    language: language,
  };
}

export function changePayslipYearMonth(month: int, year: int) : Action
{
  return {
    type: SET_PAYSLIP_YEAR_MONTH,
    month,
    year
  };
}

export function appStarted()
{
  return {
    type: APP_STARTED
  };
}