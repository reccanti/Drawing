var logout;
var checkStatus;
var getImage;
require('whatwg-fetch');
       
/**
 * This function tells the server to log out of the system
 */
logout = function () {
    return fetch('/session/logout', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
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
 * Construct the function that logs the user out of the form
 */
logoutComplete = function (callback) {
    return function (dispatch) {
        return logout()
            .then(checkStatus)
            .then(function (res) {
                dispatch({
                    type: 'LOGOUT',
                });
                callback();
            })
            .catch(function () {
                console.log('an error occurred logging out');
            });
    };
};

module.exports.Logout = logoutComplete