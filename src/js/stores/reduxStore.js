var Redux = require("redux");
var thunk = require("redux-thunk").default;
var reducers = require("./reducers");
var _ = require("lodash");
require("whatwg-fetch");

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
fetch("/session", {
    type: "GET"
})
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
    });


var initialState = {
};


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


/**
 * This creates the store from the reducers
 */
var reducers = Redux.combineReducers({
    //sessionState: SessionReducer,
    loginState: reducers.Login
});
var DrawingStore = Redux.createStore(
    reducers,
    Redux.compose(
        Redux.applyMiddleware(thunk),
        window.devToolsExtension())); // so we can use the dev tools
        
        

        
    
module.exports = DrawingStore;