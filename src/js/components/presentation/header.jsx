var React = require('react');
var Link = require('react-router').Link;

var Header = function (props) {
    // var canvasPath = 'u/' + this.props.params.username + '/new';
    return (
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Drawings</Link>
                <ul className="right">
                    <li><Link to={props.canvasPath} className="waves-effect waves-light btn">New Drawing</Link></li>
                </ul>
                </div>
            </nav>
        </div>
    );
};

module.exports = Header;