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

        // Searching for <input> tag within rendered React component
        // Throws an exception if not found
        // var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
        //     renderedComponent,
        //     'input'
        // );
        // this.inputElement = inputComponent.getDOMNode();
        this.renderedComponent = renderedComponent;
    });
    it("can find the LoginForm", function() {
        chai.expect(this.renderedComponent).not.to.be.undefined;
    });
});

