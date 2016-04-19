var React = require('react');
var ReactDOM = require('react-dom');
var Atrament = require('atrament').Atrament;
var RadioGroup = require('react-radio-group');
var DrawingCanvas;
// var $ = require('jquery');
require('materialize-js');


DrawingCanvas = React.createClass({


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
            color: '#000000',
            size: 1,
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
        var atrcanvas = new Atrament(canvas, canvas.width, canvas.height);
        atrcanvas.weight = this.state.size;
        console.log(this.state.color);
        atrcanvas.colour = this.state.color;

        /* eslint react/no-did-mount-set-state: 0 */
        this.setState({
            canvas: atrcanvas,
            ctx: ctx,
        });
        // canvas.addEventListener('mouseup', this.onMouseUp);
        // canvas.addEventListener('mousedown', this.onMouseDown);
        // canvas.addEventListener('mousemove', this.onMouseMove);
        // window.addEventListener('resize', this.onResize);
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
    _exportCanvas: function (canvas) {
        var image = canvas.toImage();
        var data = {
            dataURI: image,
            owner: this.props.owner,
        };
        /* eslint no-console: 0 */
        this.props.submit(data);
    },


    /**
     * Describe how to render the radio buttons
     */
    _renderRadio: function (Radio) {
        return (
            <div>
              <p>
                <Radio id="radio_black" value="#000000" />
                <label htmlFor="radio_black">Black</label>
              </p>
              <p>
                <Radio id="radio_white" value="#FFFFFF" />
                <label htmlFor="radio_white">White</label>
              </p>
            </div>
        );
    },


    /**
     * When the color radio buttons are updated, update the color state
     */
    handleColorsChange: function (value) {
        /* eslint quote-props: 0 */
        console.log(value);
        this.setState({ 'color': value });
        // newCanvas = this.state.canvas;
        // newCanvas.colour = this.state.color;
        // this.setState({'canvas': newCanvas});
        this.state.canvas.color = value;
    },


    /**
     * When the size slider is updated, update the size state
     */
    handleSizeChange: function (e) {
        /* eslint quote-props: 0 */
        var size = parseInt(e.target.value, 10);
        this.setState({ 'size': size });
        this.state.canvas.weight = size;
    },


    /**
     * Prevent the click event from bubbling up to the parent div
     */
    preventBubbling: function (e) {
        /* eslint no-param-reassign: 0 */
        e.cancelBubble = true;
        e.stopPropagation();
    },


    /**
     * Render the Canvas
     */
    render: function () {
        return (
            <div className="DrawingCanvas card" onClick={this.preventBubbling}>
                <canvas
                  ref="canvas"
                  className="DrawingCanvas_canvas"
                  width={this.props.width}
                  height={this.props.height}
                  onClick={this.preventBubbling}
                >
                </canvas>
                <div className="card-action">
                    <div>
                        <label htmlFor="BrushSize">Brush Size</label>
                        <p className="range-field">
                            <input
                              type="range"
                              id="slider_size"
                              min={0}
                              max={30}
                              name="BrushSize"
                              defaultValue={this.state.size}
                              onChange={this.handleSizeChange}
                            />
                        </p>
                    </div>
                    <label>Brush Color</label>
                    <RadioGroup
                      name="BrushColor"
                      selectedValue={this.state.color}
                      onChange={this.handleColorsChange}
                    >
                        {this._renderRadio}
                    </RadioGroup>
                    <div className="section">
                        <a href="#" onClick={this.onCardSubmit}>Submit</a>
                    </div>
                </div>
            </div>
        );
    },
});


module.exports = DrawingCanvas;
