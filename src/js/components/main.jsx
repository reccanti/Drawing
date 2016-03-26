var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;


/**
 * Create the Layout for the canvas
 */
var DrawingCanvas = require("./canvas.jsx");
var CanvasLayout = React.createClass({
    render: function() {
        return (
            <DrawingCanvas width={400} height={400} />
        );
    }
});


/**
 * Set up the Routes for the React app
 */
ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={CanvasLayout} />
    </Router>,
    document.getElementById("container")
);