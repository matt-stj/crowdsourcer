const assert = require('assert');
const moment = require('moment');
const app = require('../server');
const Poll = require('../lib/poll');

describe('Poll', () => {
  it('can be instantiated without default arguments', () => {
    assert(new Poll);
  });

  it('has an id', () => {
    var poll = new Poll(123);
    assert.equal(123, poll.id)
  });

  it('has an adminKey', () => {
    var poll = new Poll(123, 456);
    assert.equal(456, poll.adminKey)
  });

  it('has a title', () => {
    var poll = new Poll(123, 456, 'title');
    assert.equal('title', poll.title)
  });

  it('has a question', () => {
    var poll = new Poll(123, 456, 'title', 'question');
    assert.equal('question', poll.question)
  });

  it('has choice options', () => {
    var poll = new Poll(123, 456, 'title', 'question', "a");
    assert.equal("a", poll.choices)
  });

  it('can have an expiration date', () => {
    var poll = new Poll(123, 456, 'title', 'question', 'a', '2016-5-3');
    assert.equal('2016-5-3', poll.expiresOn)
  });

  it('can have an expiration time', () => {
    var poll = new Poll(123, 456, 'title', 'question', 'a', '2016-5-3', '11:00AM');
    assert.equal('11:00AM', poll.expiresAt)
  });

  it('has a default state of active', () => {
    var poll = new Poll(123, 456, 'title', 'question', 'a', '2016-5-3', '11:00AM');
    assert.equal(true, poll.isActive)
  });

  it('sets an expiration if both a date and time are specified', () => {
    var poll = new Poll(123, 456, 'title', 'question', 'a', '2016-03-07', '11:59');
    assert.equal('March 7, 2016 11:59 AM', poll.fullExpiration)
  });

  it('sets an expiration for today if only a time is specified', () => {
    var poll = new Poll(123, 456, 'title', 'question', 'a', '', '11:59');
    assert.equal(moment().format('LL') + ' 11:59 AM', poll.fullExpiration)
  });

  it('sets an expiration 11:59PM if only a date is specified', () => {
    var poll = new Poll(123, 456, 'title', 'question', 'a', '2016-03-07', '');
    assert.equal('March 7, 2016 11:59 PM', poll.fullExpiration)
  });
});
