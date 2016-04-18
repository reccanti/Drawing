var React = require('react');
var TestUtils = require('react-addons-test-utils');
var chai = require('chai');
var Timeline = require('../../src/js/components/presentation/timeline.jsx');

require('whatwg-fetch');


describe('test the Timeline component', function () {
    before('render and locate element', function () {
        this.renderedComponent = TestUtils.renderIntoDocument(
            <Timeline images={[]} />
        );
        this.timeline = TestUtils.findRenderedComponentWithType(
            this.renderedComponent,
            Timeline);
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

