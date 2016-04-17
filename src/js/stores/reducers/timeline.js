var _ = require('lodash');

/**
 * This handles whether or not the overlay should be
 * displayed
 */
var TimelineReducer = function (state, action) {
    var baseState = {
        images: [],
    };
    var newState = {};
    if (!state) {
        return baseState;
    }
    if (action.type === 'TIMELINE_UPDATE') {
        newState = _.assign({}, baseState, {
            images: action.images,
        });
        return newState;
    }
    return state;
};

module.exports = TimelineReducer;
