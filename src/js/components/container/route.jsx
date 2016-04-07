var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var Provider = require("react-redux").Provider;

var store = require("../../stores/reduxStore.js");

var SignupLayout = require("./signup.jsx");
var LoginLayout = require("./login.jsx");
var AppLayout = require("./app.jsx");

require("whatwg-fetch");


/**
 * This function requires the user to be logged into the
 * system. If not, they will be redirected to the login
 * page. 
 */
var requiresLogin = function(nextState, replace) {
    if (!store.getState().loginState.username) {
        replace({
            pathname: "/login"
        });
    }
};


/**
 * This function requires the user to be logged out of
 * the system. If they are not logged out, they will be
 * redirected to the root page.
 */
var requiresLogout = function(nextState, replace) {
    if (store.getState().loginState.username) {
        replace({
            pathname: "/"
        });
    }
}


/**
 * Check the status of a fetch request and ensure it is valid
 */
var checkStatus = function(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    } else {
        var error = new Error(res.error);
        error.response = res;
        throw error;
    }
};


/**
 * Parse the JSON response from the request
 */
var parseJSON = function(res) {
    return res.json();
};


/**
 * Get the login information of the User
 */
var login = function(res) {
    store.dispatch({
        type: "LOGIN_SUCCESS",
        results: res
    });
    renderApp();
};
    
 
 /**
  * Check for a session, and if it exists, store 
  * the logged in information.
  */
fetch("/session/login", {
     method: "POST",
     credentials: "include"
 })
    .then(checkStatus)
    .then(parseJSON)
    .then(login)
    .catch(function(err) {
        var errormsg = err.response;
        store.dispatch({
            type: "LOGIN_FAILURE",
            error: errormsg
        });
        renderApp();
    });;

console.log("Hello gasldjfa");


/**
 * Set up the Routes for the React app
 */
var renderApp = function() { 
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory} >
                <Route path="/" component={AppLayout} onEnter={requiresLogin} />
                <Route path="/signup" component={SignupLayout} onEnter={requiresLogout} />
                <Route path="/login" component={LoginLayout} onEnter={requiresLogout} />
            </Router>
        </Provider>,
        document.getElementById("container")
    );
}