var React = require('react');
var $ = require('jquery');

/**
 * This handles the creation of a User
 */
var SignupForm = React.createClass({
    getInitialState: function() {
        return {
            username: "",
            password: "",
            passwordConfirmed: ""
        };
    },
    setUsername: function(e) {
        this.setState({"username": e.target.value});
    },
    setName: function(e) {
        this.setState({"name": e.target.value});
    },
    setPassword: function(e) {
        this.setState({"password": e.target.value});
    },
    setPasswordConfirmed: function(e) {
        this.setState({"passwordConfirmed": e.target.value});
    },
    submitForm: function(e) {
        e.preventDefault();
        console.log("submitting...");
        $.ajax({
            cache: false,
            type: "POST",
            url: "/signup",
            data: {
                username: this.state.username,
                name: this.state.name,
                password: this.state.password,
                password_conf: this.state.passwordConfirmed
            },
            dataType: "json",
            success: function(result, status, xhr) {
                console.log(result);
            },
            error: function(xhr, status, error) {
                console.log(JSON.parse(xhr.responseText));
            }
        });
    },
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
            </form>
        );
    }
});

module.exports = SignupForm;