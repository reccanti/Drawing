var React = require('react');
var FacebookShareButton = require('./facebookShareButton.jsx');

var DrawingImage = function (props) {
    return (
        <div>
            <img className="Timeline_image card" src={props.dataURL} />
            <div className="right">
                <FacebookShareButton img={props.dataURL} />
            </div>
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
