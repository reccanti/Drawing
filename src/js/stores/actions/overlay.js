/**
 * Functions related to the overlay component of the
 * main app screen.
 */

/**
 * This function tells the store that the overlay state should be
 * closed.
 */
var closeOverlay = function () {
    return {
        type: 'OVERLAY_CLOSE',
        open: false,
    };
};

/**
 * This function tells the store that the overlay state should be
 * open
 */
var openOverlay = function () {
    return {
        type: 'OVERLAY_OPEN',
        open: true,
    };
};

module.exports.Open = openOverlay;
module.exports.Close = closeOverlay;
