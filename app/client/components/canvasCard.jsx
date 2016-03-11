import React from "react";

import DrawingCanvas from "./canvas.jsx";

class CanvasCard extends React.Component {
    
    constructor() {
        super();
    }
    
    render() {
        return(
            <div className="card">
                <DrawingCanvas 
                    width={ this.props.width } 
                    height={ this.props.height } 
                    brushColor={ this.props.brushColor }
                />
                <div className="card-action">
                    <a href="#">This is a link</a>
                </div>
            </div>
            
        );
    }
}

CanvasCard.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    brushColor: React.PropTypes.string
};

export default CanvasCard;