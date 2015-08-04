describe('traffic', function() {
  beforeEach(function() {
    window.matrix.settings = {
      profileId: ''
    };
    subject =  window.matrix.traffic;
    sandbox = sinon.sandbox.create();
    server = sinon.fakeServer.create();
  });
  afterEach(function() {
    sandbox.restore();
    server.restore();
  });
  it('has initial points', function() {
    expect(subject.points).to.eq(720);
  });
  it('has empty counts', function() {
    expect(subject.counts).to.eql([]);
  });
  it('has interval of 2 minutes', function() {
    expect(subject.interval).to.eq(120000);
  });
  describe('#endpoint', function() {
    it('returns the path to the servers realtime endpoint', function() {
      expect(subject.endpoint()).to.eql('/realtime?ids=ga:&metrics=rt:activeUsers&max-results=10');
    });
    context('with profileId', function() {
      beforeEach(function() {
        window.matrix.settings = {
          profileId: 'Test'
        };
      });
      it('returns correct profile Id in the endpoint path', function() {
        expect(subject.endpoint()).to.eql('/realtime?ids=ga:Test&metrics=rt:activeUsers&max-results=10');
      });
    });
  });
  describe('#historic', function() {
    it('returns the path to the servers historic endpoint', function() {
      expect(subject.historic()).to.eql('/historic?ids=ga:&dimensions=ga%3AnthMinute&metrics=ga%3Asessions&start-date=2015-08-03&end-date=2015-08-04&max-results=1000');
    });
  });
});
