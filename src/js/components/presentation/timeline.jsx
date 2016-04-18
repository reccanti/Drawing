var React = require('react');
var DrawingImage = require('./image.jsx');


/**
 * This class waits for image updates, fetches them, and
 * displays the appropriate images
 */
var Timeline = React.createClass({
    /**
     * Define the proptypes of the timeline
     */
    propTypes: {
        images: React.PropTypes.array,
    },


    /**
     * Define how to render a single image on the timeline
     */
    displayImage: function (obj) {
        var dataURL = obj.image;
        var creator = obj.creator;
        var createdDate = obj.createdDate;
        var id = obj.id;
        return (
            <li key={id}>
                <DrawingImage
                  id={id}
                  creator={creator}
                  createdDate={createdDate}
                  dataURL={dataURL}
                />
            </li>
        );
    },


    /**
     * Render the timeline by mapping the image information to and
     * image component
     */
    render: function () {
        return (
            <ul>
                {this.props.images.map(this.displayImage)}
            </ul>
        );
    },
});

module.exports = Timeline;
