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


    displayImage: function (obj) {
        var dataURL = obj.image;
        return (
            <li>
                <DrawingImage creator={""} dataURL={dataURL} />
            </li>
        );
    },


    render: function () {
        return (
            <ul>
                {this.props.images.map(this.displayImage)}
            </ul>
        );
    },
});

module.exports = Timeline;
