var Overlay = require('../../src/js/stores/actions').Overlay;
var chai = require('chai');

describe('Test that the overlay action creators work', function () {
    it('returns a closed overlay state', function (done) {
        var state = Overlay.Close();
        chai.expect(state.type).to.eql('OVERLAY_CLOSE');
        chai.expect(state.open).to.be.false;
        done();
    });
    it('returns an open overlay state', function (done) {
        var state = Overlay.Open();
        chai.expect(state.type).to.eql('OVERLAY_OPEN');
        chai.expect(state.open).to.be.true;
        done();
    });
});
