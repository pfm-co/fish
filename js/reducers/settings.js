'use strict';

import type { Action } from '../actions/types';
import { CHANGE_APP_LANGUAGE, SET_PAYSLIP_YEAR_MONTH, APP_STARTED } from '../actions/settings';
var moment = require('moment-jalaali');


export type State = {
    language: string,
    payslipMonth: int,
    payslipYear: int,
    payslipMonthStr: string,
}

moment.loadPersian();

const m = moment();

const initialState = {
  language: 'fa',
  payslipMonth: m.jMonth(),
  payslipYear: m.jYear(),
  payslipMonthStr: m.format('jMMMM'),
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === CHANGE_APP_LANGUAGE) {
    return {
      ...state,
      language: action.language,
    };
  }
  else if (action.type === SET_PAYSLIP_YEAR_MONTH)
  {
    let monthStr =  m.jMonth(action.month - 1).format('jMMMM');
    monthStr = monthStr.replace("امرداد", "مرداد");

    return {
      ...state,
      payslipMonth: action.month,
      payslipYear: action.year,
      payslipMonthStr: monthStr,
    }
  }
  else if (action.type == APP_STARTED)
  {
    return {
      ...state,
      payslipMonth: initialState.payslipMonth,
      payslipYear: initialState.payslipYear,
      payslipMonthStr: initialState.payslipMonthStr,
    }
  }

  return state;
}
