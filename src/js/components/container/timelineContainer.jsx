var React = require('react');
var connect = require('react-redux').connect;
// var DrawingImage = require('../presentation/image.jsx');
var component;
// var store = require('../../stores/reduxStore.js');


/**
 * This class waits for image updates, fetches them, and
 * displays the appropriate images
 */
/* eslint react/prefer-stateless-function: 0 */
var TimelineContainer = React.createClass({
    render: function () {
        return (
            <div></div>
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
component = connect(mapToProps)(TimelineContainer);
module.exports = component;
