// var React = require('react');
// var store = require('../../stores/reduxStore.js');
// var connect = require('react-redux').connect;

// var Router = require('react-router');
// var Link = Router.Link;
// var browserHistory = Router.browserHistory;

// var Overlay = require('./overlay.jsx');
// var CanvasContainer = require('./canvasContainer.jsx');
// var TimelineContainer = require('./timelineContainer.jsx');
// // var DrawingCanvas = require('../presentation/canvas.jsx');

// var AppLayout;
// var component;

import React, { Component, PropTypes } from 'react';
import store from '../../stores/reduxStore';
import { connect } from 'react-redux';

import Router, { Link, browserHistory } from 'react-router';

import Overlay from './overlay.jsx';
import CanvasContainer from './canvasContainer.jsx';
import TimelineContainer from './timelineContainer.jsx';

import 'whatwg-fetch';

/**
 * This is mostly for testing right now. The app will
 * render a username taken from the store.
 */
/* eslint quote-props: 0 */

const AppLayoutOrig = React.createClass({


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
        // var _this = this;
        // fetch('/user/getImages', {
        //     method: 'POST',
        //     credentials: 'include',
        // })
        // .then(function (res) {
        //     return res.json();
        // })
        // .then(function (res) {
        //     var urls = [];
        //     res.drawings.map(function (data) {
        //         urls.push(data.image);
        //         return 0;
        //     });
        //     _this.setState({ 'dataURLs': urls });
        //     return 0;
        // });
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
                // browserHistory.push('/login');
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
        var userText = "";
        if (this.props.displayOverlay) {
            overlay = (
                <Overlay close={this._closeOverlay} open={this._openOverlay}>
                    <CanvasContainer />
                </Overlay>
            );
        }
        
        if (this.props.username) {
            userText = this.props.username;
        } else {
            userText = "Not currently logged in";
        }
        
        return (
            <div>
                <div className="Main row">
                    <TimelineContainer username={this.props.params.username} />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    },
});

/**
 * This is mostly for testing right now. The app will
 * render a username taken from the store.
 */
/* eslint quote-props: 0 */
class AppLayout extends Component {
    /**
     * Set initial properties
     */
    static propTypes = {
        username: PropTypes.string,
        displayOverlay: PropTypes.bool
    }
    
    state = {
        overlay: false,
        dataURLs: []
    }

    /**
     * Sets the initial state of the component
     * @param {*} props the props passed to the components
     */
    constructor(props) {
        super(props);
    }

    /**
     * Log the user out of the system
     */
    _logout (e) {
        e.preventDefault();
        fetch('/session/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(() => {
            store.dispatch({
                type: 'LOGOUT'
            });
        });
    }

    /**
     * Tells the app to hide the overlay by
     * setting the state
     */
    _closeOverlay () {
        store.dispatch({
            type: 'OVERLAY_CLOSE',
            open: false
        });
    }

    /**
     * Tells the app to open the overlay by
     * setting the state
     */
    _openOverlay () {
        store.dispatch({
            type: 'OVERLAY_OPEN',
            open: true
        });
    }

    /**
     * Render the app screen
     */
    render() {
        // get the username text if the user is logged in
        const userText = this.props.username ? this.props.username : 'Not currently logged in';

        return (
            <div>
                <div className='Main row'>
                    <TimelineContainer username={this.props.params.username} />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

/**
 * Maps the state of the application to the props of
 * the component
 */
const mapStateToProps = (connectStore) => {
    return {
        username: connectStore.loginState.username,
        displayOverlay: connectStore.overlayState.open,
    };
}

/**
 * This component connects the AppLayout with the store,
 * assigning the username as a prop
 */
const component = connect(
    mapStateToProps
)(AppLayout);


/**
 * Export the connected component
 */
export { component as AppLayout };
