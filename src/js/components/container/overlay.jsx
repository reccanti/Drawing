var React = require('react');

var connect = require('react-redux').connect;

var component;


/**
 * The overlay is displayed overtop of the main app screen.
 * The User will draw on the canvas on this overlay. The User
 * will be able to exit by clicking on an "x" in the upper
 * right corner
 */
/* eslint react/prefer-stateless-function: 0 */
var Overlay = React.createClass({


    propTypes: {
        children: React.PropTypes.object,
        close: React.PropTypes.func,
    },


    closeOverlay: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.close();
    },

    drawChildren: function(children) {
        console.log(children);
        var childrenWithProps = children.map(function (child) {
            React.cloneElement(child, { "close": this.closeOverlay });
        });
        return <div>{children}</div>
    },

    /**
     * Render the Login Form
     */
    render: function renderComponent() {
        return (
            <div className="overlay">
                <a
                  ref="closeButton"
                  className="overlay_closeButton"
                  onClick={this.closeOverlay}
                >
                X
                </a>
                {this.props.children}
            </div>
        );
    },
});


/**
 * This function maps store values to the form
 * properties
 */
function mapToProps() {
    return {};
}


/**
 * Create a component that connects the store with the
 * layout and export it.
 */
component = connect(mapToProps)(Overlay);
module.exports = component;
