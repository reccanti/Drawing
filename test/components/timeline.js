var React = require('react');
var TestUtils = require('react-addons-test-utils');
var chai = require('chai');
var Provider = require('react-redux').Provider;
var store = require('../../src/js/stores/reduxStore.js');
var TimelineContainer = require('../../src/js/components/container/timelineContainer.jsx');


describe('test the Overlay component', function () {
    before('render and locate element', function () {
        this.renderedComponent = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <TimelineContainer />
            </Provider>
        );
        this.timeline = TestUtils.findRenderedComponentWithType(
            this.renderedComponent,
            TimelineContainer);
    });


    it('can find the timeline component', function () {
        chai.expect(this.renderedComponent).not.to.be.undefined;
        chai.expect(this.timeline).not.to.be.undefined;
    });


    // it('runs the close function when clicked', function () {
    //     TestUtils.Simulate.click(this.closeButton);
    //     chai.expect(storeVal).to.eql('closed');
    // });
});

