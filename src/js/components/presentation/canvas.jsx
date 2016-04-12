var React = require('react');
var ReactDOM = require('react-dom');


var DrawingCanvas = React.createClass({


    /**
     * Validate PropTypes
     */
    propTypes: {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        submit: React.PropTypes.func,
        owner: React.PropTypes.string,
    },


    /**
     * This sets up the initial state of the canvas
     */
    getInitialState: function () {
        return {
            canvas: null,
            ctx: null,
            dragging: false,
            scale: {
                x: 1,
                y: 1,
            },
        };
    },


    /**
     * This function prepares the canvas after it renders
     */
    componentDidMount: function () {
        var canvas = ReactDOM.findDOMNode(this.refs.canvas);
        var ctx = canvas.getContext('2d');

        // apply any initial canvas scale factors
        // var scale = this._getCanvasScaleFactor(canvas);

        /* eslint react/no-did-mount-set-state: 0 */
        this.setState({
            canvas: canvas,
            ctx: ctx,
        });
        canvas.addEventListener('mouseup', this.onMouseUp);
        canvas.addEventListener('mousedown', this.onMouseDown);
        canvas.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('resize', this.onResize);
    },


    /**
     * Handle a MouseUp event
     */
    onMouseUp: function (e) {
        var mousePos = this._getMouseOnCanvas(e);
        this.setState({
            dragging: false,
        });
        this.state.ctx.lineTo(mousePos.x, mousePos.y);
        this.state.ctx.stroke();
    },


    /**
     * Handle a MouseDown event
     */
    onMouseDown: function (e) {
        var mousePos = this._getMouseOnCanvas(e);
        this.setState({
            dragging: true,
        });
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(mousePos.x, mousePos.y);
    },


    /**
     * Handle a MouseMove event
     */
    onMouseMove: function (e) {
        var mousePos = this._getMouseOnCanvas(e);
        if (this.state.dragging) {
            this.state.ctx.stroke();
            this.state.ctx.lineTo(mousePos.x, mousePos.y);
        }
    },


    /**
     * Handle a resize event
     */
    onResize: function () {
        var scale = this._getCanvasScaleFactor(this.state.canvas);
        this.setState({
            scale: {
                x: scale.x,
                y: scale.y,
            },
        });
    },


    /**
     * Handle the event when the card submit button is
     * pressed
     */
    onCardSubmit: function (e) {
        e.preventDefault();
        this._exportCanvas(this.state.canvas);
    },


    /**
     * This function gets the mouse position on the canvas
     */
    _getMouseOnCanvas: function (e) {
        var rect = this.state.canvas.getBoundingClientRect();
        var x = (e.clientX - rect.left) / this.state.scale.x;
        var y = (e.clientY - rect.top) / this.state.scale.y;
        return { x: x, y: y };
    },


    /**
     * This checks to see if the canvas is being scaled and
     * applies a scale factor.
     */
    _getCanvasScaleFactor: function (canvas) {
        var rect = canvas.getBoundingClientRect();
        var x = rect.width / canvas.width;
        var y = rect.height / canvas.height;
        return { x: x, y: y };
    },


    /**
     * Exports the canvas as an image
     */
    _exportCanvas(canvas) {
        var image = canvas.toDataURL('image/png');
        var data = {
            dataURI: image,
            owner: this.props.owner,
        };
        /* eslint no-console: 0 */
        console.log(data);
        this.props.submit(data);
    },


    /**
     * Render the Canvas
     */
    render: function () {
        return (
            <div className="DrawingCanvas card">
                <canvas
                  ref="canvas"
                  className="DrawingCanvas_canvas"
                  width={this.props.width}
                  height={this.props.height}
                >
                </canvas>
                <div className="card-action">
                    <a href="#" onClick={this.onCardSubmit}>This is a link</a>
                </div>
            </div>
        );
    },
});


module.exports = DrawingCanvas;
