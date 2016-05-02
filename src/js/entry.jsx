var React = require('react');
var ReactDOM = require('react-dom');
var AppRoute = require('./components/container/route.jsx');
var store = require('./stores/reduxStore.js');
var checkStatus;
var parseJSON;
var login;
var renderApp;
require('whatwg-fetch');


/**
 * Check the status of a fetch request and ensure it is valid
 */
checkStatus = function (res) {
    var error;
    if (res.status >= 200 && res.status < 300) {
        return res;
    }
    error = new Error(res.error);
    error.response = res;
    throw error;
};


/**
 * Parse the JSON response from the request
 */
parseJSON = function (res) {
    return res.json();
};


/**
 * Get the login information of the User
 */
login = function (res) {
    store.dispatch({
        type: 'LOGIN_SUCCESS',
        results: res,
    });
    renderApp();
};


/**
 * Renders the App
 */
renderApp = function () {
    ReactDOM.render(
        <AppRoute />,
        document.getElementById('container')
    );
};


 /**
  * Check for a session, and if it exists, store
  * the logged in information.
  */
fetch('/session/login', {
    method: 'POST',
    credentials: 'include',
})
    .then(checkStatus)
    .then(parseJSON)
    .then(login)
    .catch(function (err) {
        var errormsg = err.response;
        store.dispatch({
            type: 'LOGIN_FAILURE',
            error: errormsg,
        });
        renderApp();
    });
