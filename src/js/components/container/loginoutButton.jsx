var React = require('react');
var store = require('../../stores/reduxStore');
var LoginButton = require('../presentation/loginButton.jsx');
var LogoutButton = require('../presentation/logoutButton.jsx');

var LogInOutButton = React.createClass({
    render: function () {
        var btn;
        if (store.getState().loginState.username) {
            btn = (<LogoutButton username={store.getState().loginState.username} />);
        } else {
            btn = (<LoginButton />);
        }
        return btn;
    }
});

module.exports =  LogInOutButton;