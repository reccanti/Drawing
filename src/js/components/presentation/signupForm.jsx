var React = require('react');
var Link = require('react-router').Link;

/**
 * This is the form that will allow the user to create an
 * account in the database.
 */

/* eslint quote-props: 0 */
var SignupForm = React.createClass({


    /**
     * Validate the props for the form
     */
    propTypes: {
        signup: React.PropTypes.func.isRequired,
    },


    /**
     * Store the value of the username input in the component's
     * state
     */
    setUsername: function (e) {
        this.setState({ 'username': e.target.value });
    },


    /**
     * Store the value of the name input in the component's
     * state
     */
    setName: function (e) {
        this.setState({ 'name': e.target.value });
    },


    /**
     * Store the value of the password input in the component's
     * state
     */
    setPassword: function (e) {
        this.setState({ 'password': e.target.value });
    },


    /**
     * Store the value of the confirmed password input in the
     * component's state
     */
    setPasswordConfirmed: function (e) {
        this.setState({ 'passwordConfirmed': e.target.value });
    },


    /**
     * collect the data from the form and pass it to the container's
     * signup function
     */
    submitForm: function (e) {
        var data;
        e.preventDefault();
        data = {
            username: this.state.username,
            name: this.state.name,
            password: this.state.password,
            password_conf: this.state.passwordConfirmed,
        };
        this.props.signup(data);
    },


    /**
     * Render the Form
     */
    render: function () {
        return (
            <form
              className="card"
              action="/signup"
              method="POST"
              ref="form"
              onSubmit={this.submitForm}
            >
                <div className="card-content">
                    <p className="card-title">Sign Up</p>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={this.setUsername} />
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={this.setName} />
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" onChange={this.setPassword} />
                    <label htmlFor="password_conf">Confirm Password</label>
                    <input type="text" name="password_conf" onChange={this.setPasswordConfirmed} />
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      ref="submit"
                      name="action"
                    >
                        Submit
                    </button>
                    <Link className="right" to="/login">Return to Log In</Link>
                </div>
            </form>
        );
    },
});
module.exports = SignupForm;
