const LOGIN_PENDING = "LOGIN_PENDING";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

function setLoginPending(isLoginPending) {
	return {
		type: LOGIN_PENDING,
		isLoginPending
	};
}

function setLoginSuccess(isLoginSuccess) {
	return {
		type: LOGIN_SUCCESS,
		isLoginSuccess
	};
}

function setLoginError(loginError) {
	return {
		type: LOGIN_ERROR,
		loginError
	};
}

export function login(email, password, companyName) {
	return dispatch => {
		dispatch(setLoginPending(true));
		dispatch(setLoginSuccess(false));
		dispatch(setLoginError(null));

		sendLoginRequest(email, password, companyName)
			.then(success => {
				dispatch(setLoginPending(false));
				dispatch(setLoginSuccess(success.Message));
			})
			.catch(err => {
				dispatch(setLoginPending(false));
				dispatch(setLoginError(err.message));
			});
	}
}

export default function reducer(state = {
	isLoginPending: false,
	isLoginSuccess: false,
	loginError: null,
}, action) {
	switch(action.type) {
		case LOGIN_SUCCESS: 
		return {
			...state,
			isLoginSuccess: action.isLoginSuccess,
		};

		case LOGIN_PENDING: 
		return {
			...state,
			isLoginPending: action.isLoginPending
		};

		case LOGIN_ERROR: 
		return {
			...state,
			loginError: action.loginError
		};

		default:
		return state;
	}
}

function sendLoginRequest(email, password, companyName) {
	return new Promise((resolve,reject) => {
		if(email.value !== '' && password.value !== '' && companyName !== '') {
			fetch('data.json', {
		      method: 'get'
		       }).then(function(res) {
		       	res.json().then(function(response){
		       		return resolve(response);
		       	})
		       });   
		} else {
			fetch('error.json', {
		      method: 'get'
		       }).then(function(res){
		        res.json().then(function(response){
		       		return reject(new Error(response.error));
		       	})
		    });   
			
		}
	});
	 
}