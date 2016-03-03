const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');
const Poll = require('./lib/poll');
const socketIo = require('socket.io');

const path = require('path');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

const server = http.createServer(app).listen(app.port, function() {
                   console.log('Listening on port ' + app.port + '.');
                 });

const io = socketIo(server);

app.locals.title = 'Crowdsourcer';
app.locals.polls = {};


app.get('/', (request, response) => {
  response.render('pages/index');
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('user-poll', { poll: poll });
});

app.post('/polls', (request, response) => {
  var pollData = request.body.poll

  var adminKey = generateId(5);
  var id = generateId(10);
  var title = pollData.title
  var question = pollData.question
  var choices = {}

  pollData.responses.forEach(function(response) {
    choices[response] = 0
  })

  var newPoll = new Poll(id, title, question, choices, true)
  app.locals.polls[newPoll.id] = newPoll

  console.log(newPoll)
  response.redirect('/');
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
