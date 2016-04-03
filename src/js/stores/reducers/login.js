var _ = require("lodash");

/**
 * This handles login information for the User
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
    else if (action.type === "LOGOUT") {
        return baseState;
    }
    return state;   
}

module.exports = LoginReducer;