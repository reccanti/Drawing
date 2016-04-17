var _ = require('lodash');

/**
 * This handles whether or not the overlay should be
 * displayed
 */
var OverlayReducer = function (state, action) {
    var baseState = {
        open: false,
    };
    var newState = {};
    if (!state) {
        return baseState;
    }
    if (action.type === 'OVERLAY_CLOSE') {
        newState = _.assign({}, baseState, {
            open: false,
        });
        return newState;
    } else if (action.type === 'OVERLAY_OPEN') {
        newState = _.assign({}, baseState, {
            open: true,
        });
        return newState;
    }
    return state;
};

module.exports = OverlayReducer;
