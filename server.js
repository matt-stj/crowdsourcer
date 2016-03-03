const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');
const Poll = require('./lib/poll');
const path = require('path');
const port = process.env.PORT || 3000;
const server = http.createServer(app)
                 server.listen(port, function () {
                    console.log('Listening on port ' + port + '.');
                  });

const socketIo = require('socket.io');
const io = socketIo(server);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.locals.title = 'Crowdsourcer';
app.locals.polls = {};
var votes = {}

// function countVotes(pollId, votes) {
//   console.log("PollId in countVotes:" + pollId)
//   // var poll = app.locals.polls[pollId]
//   //
//   // var pollCount = poll.choices
//   //
//   // for (var vote in votes) {
//   //   pollCount[votes[vote]]++
//   // }
//   // return pollCount;
// }


app.get('/', (request, response) => {
  response.render('pages/index');
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('pages/user-poll', { poll: poll });
});

app.get('/polls/:adminKey/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('pages/admin-poll', { poll: poll });
});

app.post('/polls', (request, response) => {
  var adminKey = generateId(3);
  var id = generateId(10);

  var pollData = request.body.poll
  var title = pollData.title
  var question = pollData.question
  var choices = {}
  var expiration = pollData.expiration
  var isPrivate = pollData.isPrivate

  pollData.responses.forEach(function(response) {
    choices[response] = 0
  })

  var newPoll = new Poll(id, adminKey, title, question, choices, expiration, isPrivate)

  app.locals.polls[newPoll.id] = newPoll

  response.render('pages/admin-links', { poll: newPoll });
});

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      var pollId = message.pollId
      var vote = message.vote

      var poll = app.locals.polls[pollId]

      console.log(poll.choices)
      console.log(vote)
      console.log(poll.choices[vote])
      poll.choices[vote]++
      console.log(poll.choices)

      // socket.emit('voteCount', countVotes(votes));
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${port}.`);
  });
}

module.exports = app;
