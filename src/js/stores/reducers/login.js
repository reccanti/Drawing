var _ = require('lodash');

/**
 * This handles login information for the User
 */
var LoginReducer = function (state, action) {
    var baseState = {};
    var newState = {};
    if (!state) {
        return baseState;
    }
    if (action.type === 'LOGIN_WAITING') {
        newState = _.assign({}, baseState, {
            waiting: true,
        });
        return newState;
    } else if (action.type === 'LOGIN_SUCCESS') {
        newState = _.assign({}, baseState, action.results);
        return newState;
    } else if (action.type === 'LOGIN_FAILURE') {
        newState = _.assign({}, baseState, action.error);
        return newState;
    } else if (action.type === 'LOGOUT') {
        return baseState;
    }
    return state;
};

module.exports = LoginReducer;
