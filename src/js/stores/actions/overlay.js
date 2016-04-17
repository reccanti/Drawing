var closeOverlay = function () {
    return {
        type: 'OVERLAY_CLOSE',
        open: false,
    }
}

var openOverlay = function () {
    return {
        type: 'OVERLAY_OPEN',
        open: true,
    }
}

module.exports.Open = openOverlay;
module.exports.Close = closeOverlay;