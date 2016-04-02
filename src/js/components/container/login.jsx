var React = require("react");

var store = require("../../stores/reduxStore.js");
var connect = require("react-redux").connect;
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var LoginForm = require("../presentation/loginForm.jsx");

var LoginLayout = React.createClass({
    
    
    /**
     * Given a set of data, submit it to the server using 
     * AJAX and authenticate it. Perform any store functions
     * afterwards
     */
    login: function(data) {
        store.dispatch({
            type: "LOGIN_WAITING"
        });
        
        // perform ajax
        $.ajax({
            cache: false,
            type: "POST",
            url: "/login",
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                store.dispatch({
                    type: "LOGIN_SUCCESS",
                    results: result
                });
                browserHistory.push("/"); // redirect to root after logging in
            },
            error: function(xhr, status, error) {
                var errormsg = JSON.parse(xhr.responseText);
                store.dispatch({
                    type: "LOGIN_FAILURE",
                    error: errormsg
                });
            }
        });
    },
    
    
    /**
     * Render the Login Form
     */
   render: function() {
       return (
           <LoginForm login={this.login} />
       );
   } 
});


/**
 * This function maps store values to the form
 * properties
 */
function mapToProps(store) {
    return {};
}


/**
 * Create a component that connects the store with the
 * layout and export it.
 */
var component = connect(mapToProps)(LoginLayout);
module.exports = component;