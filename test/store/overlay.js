var Overlay = require('../../src/js/store/actions').Overlay;
var chai = require('chai');

describe('Test that we can get the app', function () {
    it('returns a closed overlay state', function (done) {
        var state = Overlay.close();
        chai.expect(state.type).to.eql('OVERLAY_CLOSE');
        chai.expect(state.open).to.be.false;
        done();
    });
    it('returns an open overlay state', function (done) {
        var state = Overlay.open();
        chai.expect(state.type).to.eql('OVERLAY_OPEN');
        chai.expect(state.open).to.be.true;
        done();
    });
});
