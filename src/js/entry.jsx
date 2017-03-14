var React = require('react');
var ReactDOM = require('react-dom');
// var AppRoute = require('./components/container/route.jsx');
import AppRoute from './components/container/route.jsx';
// var store = require('./stores/reduxStore.js');

// var renderApp;
require('whatwg-fetch');


// /**
//  * Renders the App
//  */
// renderApp = function () {

// };

ReactDOM.render(
    <AppRoute />,
    document.getElementById('container')
);
//  /**
//   * Check for a session, and if it exists, store
//   * the logged in information.
//   */
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
