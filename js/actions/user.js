'use strict';

import type { ThunkAction, Action } from './types';

export const LOGGING_IN = 'LOGGING_IN';

function login(username: ?string, password: ?string) : ThunkAction
{
	return (dispatch) => {
		console.log("Logging in, username:", username, "password: ", password);
		dispatch({
	        type: LOGGING_IN,
	        data: { username: username, password: password}
	    });
		let userCredentials = {
			username: username,
			password: password
		};

		let formData  = new FormData();
		formData.append("json", JSON.stringify(userCredentials));
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
		    	alert(JSON.stringify(result));
		    	if (result)
		    	{
		    		if (result.status)
		    		{
	    				
		    		}
		    		else
		    		{

		    		}
		    	}

		    })
		    .catch(e => {
	    		console.log("Error logging in: ", e);
		    });
		}
		catch(e)
		{
			console.log("Error logging in: ", e)
		}

	};
}


module.exports = { login };