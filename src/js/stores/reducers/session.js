var _ = require('lodash');

/**
 * This handles login information for the User
 */
var SessionReducer = function (state, action) {
    var baseState = {};
    var newState = {};
    if (!state) {
        return baseState;
    }
    if (action.type === 'SESSION_CHECK') {
        newState = _.assign({}, baseState, {
            checking: true,
        });
        return newState;
    } else if (action.type === 'SESSION_EXISTS') {
        // var newState = _.assign({}, baseState, action.results);

        newState = {};
        return newState;
    } else if (action.type === 'SESSION_DOES_NOT_EXIST') {
        newState = _.assign({}, baseState, action.error);
        return newState;
    }
    return state;
};

module.exports = SessionReducer;
