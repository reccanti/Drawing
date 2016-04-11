var React = require('react');
var store = require('../../stores/reduxStore.js');
var connect = require('react-redux').connect;

var Router = require('react-router');
var Link = Router.Link;
var browserHistory = Router.browserHistory;

var Overlay = require('./overlay.jsx');
var DrawingCanvas = require('../presentation/canvas.jsx');

var AppLayout;
var component;

require('whatwg-fetch');


/**
 * This is mostly for testing right now. The app will
 * render a username taken from the store.
 */
/* eslint quote-props: 0 */
AppLayout = React.createClass({


    /**
     * Validate props
     */
    propTypes: {
        username: React.PropTypes.string,
    },


    /**
     * Set the initial state of the movie
     */
    getInitialState: function () {
        return {
            overlay: true,
        };
    },


    /**
     * Logs the user out of the system
     */
    _logout: function (e) {
        e.preventDefault();
        fetch('/session/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then(function () {
                store.dispatch({
                    type: 'LOGOUT',
                });
                browserHistory.push('/login');
            });
    },


    /**
     * This function will set the state of the app and tell it whether
     * or not to display the overlay
     */
    _closeOverlay: function () {
        this.setState({ 'overlay': false });
    },


    /**
     * Render the app screen
     */
    render: function () {
        var overlay = undefined;
        if (this.state.overlay) {
            overlay = (
                <Overlay close={this._closeOverlay}>
                    <DrawingCanvas width={450} height={450} />
                </Overlay>
            );
        }
        return (
            <div>
                {overlay}
                <p>{this.props.username}</p>
                <Link to="/login" onClick={this._logout}>Log out</Link>
            </div>
        );
    },
});


/**
 * This component connects the AppLayout with the store,
 * assigning the username as a prop
 */
component = connect(function (connectStore) {
    return {
        username: connectStore.loginState.username,
    };
})(AppLayout);


/**
 * Export th connected component
 */
module.exports = component;
