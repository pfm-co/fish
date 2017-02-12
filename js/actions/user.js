'use strict';

import type {
	ThunkAction,
	Action
} from './types';

const LOGGING_IN = 'LOGGING_IN';
const LOGGED_IN = 'LOGGED_IN';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGGED_OUT = 'LOGGED_OUT';
const UPDATE_ADDITIONAL_INFO = 'UPDATE_ADDITIONAL_INFO';

import I18n from 'react-native-i18n'


function login(username: ? string, password : ? string): ThunkAction {
	return (dispatch) => {
		dispatch({
			type: LOGGING_IN,
			data: {
				username: username,
				password: password
			}
		});

		let userCredentials = {
			username: username,
			password: password
		};

		let data = JSON.stringify(userCredentials);

		try {
			fetch("http://fish.medu.ir/api/login", {
					method: "POST",
					headers: new Headers({
						'content-type': 'application/json'
					}),
					body: data,
				})
				.then(result => {
					return result.json()
				})
				.then(result => {
					if (result) {
						if (result.status) {
							dispatch({
								type: LOGGED_IN,
								data: {
									firstName: result.data.name.replace(/ي/g, 'ی'),
									lastName: result.data.family.replace(/ي/g, 'ی'),
									personelCode: result.data.personel_code,
									nationalCode: result.data.national_code,
									token: result.data.token
								}
							});
						} else {
							dispatch({
								type: LOGIN_ERROR,
								errorMsg: result.message,
							})
						}
					} else {
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
		} catch (e) {
			console.log("Error logging in: ", e);
			dispatch({
				type: LOGIN_ERROR,
				errorMsg: I18n.t('Login.UnknownError')
			})
		}

	};
}

function updateAdditionalInfo(province: string, region: string, bankName: string, accountNumber: string): Action {
	return {
		type: UPDATE_ADDITIONAL_INFO,
		province,
		region,
		bankName,
		accountNumber
	};
}


function logout(): Action {
	return {
		type: LOGGED_OUT
	};
}


module.exports = {
	login,
	logout,
	updateAdditionalInfo,
	LOGGING_IN,
	LOGIN_ERROR,
	LOGGED_OUT,
	LOGGED_IN,
	UPDATE_ADDITIONAL_INFO
};