var React = require('react');
// var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var chai = require('chai');

var Provider = require('react-redux').Provider;
var store = require('../../src/js/stores/reduxStore.js');

var Overlay = require('../../src/js/components/container/overlay.jsx');


describe('test the Overlay component', function () {
    before('render and locate element', function () {
        var renderedComponent = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <Overlay>
                    <div>This is a test div</div>
                </Overlay>
            </Provider>
        );
        this.renderedComponent = renderedComponent;
    });


    it('can find the LoginForm and components', function () {
        chai.expect(this.renderedComponent).not.to.be.undefined;
    });
});

