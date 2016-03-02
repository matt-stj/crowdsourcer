const assert = require('assert');
const request = require('request');
const app = require('../server');

describe('Server', () => {

  before((done) => {
    this.port = 9876;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  it('should exist', () => {
    assert(app);
  });

  it('should return a 200', (done) => {
    this.request.get('/', (error, response) => {
      if (error) { done(error); }
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('should have a body with the name of the application', (done) => {
    var title = app.locals.title;

    this.request.get('/', (error, response) => {
      if (error) { done(error); }
      assert(response.body.includes(title),
             `"${response.body}" does not include "${title}".`);
      done();
    });
  });

  describe('POST /polls', () => {

    beforeEach(() => {
      app.locals.pizzas = {};
    });

    it('should not return 404', (done) => {
      this.request.post('/polls', (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should receive a poll and store it', (done) => {
      var validPoll = {
        poll: {
          id: '12345678',
          results: { A:1, B:2, C:3, D:4 },
          active: true
        }
      }

      this.request.post('/polls', { form: validPoll }, (error, response) => {
        if (error) { done(error); }

        var pollCount = Object.keys(app.locals.polls).length;
        assert.equal(pollCount, 1, `Expected 1 poll, found ${pollCount}`);
      })
    });

  });

});
