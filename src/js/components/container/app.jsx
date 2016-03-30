var React = require("react");
var store = require("../../stores/reduxStore.js");
var connect = require("react-redux").connect;


/**
 * This is mostly for testing right now. The app will 
 * render a username taken from the store.
 */
var AppLayout = React.createClass({
   render: function() {
       return (
           <p>{this.props.username}</p>
       );
   } 
});


/**
 * This component connects the AppLayout with the store, 
 * assigning the username as a prop
 */
var component = connect(function(store) {
    return {
        username: store.sessionState.username
    };
})(AppLayout);


/**
 * Export th connected component
 */
module.exports = component;