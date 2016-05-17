var _ = require('lodash');

/**
 * This handles whether or not the overlay should be
 * displayed
 */
var SelectedImageReducer = function (state, action) {
    var baseState = {
        image: {},
    };
    var newState = {};
    if (!state) {
        return baseState;
    }
    if (action.type === 'IMAGE_RETRIEVED') {
        newState = _.assign({}, baseState, {
            image: action.image,
        });
        return newState;
    }
    return state;
};

module.exports = SelectedImageReducer;
