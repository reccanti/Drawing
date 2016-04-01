var Redux = require("redux");
var thunk = require("redux-thunk").default;
var _ = require("lodash");


var initialState = {
};


/**
 * This records the session info of the User
 */
var SessionReducer = function(state, action) {
    if (!state) {
        return initialState;
    }
    if (action.type === "USER_LOGIN") {
        var newState = _.assign({}, state, {
            username: action.username
        });  
        console.log(newState);
        return newState;
    }
    return state;    
};


/**
 * This handles login information for the 
 */
var LoginReducer = function(state, action) {
    var baseState = {};
    if (!state) {
        return baseState;
    }
    if (action.type === "LOGIN_WAITING") {
        var newState = _.assign({}, baseState, {
            waiting: true
        });  
        console.log(newState);
        return newState;
    }
    else if (action.type === "LOGIN_SUCCESS") {
        var newState = _.assign({}, baseState, action.results);  
        return newState;
    }
    else if (action.type === "LOGIN_FAILURE") {
        var newState = _.assign({}, baseState, action.error);
        return newState;  
    }
    return state;   
}


/**
 * This creates the store from the reducers
 */
var reducers = Redux.combineReducers({
    sessionState: SessionReducer,
    loginState: LoginReducer
});
var DrawingStore = Redux.createStore(
    reducers,
    Redux.compose(
        Redux.applyMiddleware(thunk),
        window.devToolsExtension())); // so we can use the dev tools
        
    
module.exports = DrawingStore;