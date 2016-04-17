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
 * Check the status of a fetch request and ensure it is valid
 */
var checkStatus = function (res) {
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
var parseJSON = function (res) {
    return res.json();
};


var updateStore = function () {
    return function (dispatch) {
        return fetchImages()
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
    }
}

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
