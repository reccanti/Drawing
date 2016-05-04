var React = require('react');
// var FacebookShareButton = require('./facebookShareButton.jsx');
var FacebookButton = require('react-social').FacebookButton;

var DrawingImage = function (props) {
    return (
        <div>
            <img className="Timeline_image card" src={props.dataURL} />
            <div className="right">
                <FacebookButton
                  className="btn-floating btn-small waves-effect waves-light blue" 
                  url={"reccanti-socialdrawing.heroku.com/u/poop"}
                >
                    {"f"}
                </FacebookButton>
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
