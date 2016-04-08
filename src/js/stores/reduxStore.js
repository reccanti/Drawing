var Redux = require('redux');
var thunk = require('redux-thunk').default;
var reducers = require('./reducers');

var combinedReducers;
var devTools;
var DrawingStore;

require('whatwg-fetch');

// $.ajax({
//     cache: false,
//     type: "POST",
//     url: "/session",
//     data: data,
//     dataType: "json",
//     success: function(result, status, xhr) {
//         store.dispatch({
//             type: "LOGIN_SUCCESS",
//             results: result
//         });
//         browserHistory.push("/"); // redirect to root after signup
//     },
//     error: function(xhr, status, error) {
//         var errormsg = JSON.parse(xhr.responseText);
//         store.dispatch({
//             type: "LOGIN_FAILURE",
//             error: errormsg
//         });
//     }
// });
// console.log("fetching");
// fetch("/session", {
//     type: "GET"
// })
//     .then(function(response) {
//         console.log("got json");
//         return response.json();
//     })
//     .then(function(json) {
//         console.log("parsing json");
//         console.log(json);
//     });


/**
 * This records the session info of the User
 */
// var SessionReducer = function(state, action) {
//     if (!state) {
//         return initialState;
//     }
//     if (action.type === "USER_LOGIN") {
//         var newState = _.assign({}, state, {
//             username: action.username
//         });
//         console.log(newState);
//         return newState;
//     }
//     return state;
// };


devTools = window.devToolsExtension ?
    window.devToolsExtension() :
    function (f) {
        return f;
    };
/**
 * This creates the store from the reducers
 */
combinedReducers = Redux.combineReducers({
    loginState: reducers.Login,
});
DrawingStore = Redux.createStore(
    combinedReducers,
    Redux.compose(
        Redux.applyMiddleware(thunk),
        devTools)); // so we can use the dev tools

module.exports = DrawingStore;
