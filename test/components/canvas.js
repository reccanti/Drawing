var React = require('react');
var TestUtils = require('react-addons-test-utils');
var chai = require('chai');
// var proxyquire = require('proxyquire');

var DrawingCanvas = require('../../src/js/components/presentation/canvas.jsx');


describe('test the DrawingCanvas component', function () {
    before('render and locate element', function () {
        var renderedComponent;
        var submit = function () {
            return 0;
        };
        renderedComponent = TestUtils.renderIntoDocument(
            <DrawingCanvas width={450} height={450} owner={"butt"} submit={submit} />
        );
        this.renderedComponent = renderedComponent;
        this.canvas = this.renderedComponent.refs.canvas;
    });


    it('can find the DrawingCanvas and components', function () {
        chai.expect(this.renderedComponent).not.to.be.undefined;
    });


    it('checks to see that the DrawingCanvas initialized correctly', function () {
        var canvasState = this.renderedComponent.state;
        chai.expect(canvasState).to.be.Object;
        TestUtils.isDOMComponent(canvasState.canvas);
        chai.expect(canvasState.ctx).to.be.Object;
        chai.expect(canvasState.dragging).to.eql(false);
        chai.expect(canvasState.scale).to.eql({
            x: 1,
            y: 1,
        });
    });


    // it('checks to see that we can get the position on the canvas', function () {
    //     TestUtils.Simulate.mouseDown(this.canvas.getDOMNode());
    //     // chai.expect(this.renderedComponent.state.dragging).to.eql(true);

    //     TestUtils.Simulate.mouseMove(this.canvas.getDOMNode());
    //     // chai.expect(this.renderedComponent.state.dragging).to.eql(true);

    //     TestUtils.Simulate.mouseUp(this.canvas.getDOMNode());
    //     // chai.expect(this.renderedComponent.state.dragging).to.eql(false);
    // });
});
