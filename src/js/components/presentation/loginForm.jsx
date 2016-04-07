var React = require('react');
var Link = require('react-router').Link;

/**
 * This form allows the user to log in to their account.
 */
var LoginForm = React.createClass({
    
    
    /**
     * Validate PropTypes
     */
    propTypes: {
        login: React.PropTypes.func.isRequired
    },
    
    
    /**
     * Store the value of the username input in the component's
     * state
     */
    setUsername: function(e) {
        this.setState({"username": e.target.value});
    },
    
    
    /**
     * Store the value of the password input in the component's
     * state
     */
    setPassword: function(e) {
        this.setState({"password": e.target.value});
    },
    
    
    /**
     * Collect the form's data and pass it to the container's
     * login function
     */
    submitForm: function(e) {
        e.preventDefault();
        var data = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(data);
    },
    
    
    /**
     * Render the login form
     */
    render: function() {
        return (
            <form action="/login" method="POST" ref="form" onSubmit={this.submitForm}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" ref="username" onChange={this.setUsername} />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" ref="password" onChange={this.setPassword} />
                <button type="submit" ref="submit" >Submit</button>
                
                <Link to="/signup">Sign up for an account</Link>
                <Link to="/">Return to Home</Link>
            </form>
        );
    }
});

module.exports = LoginForm;