var React = require('react');
var DrawingImage = function (props) {
    return (
        <img className="Timeline_image card" src={props.dataURL} />
    );
};
DrawingImage.propTypes = {
    dataURL: React.PropTypes.String,
};

module.exports = DrawingImage;
