var React = require('react');
var FacebookShareButton = React.createClass({
    
    // propTypes = {
    //     src: React.PropTypes.string,
    // },
    
    postImage: function() {
        var wallPost = {
            message: "Test to post a photo",
            url: this.props.src
        };
        FB.api('/me/feed', 'post', wallPost , function(response) {
            if (!response || response.error) {
                alert('Failure! ' + response.status + ' You may logout once and try again');
            } else {
                alert('Success! Post ID: ' + response);
            }
        });
    },
    
    clickButton: function () {
        var self = this;
        FB.getLoginStatus(function(response){
            if (response.status == 'connected') {
                accessToken = response.authResponse.accessToken;
                self.postImage();
            }
            else {
                FB.login(function(response){
                if (response.status == 'connected') {
                    accessToken = response.authResponse.accessToken;
                    self.postImage();
                }
                else {
                    alert("Bye.");
                }
                }, {scope:'user_photos,publish_actions'});
            }
        });
    },
    
    
    render: function () {
        return (
            <a className="btn-floating btn-small waves-effect waves-light blue" onClick={this.clickButton} >
                <i className="material-icons">f</i>
            </a>
        );
    }
});


module.exports = FacebookShareButton;