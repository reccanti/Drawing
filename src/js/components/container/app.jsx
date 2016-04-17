var React = require('react');
var store = require('../../stores/reduxStore.js');
var connect = require('react-redux').connect;

var Router = require('react-router');
var Link = Router.Link;
var browserHistory = Router.browserHistory;

var Overlay = require('./overlay.jsx');
var CanvasContainer = require('./canvasContainer.jsx');
var Timeline = require('./Timeline.jsx');
// var DrawingCanvas = require('../presentation/canvas.jsx');

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
        displayOverlay: React.PropTypes.bool,
    },


    /**
     * Set the initial state of the movie
     */
    getInitialState: function () {
        return {
            overlay: false,
            dataURLs: [],
        };
    },


    // TODO MOVE THIS INTO THE TIMELINE
    componentDidMount: function () {
        var _this = this;
        fetch('/user/getImages', {
            method: 'POST',
            credentials: 'include',
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            var urls = [];
            res.drawings.map(function (data) {
                urls.push(data.image);
                return 0;
            });
            _this.setState({ 'dataURLs': urls });
            return 0;
        });
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
     * This function will set the state of the app and tell it not to
     * display the overlay
     */
    _closeOverlay: function () {
        // this.setState({ 'overlay': false });
        store.dispatch({
            type: 'OVERLAY_CLOSE',
            open: false,
        });
    },


    /**
     * This function will set the state of the app and tell it to
     * display the overlay
     */
    _openOverlay: function () {
        // this.setState({ 'overlay': true });
        store.dispatch({
            type: 'OVERLAY_OPEN',
            open: true,
        });
    },


    /**
     * Render the app screen
     */
    render: function () {
        var overlay = undefined;
        if (this.props.displayOverlay) {
            overlay = (
                <Overlay close={this._closeOverlay} open={this._openOverlay}>
                    <CanvasContainer />
                </Overlay>
            );
        }
        return (
            <div>
                <div className="Main">
                    <div>
                        <p>{this.props.username}</p>
                        <button onClick={this._openOverlay}>New Drawing</button>
                        <Link to="/login" onClick={this._logout}>Log out</Link>
                    </div>
                    <Timeline dataURLs={this.state.dataURLs} />
                </div>
                {overlay}
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
        displayOverlay: connectStore.overlayState.open,
    };
})(AppLayout);


/**
 * Export th connected component
 */
module.exports = component;
