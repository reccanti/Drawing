var React = require('react');
var $ = require('jquery');

/**
 * This handles the creation of a User
 */
var LoginForm = React.createClass({
    getInitialState: function() {
        return {
            username: "",
            password: ""
        };
    },
    setUsername: function(e) {
        this.setState({"username": e.target.value});
    },
    setPassword: function(e) {
        this.setState({"password": e.target.value});
    },
    submitForm: function(e) {
        e.preventDefault();
        console.log("submitting...");
        $.ajax({
            cache: false,
            type: "POST",
            url: "/login",
            data: {
                username: this.state.username,
                password: this.state.password
            },
            dataType: "json",
            success: function(result, status, xhr) {
                console.log(result);
                browserHistory.push(result.redirect);
            },
            error: function(xhr, status, error) {
                console.log(JSON.parse(xhr.responseText));
            }
        });
    },
    render: function() {
        return (
            <form action="/login" method="POST" onSubmit={this.login}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={this.setUsername} />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" onChange={this.setPassword} />
                <button type="submit">Submit</button>
            </form>
        );
    }
});

module.exports = LoginForm;