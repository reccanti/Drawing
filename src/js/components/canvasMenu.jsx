import React from "react";

class CanvasMenu extends React.Component {
    
    constructor() {
        super();
    }
    
    render() {
        return(
            <div className="card-action">
                <span 
                    href=""
                    onClick={this.props.onClick}
                >Submit</span>
            </div>  
        );
    }
}

CanvasMenu.propTypes = {
    onClick: React.PropTypes.func
};

export default CanvasMenu;