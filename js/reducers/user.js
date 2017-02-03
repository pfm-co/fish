'use strict';

import type { Action } from '../actions/types';
import { LOGGING_IN, LOGGED_IN, LOGIN_ERROR, LOGGED_OUT, USER_PROVINCE_INFO} from '../actions/user';

export type State = {
	isLoggedIn: boolean,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    isLoginInProgress: boolean,
    errorMsg: string,
    hasError: boolean,
    personelCode: string,
    nationalCode: string,
	province: string,
	region: string,
    token: string,
}

const initialState = {
	username: '0569394910',
	password: '3qag8pbv',
	firstName: '',
	lastName: '',
	personelCode: '',
	nationalCode: '',
	isLoggedIn: false,
	isLoginInProgress: false,
	errorMsg: '',
	hasError: false,
	region: '',
	province: '',
	token: '',
};


export default function (state:State = initialState, action:Action): State {
	if (action.type === LOGGING_IN) {
		console.log("LOGGING_IN");
		return {
			...state,
			username: action.data.username,
			password: action.data.password,
			isLoginInProgress: true,
		};
	}
	else if (action.type === LOGGED_IN)
	{
		console.log("LOGGED_IN");

		return {
			...state,
			firstName: action.data.firstName,
			lastName: action.data.lastName,
			personelCode: action.data.personelCode,
			nationalCode: action.data.nationalCode,
			token: action.data.token,
			isLoggedIn: true,
			hasError: false,
			errorMsg: '',
			isLoginInProgress: false,
		};
	}
  	else if (action.type === LOGIN_ERROR)
	{
		console.log("LOGIN_ERROR");
		return {
			...state,
			isLoggedIn: false,
			hasError: true,
			errorMsg: action.errorMsg,
			isLoginInProgress: false,
		};	
	}
  	else if (action.type === LOGGED_OUT)
	{
		console.log("LOGGED_OUT");
		return initialState;
	}
	else if (action.type === USER_PROVINCE_INFO)
	{
		return {
			...state,
			province: action.province,
			region: action.region,
		};
	}

	return state;
}
