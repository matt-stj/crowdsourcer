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

app.post('/polls', (request, response) => {
  var id = generateId();
  console.log(request.body['poll-title'])
  console.log(request.body['choice-1'])
  console.log(request.body['choice-2'])
  app.locals.polls[id] = request.body;

  response.redirect('/');
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
