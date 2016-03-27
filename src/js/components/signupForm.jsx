var React = require('react');

/**
 * This handles the creation of a User
 */
var SignupForm = React.createClass({
   render: function() {
       return (
           <form action="/signup" method="POST">
               <label for="username">Username</label>
               <input type="text" name="username" />
               <label for="password">Password</label>
               <input type="text" name="password" />
               <label for="password_conf">Confirm Password</label>
               <input type="text" name="password_conf" />
               <button type="submit">Submit</button>
           </form>
       );
   }
});

module.exports = SignupForm;