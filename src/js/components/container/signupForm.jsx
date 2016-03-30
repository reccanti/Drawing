var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Link = require("react-router").Link;
var store = require("../../stores/reduxStore.js");
var connect = require("react-redux").connect;
var $ = require('jquery');

/**
 * This is the form that will allow the user to create an
 * account in the database.
 */
var SignupForm = React.createClass({
    
    
    /**
     * Store the value of the password input in the component's
     * state
     */
    componentDidMount: function() {
        // if (!!this.props.redirect) {
        //     browserHistory.push(this.props.redirect);
        // }
    },
    
    
    /**
     * Set the initial state of the component
     */
    getInitialState: function() {
        return {
            username: "",
            password: "",
            passwordConfirmed: ""
        };
    },    
    
    
    /**
     * Store the value of the username input in the component's
     * state
     */
    setUsername: function(e) {
        this.setState({"username": e.target.value});
    },
    
    
    /**
     * Store the value of the name input in the component's
     * state
     */
    setName: function(e) {
        this.setState({"name": e.target.value});
    },
    
    
    /**
     * Store the value of the password input in the component's
     * state
     */
    setPassword: function(e) {
        this.setState({"password": e.target.value});
    },
    
    
    /**
     * Store the value of the confirmed password input in the
     * component's state
     */
    setPasswordConfirmed: function(e) {
        this.setState({"passwordConfirmed": e.target.value});
    },
    
    
    /**
     * Submit the information from the form via an AJAX call
     */
    submitForm: function(e) {
        e.preventDefault();
        console.log("submitting...");
        store.dispatch({
            type: "USER_LOGIN",
            username: this.state.username
        });
        // $.ajax({
        //     cache: false,
        //     type: "POST",
        //     url: "/signup",
        //     data: {
        //         username: this.state.username,
        //         name: this.state.name,
        //         password: this.state.password,
        //         password_conf: this.state.passwordConfirmed
        //     },
        //     dataType: "json",
        //     success: function(result, status, xhr) {
        //         store.dispatch({
        //             type: "USER_LOGIN",
        //             username: "user"
        //         });
        //     },
        //     error: function(xhr, status, error) {
        //         console.log(JSON.parse(xhr.responseText));
        //     }
        // });
    },
    
    
    /**
     * Render the Form
     */
    render: function() {
        return (
            <form action="/signup" method="POST" onSubmit={this.submitForm}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={this.setUsername} />
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={this.setName} />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" onChange={this.setPassword} />
                <label htmlFor="password_conf">Confirm Password</label>
                <input type="text" name="password_conf" onChange={this.setPasswordConfirmed} />
                <button type="submit">Submit</button>
                <Link to="/">Return to Home</Link>
            </form>
        );
    }
});

var component = connect(function (store) {
    return {
        redirect: "/login"
    }
})(SignupForm);


module.exports = component;