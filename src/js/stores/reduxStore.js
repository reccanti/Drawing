var Redux = require('redux');
var thunk = require('redux-thunk').default;
var reducers = require('./reducers');

var combinedReducers;
var devTools;
var DrawingStore;

require('whatwg-fetch');


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
    overlayState: reducers.Overlay,
    timelineState: reducers.Timeline,
    selectedImageState: reducers.SelectedImage,
});
DrawingStore = Redux.createStore(
    combinedReducers,
    Redux.compose(
        Redux.applyMiddleware(thunk),
        devTools)); // so we can use the dev tools

module.exports = DrawingStore;
