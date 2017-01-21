'use strict';

import type { Action } from './types';


export const CHANGE_APP_LANG = 'CHANGE_APP_LANG';


export function changeAppLanguage(language:string):Action {
  return {
    type: CHANGE_APP_LANG,
    language: language,
  };
}