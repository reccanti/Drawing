var React = require("react");
var store = require("../../stores/reduxStore.js");
var connect = require("react-redux").connect;

var Router = require("react-router");
var Link = Router.Link;
var browserHistory = Router.browserHistory;

require("whatwg-fetch");


/**
 * This is mostly for testing right now. The app will 
 * render a username taken from the store.
 */
var AppLayout = React.createClass({
    _logout: function(e) {
        e.preventDefault();
        fetch("/session/logout", {
            method: "POST",
            credentials: "include"
        })
            .then(function(res) {
                store.dispatch({
                    type: "LOGOUT"
                });
                browserHistory.push("/login");
            });
    },
    render: function() {
        return (
            <div>
                <p>{this.props.username}</p>
                <Link to="/login" onClick={this._logout}>Log out</Link>
            </div>
        );
    } 
});


/**
 * This component connects the AppLayout with the store, 
 * assigning the username as a prop
 */
var component = connect(function(store) {
    return {
        username: store.loginState.username
    };
})(AppLayout);


/**
 * Export th connected component
 */
module.exports = component;