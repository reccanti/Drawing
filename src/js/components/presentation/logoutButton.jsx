var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var actions = require('../../stores/actions');
var browserHistory = Router.browserHistory;
var store = require('../../stores/reduxStore.js');

var LogoutButton = React.createClass({
    // var canvasPath = 'u/' + this.props.params.username + '/new';
    onClick: function (e) {
        e.preventDefault();
        store.dispatch(actions.Session.Logout(function() {
            browserHistory.push('/login')
        }));
    },
    
    render: function () {
        return (
            <a className="waves-effect waves-light btn" onClick={this.onClick}>Log Out, {this.props.username}</a>
        );
    }
});

module.exports = LogoutButton;