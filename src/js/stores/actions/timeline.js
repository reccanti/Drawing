/**
 * Functions related to the timeline component of the
 * main app screen.
 */

/**
 * This function tells the store that the overlay state should be
 * closed.
 */
var fetchImages = function () {
    return fetch('/user/getImages', {
        method: 'POST',
        credentials: 'include',
    });
};


/**
 * Parse the JSON response from the request
 */
// var parseJSON = function (res) {
//     return res.json();
// };

        // fetch('/user/getImages', {
        //     method: 'POST',
        //     credentials: 'include',
        // })
        // .then(function (res) {
        //     return res.json();
        // })
        // .then(function (res) {
        //     var urls = [];
        //     res.drawings.map(function (data) {
        //         urls.push(data.image);
        //         return 0;
        //     });
        //     _this.setState({ 'dataURLs': urls });
        //     return 0;
        // });

module.exports.update = fetchImages;
