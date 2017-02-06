'use strict';

import type { ThunkAction, Action } from './types';

const LOGGING_IN = 'LOGGING_IN';
const LOGGED_IN = 'LOGGED_IN';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGGED_OUT = 'LOGGED_OUT';
const USER_PROVINCE_INFO = 'USER_PROVINCE_INFO';

import I18n from 'react-native-i18n'


function login(username: ?string, password: ?string) : ThunkAction
{
	return (dispatch) => {
		dispatch({
	        type: LOGGING_IN,
	        data: { username: username, password: password}
	    });

		let userCredentials = {
			username: username,
			password: password
		};

		let data = JSON.stringify(userCredentials);

		try
		{
		    fetch("http://fish.medu.ir/api/login", {
		    	method: "POST",
	    	    headers: new Headers({'content-type': 'application/json'}),
		    	body: data,
		    })
		    .then(result => {
		    	return result.json()
		    })
		    .then(result => {
		    	if (result)
		    	{
		    		if (result.status)
		    		{
	    				dispatch({
	    					type: LOGGED_IN,
	    					data: { 
	    						firstName: result.data.name,
	    						lastName: result.data.family,
	    						personelCode: result.data.personel_code,
	    						nationalCode: result.data.national_code,
	    						token: result.data.token
    						}
	    				});
		    		}
		    		else
		    		{
	    				dispatch({
	    					type: LOGIN_ERROR,
	    					errorMsg: result.message,
	    				})
		    		}
		    	}
		    	else
		    	{
		    		dispatch({
    					type: LOGIN_ERROR,
    					errorMsg: I18n.t('Login.UnknownError')
    				})
		    	}

		    })
		    .catch(e => {
	    		console.log("Error logging in: ", e);

	    		dispatch({
					type: LOGIN_ERROR,
					errorMsg: I18n.t('Login.ServerTimeout')
				})
		    });
		}
		catch(e)
		{
			console.log("Error logging in: ", e);
    		dispatch({
				type: LOGIN_ERROR,
				errorMsg: I18n.t('Login.UnknownError')
			})
		}

	};
}

function updateProvinceInfo(province: string, region: string) : Action
{
	return {
		type: USER_PROVINCE_INFO,
		province,
		region
	};
}


function logout() : Action
{
	return {
		type: LOGGED_OUT
	};
}


module.exports = { login, logout, updateProvinceInfo, LOGGING_IN, LOGIN_ERROR, LOGGED_OUT, LOGGED_IN, USER_PROVINCE_INFO };