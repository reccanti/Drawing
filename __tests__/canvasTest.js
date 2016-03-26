jest.dontMock("../src/js/components/canvas.jsx");


var React = require('react');
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");

describe("Canvas", function() {
   it("tests the canvas", function() {
       var Canvas = require("../src/js/components/canvas.jsx")
       var canvasRender = TestUtils.renderIntoDocument(
           <Canvas width={400} height={400} />
       );
       var cNode = ReactDOM.findDOMNode(canvasRender);
       expect(cNode).toBeDefined();
   });
});