var React = require('react');
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");
var chai = require("chai");

var LoginForm = require("../../src/js/components/presentation/loginForm.jsx");


describe("test the LoginForm component", function() {
    

    before('render and locate element', function() {
        
        function login() {
            return "Testing";
        }
        var renderedComponent = TestUtils.renderIntoDocument(
            <LoginForm login={login} />
        );
        this.renderedComponent = renderedComponent;
        this.usernameInput = this.renderedComponent.refs.username;
        this.passwordInput = this.renderedComponent.refs.password;
        this.submitButton = this.renderedComponent.refs.submit;
        this.form = this.renderedComponent.refs.form;
    });
    
    
    it("can find the LoginForm and components", function() {
        chai.expect(this.renderedComponent).not.to.be.undefined;
        chai.expect(this.usernameInput).not.to.be.undefined;
        chai.expect(this.passwordInput).not.to.be.undefined;
        chai.expect(this.submitButton).not.to.be.undefined;
        chai.expect(this.form).not.to.be.undefined;
    });
    
    
    it("checks that the inputs update correctly", function() {
        this.usernameInput.value = "TestUser";
        TestUtils.Simulate.change(this.usernameInput);
        chai.expect(this.renderedComponent.state.username).to.eql("TestUser");
        
        this.passwordInput.value = "TestPassword";
        TestUtils.Simulate.change(this.passwordInput);
        chai.expect(this.renderedComponent.state.password).to.eql("TestPassword");
    });
    
});

