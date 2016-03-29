var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

var SignupLayout = require("../layout/signup.jsx");
var LoginLayout = require("../layout/login.jsx");

/**
 * Set up the Routes for the React app
 */
ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={SignupLayout} />
        <Route path="/login" component={LoginLayout} />
    </Router>,
    document.getElementById("container")
);