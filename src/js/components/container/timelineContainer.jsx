var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../stores/actions');
var Timeline = require('../presentation/timeline.jsx');
var component;
var store = require('../../stores/reduxStore.js');


/**
 * This class waits for image updates, fetches them, and
 * displays the appropriate images
 */
/* eslint react/prefer-stateless-function: 0 */
var TimelineContainer = React.createClass({
    componentDidMount: function () {
        store.dispatch(actions.Timeline.Update());
    },
    render: function () {
        return (
            <Timeline images={this.props.images}/>
        );
    },
});

/**
 * This function maps store values to the form
 * properties
 */
function mapToProps(connectStore) {
    return {
        images: connectStore.timelineState.images,
    };
}


/**
 * Create a component that connects the store with the
 * layout and export it.
 */
component = connect(mapToProps)(TimelineContainer);
module.exports = component;
