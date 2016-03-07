const assert = require('assert');
const request = require('request');
const app = require('../server');
const Poll = require('../lib/poll');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:3000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};


describe("Socket",function(){
  it('Should connect', function(){
  var client1 = io.connect(socketURL, options);

  client1.on('connection', function (socket) {
    assert.equal(1, io.engine.clientsCount)
    console.log(io.engine.clientsCount)
  });
  client1.on('message', function (channel, message) {
    client1.emit('UserVote', "A")
    console.log('hi')
    });

});
});
