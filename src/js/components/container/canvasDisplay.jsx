var React = require('react');
var connect = require('react-redux').connect;
var Overlay = require('./overlay.jsx');
var CanvasContainer = require('./canvasContainer.jsx');

var Router = require('react-router');
var browserHistory = Router.browserHistory;

/**
 * This describes a frame that is rendered when the User enters a 
 */
var CanvasDisplay = React.createClass({
    redirectToUser: function () {
        browserHistory.push('/u/' + this.props.params.username)
    },
    
    render: function () {
        return (
            <Overlay close={this.redirectToUser}>
                <CanvasContainer />
            </Overlay>
        )
    }
});

module.exports = CanvasDisplay;