var component;
var React = require('react');
var connect = require('react-redux').connect;
var Overlay = require('./overlay.jsx');
var DrawingImage = require('../presentation/image.jsx');
var actions = require('../../stores/actions');

var Router = require('react-router');
var browserHistory = Router.browserHistory;
var store = require('../../stores/reduxStore.js');

/**
 * This describes a frame that is rendered when the User enters a 
 */
var ImageDisplay = React.createClass({
    redirectToUser: function () {
        browserHistory.push('/u/' + this.props.params.username)
    },
    
    componentDidMount: function () {
        console.log(actions);
        store.dispatch(actions.Image.GetImage(this.props.params.image));
    },
    
    render: function () {
        return (
            <Overlay close={this.redirectToUser}>
                <DrawingImage dataURL={this.props.image} />
            </Overlay>
        )
    }
});


/**
 * This function maps store values to the form
 * properties
 */
function mapToProps(connectStore) {
    return {
        image: connectStore.selectedImageState.image,
    };
}


/**
 * Create a component that connects the store with the
 * layout and export it.
 */
component = connect(mapToProps)(ImageDisplay);
module.exports = component;