var React = require("react");
var SignupForm = require("./signupForm.jsx");

var SignupLayout = React.createClass({
   render: function() {
       return (
           <SignupForm />
       );
   } 
});

module.exports = SignupLayout;