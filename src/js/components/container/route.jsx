var React = require('react');
// var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var Provider = require('react-redux').Provider;

var store = require('../../stores/reduxStore.js');

var SignupLayout = require('./signup.jsx');
var LoginLayout = require('./login.jsx');
var AppLayout = require('./app.jsx');
var Overlay = require('./overlay.jsx');
var AppContainer = require('./main.jsx');

var requiresLogin;
var requiresLogout;
var checkStatus;
var parseJSON;
var login;
var toUrl;
var errOut;
var redirect;
var AppRoute;
var tryLogin;
var redirectToPersonalPage;
var redirectToLoginPage;

require('whatwg-fetch');

/**
 * This function requires the user to be logged into the
 * system. If not, they will be redirected to the login
 * page.
 */
requiresLogin = function (nextState, replace) {
    if (!store.getState().loginState.username) {
        // replace({
        //     pathname: '/login',
        // });
    }
};


/**
 * This function requires the user to be logged out of
 * the system. If they are not logged out, they will be
 * redirected to the root page.
 */
requiresLogout = function (nextState, replace) {
    if (store.getState().loginState.username) {
        // replace({
        //     pathname: '/u/' + store.getState().loginState.username,
        // });
    }
};


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
    return res;
};


/**
 * 
 */
errOut = function (err) {
    var errormsg = err.response;
    store.dispatch({
        type: 'LOGIN_FAILURE',
        error: errormsg,
    });
    throw err;
};


/**
 * Redirect the User to the appropriate url
 */
toUrl = function(url) {
    browserHistory.push(url);
};


/**
 * Check to see if there is currently a session and try to logged
 * into the app.
 */
tryLogin = function() {
    return fetch('/session/login', {
        method: 'POST',
        credentials: 'include',
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(login)
    .catch(errOut);
};


redirectToPersonalPage = function(res) {
    var username = store.getState().loginState.username;
    toUrl('/u/' + username);
};


redirectToLoginPage = function(err) {
    toUrl('/login');
}


/**
 * fetches the login information and redirects
 * the user to the appropriate location
 */
redirect = function() {
    return tryLogin()
    .then(redirectToPersonalPage)
    .catch(redirectToLoginPage);
};



/**
 * Set up the Routes for the React app
 */
// renderApp = function () {
//     ReactDOM.render(
//         <Provider store={store}>
//             <Router history={browserHistory} >
//                 <Route path="/" component={AppLayout} onEnter={requiresLogin} />
//                 <Route path="/signup" component={SignupLayout} onEnter={requiresLogout} />
//                 <Route path="/login" component={LoginLayout} onEnter={requiresLogout} />
//             </Router>
//         </Provider>,
//         document.getElementById('container')
//     );
// };


/**
 * create a class to set up the Router
 */
AppRoute = React.createClass({
    render: function() {
        return (
            <Provider store={store}>
                <Router history={browserHistory} >
                    <Route path="/" component={AppContainer} onEnter={tryLogin}>
                        <IndexRoute onEnter={redirect} />
                        <Route path="u/:username" component={AppLayout} >
                            <Route path="i/:image" component={Overlay} />
                        </Route>
                        <Route path="login" component={LoginLayout} />
                        <Route path="signup" component={SignupLayout} />
                    </Route>
                </Router>
            </Provider>
        );
    }
});



 /**
  * Check for a session, and if it exists, store
  * the logged in information.
  */
// fetch('/session/login', {
//     method: 'POST',
//     credentials: 'include',
// })
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(login)
//     .catch(function (err) {
//         var errormsg = err.response;
//         store.dispatch({
//             type: 'LOGIN_FAILURE',
//             error: errormsg,
//         });
//         renderApp();
//     });
    
    
module.exports = AppRoute;
