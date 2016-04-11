var React = require('react');
var TestUtils = require('react-addons-test-utils');
var chai = require('chai');
var Provider = require('react-redux').Provider;
var store = require('../../src/js/stores/reduxStore.js');
var Overlay = require('../../src/js/components/container/overlay.jsx');


describe('test the Overlay component', function () {
    var storeVal = '';
    before('render and locate element', function () {
        /**
         * This is a test function. It will be passed to
         * the overlay to test it's close button
         */
        function onClose() {
            storeVal = 'closed';
        }

        this.renderedComponent = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <Overlay close={onClose}>
                    <div>This is a test div</div>
                </Overlay>
            </Provider>
        );
        this.overlay = TestUtils.findRenderedComponentWithType(this.renderedComponent, Overlay);
        this.closeButton =
            TestUtils.findRenderedDOMComponentWithClass(this.overlay, 'overlay_closeButton');
    });


    it('can find the LoginForm and components', function () {
        chai.expect(this.renderedComponent).not.to.be.undefined;
        chai.expect(this.overlay).not.to.be.undefined;
        chai.expect(this.closeButton).not.to.be.undefined;
    });


    it('runs the close function when clicked', function () {
        TestUtils.Simulate.click(this.closeButton);
        chai.expect(storeVal).to.eql('closed');
    });
});

