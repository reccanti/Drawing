var React = require("react");
var LoginForm = require("../components/loginForm.jsx");

var LoginLayout = React.createClass({
   render: function() {
       return (
           <LoginForm />
       );
   } 
});

module.exports = LoginLayout;