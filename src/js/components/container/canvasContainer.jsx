var React = require('react');
var connect = require('react-redux').connect;
var DrawingCanvas = require('../presentation/canvas.jsx');
var CanvasContainer;
var component;
var store = require('../../stores/reduxStore.js');
var actions = require('../../stores/actions');
require('whatwg-fetch');


/**
 * The overlay is displayed overtop of the main app screen.
 * The User will draw on the canvas on this overlay. The User
 * will be able to exit by clicking on an "x" in the upper
 * right corner
 */
/* eslint react/prefer-stateless-function: 0 */
CanvasContainer = React.createClass({
    /**
     * Submit a form to the database
     */
    submitImage: function (data) {
        /* eslint no-console: 0 */
        var str = JSON.stringify(data);
        fetch('/user/saveImage', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: str,
        })
        // TODO: AFTER THIS, TELL THE TIMELINE IT NEEDS TO BE UPDATED. MAKE A VARIABLE IN THE STORE
        .then(function () {
            store.dispatch(actions.Overlay.Close()); // close the canvas afterwards
        });
    },


    /**
     * Render the Login Form
     */
    render: function renderComponent() {
        return (
            <DrawingCanvas
              owner={store.getState().loginState.username}
              width={450}
              height={450}
              submit={this.submitImage}
            />
        );
    },
});


/**
 * This function maps store values to the form
 * properties
 */
function mapToProps() {
    return {};
}


/**
 * Create a component that connects the store with the
 * layout and export it.
 */
component = connect(mapToProps)(CanvasContainer);
module.exports = component;
