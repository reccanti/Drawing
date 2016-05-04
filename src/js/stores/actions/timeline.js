/**
 * Functions related to the timeline component of the
 * main app screen.
 */
var fetchImages;
var checkStatus;
var parseJSON;
var updateStore;
require('whatwg-fetch');

/**
 * This function tells the store that the overlay state should be
 * closed.
 */
fetchImages = function (username) {
    var data = {
        username: username,
    };
    console.log(JSON.stringify(data));
    return fetch('/user/getImages', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
};


/**
 * Check the status of a fetch request and ensure it is valid
 */
checkStatus = function (res) {
    var error;
    if (res.status >= 200 && res.status < 300) {
        return res;
    }
    error = new Error(res.error);
    error.response = res;
    throw error;
};


/**
 * Parse the JSON response from the request
 */
parseJSON = function (res) {
    return res.json();
};


/**
 * A performs a fetch request to retrieve the current
 * User's images
 */
updateStore = function (username) {
    return function (dispatch) {
        return fetchImages(username)
            .then(checkStatus)
            .then(parseJSON)
            .then(function (res) {
                var images = res.drawings;
                dispatch({
                    type: 'TIMELINE_UPDATE',
                    images: images,
                });
            })
            .catch(function () {
                var images = [];
                dispatch({
                    type: 'TIMELINE_UPDATE',
                    images: images,
                });
            });
    };
};

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

module.exports.Update = updateStore;
