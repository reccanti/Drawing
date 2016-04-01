var React = require("react");

var store = require("../../stores/reduxStore.js");
var connect = require("react-redux").connect;
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');

var SignupForm = require("../presentation/signupForm.jsx");


/**
 * This Component provides a layout of the form and
 * handles AJAX submissions
 */
var SignupLayout = React.createClass({
    
    /**
     * Given a set of data, submit it to the server using 
     * AJAX and authenticate it. Perform any store functions
     * afterwards
     */
    signup: function(data) {
        store.dispatch({
            type: "LOGIN_WAITING"
        });
        
        // perform ajax
        $.ajax({
            cache: false,
            type: "POST",
            url: "/signup",
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                store.dispatch({
                    type: "LOGIN_SUCCESS",
                    results: result
                });
                browserHistory.push("/"); // redirect to root after signup
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
     * Renders the Signup Form
     */
    render: function() {
        return (
            <SignupForm signup={this.signup} />
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
var component = connect(mapToProps)(SignupLayout);
module.exports = component;