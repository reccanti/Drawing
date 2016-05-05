var React = require('react');
var Header = require('../presentation/header.jsx');

var AppContainer = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = AppContainer;
