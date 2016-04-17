var React = require('react');
var DrawingImage = require('./image.jsx');


/**
 * This class waits for image updates, fetches them, and
 * displays the appropriate images
 */
var Timeline = React.createClass({
    propTypes: {
        dataURLs: React.PropTypes.array,
    },


    displayImage: function (dataURL) {
        return (
            <li>
                <DrawingImage dataURL={dataURL} />
            </li>
        );
    },


    render: function () {
        return (
            <ul>
                {this.props.dataURLs.map(this.displayImage)}
            </ul>
        );
    },
});

module.exports = Timeline;
