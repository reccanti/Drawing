var React = require('react');
var DrawingImage = function (props) {
    return (
        <div>
            <img className="Timeline_image card" src={props.dataURL} />
            <div className="right">
                <a className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">f</i></a>
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
