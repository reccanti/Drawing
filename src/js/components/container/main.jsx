var React = require('react');
var Header = require('../presentation/header.jsx');
var Router = require('react-router');
var browserHistory = Router.browserHistory;


/**
 * The main container for the app
 */
var AppContainer = React.createClass({
    // openCanvas: function () {
    //     var canvasPath = '/u/' + this.props.params.username + '/new';
    //     browserHistory.push(canvasPath);
    // },
    
    render: function() {
        var canvasPath = '/u/' + this.props.params.username + '/new';
        return (
            <div>
                <Header canvasPath={canvasPath} />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = AppContainer;
