import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
import RegistrationForm from './components/RegistrationForm/RegistrationForm'

ReactDOM.render(
		<Provider store={store}>
		<RegistrationForm />
		</Provider>, 
	document.getElementById('root')
	);
