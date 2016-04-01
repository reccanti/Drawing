var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;
var Provider = require("react-redux").Provider;

var store = require("../../stores/reduxStore.js");

var SignupLayout = require("./signup.jsx");
var LoginLayout = require("./login.jsx");
var AppLayout = require("./app.jsx");


/**
 * This function checks to see if the user has been authenticated
 */
var checkAuth = function(nextState, replace) {
    console.log("checking");
    console.log(store.getState());
    if (!store.getState().loginState.username) {
        replace({
            pathname: "/login"
        });
    }
};


/**
 * Set up the Routes for the React app
 */
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={AppLayout} onEnter={checkAuth} />
            <Route path="/signup" component={SignupLayout} />
            <Route path="/login" component={LoginLayout} />
        </Router>
    </Provider>,
    document.getElementById("container")
);