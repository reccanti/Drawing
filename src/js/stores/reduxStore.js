var Redux = require("redux");
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
 * This creates the store from the reducers
 */
var reducers = Redux.combineReducers({
    sessionState: SessionReducer
});
var DrawingStore = Redux.createStore(reducers);
module.exports = DrawingStore;