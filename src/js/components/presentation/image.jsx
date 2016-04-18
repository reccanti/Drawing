var React = require('react');
var DrawingImage = function (props) {
    return (
        <div>
            <p>{props.creator} - {props.createdDate}</p>
            <img className="Timeline_image card" src={props.dataURL} />
        </div>
    );
};
DrawingImage.propTypes = {
    id: React.PropTypes.string,
    creator: React.PropTypes.string,
    dataURL: React.PropTypes.string,
    createdDate: React.PropTypes.string,
};

module.exports = DrawingImage;
