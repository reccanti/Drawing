var React = require('react');
var Link = require('react-router').Link;

var LoginButton = function (props) {
    // var canvasPath = 'u/' + this.props.params.username + '/new';
    return (
        <Link to="/login" className="waves-effect waves-light btn">Log In</Link>
    );
};

module.exports = LoginButton;