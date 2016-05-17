/**
 * Functions related to the timeline component of the
 * main app screen.
 */
var fetchImage;
var checkStatus;
var parseJSON;
var getImage;
require('whatwg-fetch');

/**
 * This function tells the store that the overlay state should be
 * closed.
 */
fetchImage = function (id) {
    var data = {
        id: id,
    };
    return fetch('/drawing/getImage', {
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
 * Retrieve the image from the store
 */
getImage = function (id) {
    return function (dispatch) {
        return fetchImage(id)
            .then(checkStatus)
            .then(parseJSON)
            .then(function (res) {
                var image = res.image;
                dispatch({
                    type: 'IMAGE_RETRIEVED',
                    image: image,
                });
            })
            .catch(function () {
                var image = {};
                dispatch({
                    type: 'IMAGE_RETRIEVED',
                    image: image,
                });
            });
    };
};

module.exports.GetImage = getImage;